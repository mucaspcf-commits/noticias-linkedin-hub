import Parser from "rss-parser";
import { createHash } from "node:crypto";
import { categoryById, searchFeed } from "../public/topics.js";
const parser = new Parser({
  timeout: 12000,
  headers: { "User-Agent": "NoticiasLinkedInHub/2.0" },
  customFields: {
    item: [
      ["media:content", "media"],
      ["source", "publisher"],
    ],
  },
});
const cache = new Map(),
  pending = new Map(),
  TTL = 600000;
const directSources = {
  "tecnologia-br": [{ name: "Tecnoblog", url: "https://tecnoblog.net/feed/" }],
  "analytics-br": [
    { name: "Data Hackers", url: "https://medium.com/feed/data-hackers" },
  ],
  "inovacao-br": [
    { name: "Startups.com.br", url: "https://startups.com.br/feed/" },
  ],
  "negocios-br": [
    { name: "Brazil Journal", url: "https://braziljournal.com/feed/" },
  ],
  "tecnologia-world": [
    { name: "The Verge", url: "https://www.theverge.com/rss/index.xml" },
  ],
  "analytics-world": [
    {
      name: "AWS Big Data Blog",
      url: "https://aws.amazon.com/blogs/big-data/feed/",
    },
  ],
  "inovacao-world": [
    { name: "TechCrunch", url: "https://techcrunch.com/feed/" },
  ],
  "negocios-world": [
    {
      name: "CNBC Business",
      url: "https://www.cnbc.com/id/10001147/device/rss/rss.html",
    },
  ],
};
export function safeUrl(value) {
  try {
    const u = new URL(value);
    return ["http:", "https:"].includes(u.protocol) &&
      !u.username &&
      !u.password
      ? u.href
      : null;
  } catch {
    return null;
  }
}
export function cleanText(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
export function normalizeItems(items, category, source) {
  const seen = new Set();
  return items
    .flatMap((item) => {
      const link = safeUrl(item.link),
        title = cleanText(item.title);
      if (!link || !title || seen.has(link)) return [];
      seen.add(link);
      const date = new Date(item.isoDate || item.pubDate || "");
      const publisher =
        typeof item.publisher === "string" ? item.publisher : item.publisher?._;
      const cleanTitle =
        publisher && title.endsWith(" - " + publisher)
          ? title.slice(0, -publisher.length - 3)
          : title;
      const rawSummary = cleanText(
        item.contentSnippet || item.content || item.description,
      );
      const summary =
        source.name === "Google Notícias" ? "" : rawSummary.slice(0, 350);
      return [
        {
          id: createHash("sha256").update(link).digest("hex").slice(0, 24),
          title: cleanTitle,
          summary,
          link,
          image: safeUrl(
            item.enclosure?.type?.startsWith("image/")
              ? item.enclosure.url
              : item.media?.$?.url,
          ),
          pubDate: Number.isNaN(date.getTime()) ? null : date.toISOString(),
          sourceName: publisher || source.name,
          category,
        },
      ];
    })
    .sort((a, b) => (Date.parse(b.pubDate) || 0) - (Date.parse(a.pubDate) || 0))
    .slice(0, 36);
}
export async function getNews(id, { refresh = false } = {}) {
  const category = categoryById(id);
  if (!category)
    throw Object.assign(new Error("Categoria não encontrada."), {
      status: 404,
    });
  const saved = cache.get(id);
  if (
    saved &&
    Date.now() - Date.parse(saved.lastUpdated) < (refresh ? 30000 : TTL)
  )
    return { ...saved, cached: true };
  if (pending.has(id)) return pending.get(id);
  const task = (async () => {
    try {
      const sources = [...(directSources[id] || []), searchFeed(category)];
      const responses = await Promise.all(
        sources.map(async (source) => {
          try {
            const feed = await parser.parseURL(source.url);
            return {
              source,
              articles: normalizeItems(feed.items, id, source),
              ok: true,
            };
          } catch {
            return { source, articles: [], ok: false };
          }
        }),
      );
      if (!responses.some((r) => r.ok)) throw new Error("Fontes indisponíveis");
      const unique = new Map();
      for (const r of responses)
        for (const article of r.articles) {
          const key = article.title
            .toLowerCase()
            .replace(/[^\p{L}\p{N}]/gu, "");
          if (!unique.has(key)) unique.set(key, article);
        }
      const result = {
        category: id,
        cached: false,
        lastUpdated: new Date().toISOString(),
        articles: [...unique.values()]
          .sort(
            (a, b) =>
              (Date.parse(b.pubDate) || 0) - (Date.parse(a.pubDate) || 0),
          )
          .slice(0, 36),
        sources: responses.map((r) => ({
          name: r.source.name,
          status: r.ok ? "ok" : "unavailable",
        })),
      };
      if (responses.some((r) => !r.ok))
        result.warning =
          "Atualização parcial: uma fonte não respondeu; exibindo as demais.";
      cache.set(id, result);
      return result;
    } catch {
      if (saved)
        return {
          ...saved,
          cached: true,
          stale: true,
          warning:
            "Fonte indisponível. Exibindo a última atualização disponível.",
        };
      throw Object.assign(
        new Error(
          "A fonte está temporariamente indisponível. Tente novamente.",
        ),
        { status: 502 },
      );
    } finally {
      pending.delete(id);
    }
  })();
  pending.set(id, task);
  return task;
}
