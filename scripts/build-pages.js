import { mkdir, cp, writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { CATEGORIES } from "../public/topics.js";
import { getNews } from "../lib/news.js";
const root = new URL("../", import.meta.url),
  dist = new URL("dist/", root);
await mkdir(new URL("data/", dist), { recursive: true });
const cache = new URL(".news-cache/", root);
await mkdir(cache, { recursive: true });
await cp(new URL("public/", root), dist, { recursive: true });
await writeFile(
  new URL("site-config.json", dist),
  JSON.stringify({ mode: "static" }),
);
await writeFile(new URL(".nojekyll", dist), "");
let failed = 0,
  total = 0;
let preserved = 0;
const checks = [];
const queue = [...CATEGORIES];
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (queue.length) {
      const c = queue.shift();
      let data;
      try {
        data = await getNews(c.id);
        total += data.articles.length;
        await writeFile(new URL(c.id + ".json", cache), JSON.stringify(data));
      } catch {
        failed++;
        data = {
          category: c.id,
          lastUpdated: null,
          articles: [],
          warning:
            "Fonte temporariamente indisponível nesta edição. Tente outra seção.",
        };
        try {
          const old = JSON.parse(
            await readFile(new URL(c.id + ".json", cache), "utf8"),
          );
          if (Array.isArray(old.articles) && old.lastUpdated) {
            data = {
              ...old,
              stale: true,
              warning: "Exibindo a última edição disponível.",
            };
            preserved++;
            total += old.articles.length;
          }
        } catch {}
      }
      checks.push({
        id: c.id,
        count: data.articles.length,
        stale: !!data.stale,
        available: !!data.lastUpdated,
      });
      await writeFile(new URL(`data/${c.id}.json`, dist), JSON.stringify(data));
      console.log(`${c.id}: ${data.articles.length} notícias`);
    }
  }),
);
await writeFile(
  new URL("data/manifest.json", dist),
  JSON.stringify(
    {
      collectedAt: new Date().toISOString(),
      categories: CATEGORIES.length,
      failed,
      preserved,
      total,
      checks,
    },
    null,
    2,
  ),
);
if (failed > CATEGORIES.length * 0.3)
  throw new Error(
    "Mais de 30% das seções falharam; publicação cancelada para preservar a edição anterior.",
  );
console.log(
  `Site pronto: ${fileURLToPath(dist)}; ${total} notícias; ${failed} fontes indisponíveis.`,
);
