import test from "node:test";
import assert from "node:assert/strict";
import { CATEGORIES, TOPICS, FAMILIES, searchFeed } from "../public/topics.js";
import { normalizeItems, safeUrl } from "../lib/news.js";
import { createTemplate } from "../public/post-template.js";
import app from "../server.js";
test("30 themes and 120 subtopics have unique bilingual coverage in both regions", () => {
  assert.equal(TOPICS.length, 30);
  assert.equal(CATEGORIES.length, 300);
  assert.equal(new Set(CATEGORIES.map((c) => c.id)).size, 300);
  assert.equal(new Set(FAMILIES.flatMap((f) => f.topics)).size, 30);
  assert.equal(FAMILIES.flatMap((f) => f.topics).length, 30);
  for (const t of TOPICS) {
    assert.equal(t.subtopics.length, 4);
    assert.equal(CATEGORIES.filter((c) => c.topic === t.id).length, 10);
    assert.ok(t.nameEn && t.subtopics.every((s) => s.nameEn));
  }
  const queries = CATEGORIES.map((c) =>
    new URL(searchFeed(c).url).searchParams.get("q"),
  );
  assert.ok(
    queries.every((q) => q.endsWith("when:30d") && !q.includes("undefined")),
  );
  assert.notEqual(
    queries[CATEGORIES.findIndex((c) => c.id === "ia-br")],
    queries[CATEGORIES.findIndex((c) => c.id === "ia--agentes-br")],
  );
  assert.match(searchFeed(CATEGORIES[0]).url, /news.google.com/);
});
test("different same-domain articles have distinct IDs; duplicates and unsafe URLs removed; invalid dates tolerated", () => {
  const rows = normalizeItems(
    [
      { title: "A", link: "https://example.com/a", pubDate: "invalid" },
      { title: "B", link: "https://example.com/b", pubDate: "2026-09-23" },
      { title: "Duplicate", link: "https://example.com/a" },
      { title: "Unsafe", link: "javascript:alert(1)" },
    ],
    "ia-br",
    { name: "Test" },
  );
  assert.equal(rows.length, 2);
  assert.notEqual(rows[0].id, rows[1].id);
  assert.equal(rows[1].pubDate, null);
  assert.equal(safeUrl("file:///etc/passwd"), null);
});
test("fallback always attributes the source and respects disabled emoji/hashtags", () => {
  const text = createTemplate({
    title: "Teste",
    summary: "Resumo",
    link: "https://example.com/news",
    category: "ia-br",
    emojis: "none",
    hashtags: "none",
  });
  assert.ok(text.includes("Fonte: https://example.com/news"));
  assert.ok(!text.includes("#"));
  assert.ok(!text.includes("💡"));
});
test("HTTP API validates content and generates without a paid key; arbitrary URL proxy disabled", async () => {
  const server = app.listen(0, "127.0.0.1");
  await new Promise((r) => server.once("listening", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    assert.equal(
      (await (await fetch(base + "/api/health")).json()).categories,
      300,
    );
    assert.equal(
      (await fetch(base + "/api/news?category=missing")).status,
      404,
    );
    const options = (body) => ({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(
      (await fetch(base + "/api/generate-post", options({ title: 45 }))).status,
      400,
    );
    const response = await fetch(
      base + "/api/generate-post",
      options({
        title: "Nova tecnologia",
        summary: "",
        link: "https://example.com/news",
        category: "ia-br",
      }),
    );
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.equal(result.mode, "fallback");
    assert.ok(result.text.includes("https://example.com/news"));
    assert.deepEqual(
      await (
        await fetch(base + "/api/fetch-article-image?url=http://127.0.0.1")
      ).json(),
      { image: null },
    );
    assert.equal(
      (await fetch(base + "/api/download-image?url=http://127.0.0.1")).status,
      410,
    );
  } finally {
    await new Promise((r) => server.close(r));
  }
});
