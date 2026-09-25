import {
  TOPICS,
  CATEGORIES,
  FAMILIES,
  categoryById,
  displayName,
} from "./topics.js";
import { translate, bindStaticTranslations } from "./i18n.js";
import { createTemplate } from "./post-template.js";
const $ = (id) => document.getElementById(id);
const fold = (value) =>
  String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const safeUrl = (value) => {
  try {
    const u = new URL(value);
    return ["https:", "http:"].includes(u.protocol) ? u.href : "";
  } catch {
    return "";
  }
};
function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}
function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
const saved = read("bookmarked_articles", []);
const previous = read("hub_draft", {});
const state = {
  topic: "tecnologia",
  subtopic: "",
  language: read("hub_language", "pt") === "en" ? "en" : "pt",
  lastData: null,
  region: "br",
  favorites: false,
  articles: [],
  saved: Array.isArray(saved)
    ? saved.filter((a) => a && typeof a.title === "string" && safeUrl(a.link))
    : [],
  selected: previous.article || null,
  apiKey: "",
  static: false,
  request: 0,
  busy: false,
};
const t = (text) => translate(text, state.language);
const name = (item) => displayName(item, state.language);
const translateStatic = bindStaticTranslations();
const categoryId = () =>
  `${state.topic}${state.subtopic ? "--" + state.subtopic : ""}-${state.region}`;
function subnav() {
  const topic = TOPICS.find((x) => x.id === state.topic);
  $("subtopic").innerHTML =
    `<option value="">${t("Visão geral do tema")}</option>` +
    topic.subtopics
      .map((s) => `<option value="${s.id}">${esc(name(s))}</option>`)
      .join("");
  $("subtopic").value = state.subtopic;
  $("subtopic-section").hidden = state.favorites;
}
function languageUI() {
  translateStatic(state.language);
  nav();
  subnav();
  document
    .querySelectorAll("[data-language]")
    .forEach((b) =>
      b.setAttribute(
        "aria-pressed",
        String(b.dataset.language === state.language),
      ),
    );
  $("category-title").textContent = state.favorites
    ? t("Notícias salvas")
    : name(categoryById(categoryId()));
  $("region-label").textContent = state.favorites
    ? t("SUA CURADORIA / FAVORITAS")
    : `${t("SEU RADAR")} / ${t(state.region === "br" ? "Brasil" : "Mundo").toUpperCase()}`;
  $("language").value = state.language;
  if (state.static) {
    $("settings-open").textContent = t("Sobre os rascunhos ↗");
    $("settings-help").textContent = t(
      "Esta versão do GitHub Pages gera rascunhos por modelos locais, sem enviar dados a uma IA. Para geração com Gemini, execute a versão Node do projeto.",
    );
  }
  updateSources();
  if (state.lastData && !state.favorites) feedStatus(state.lastData);
  if (state.favorites)
    $("feed-status").textContent = t(
      "Sua seleção pessoal, salva neste navegador.",
    );
  if (state.busy)
    $("generation-status").textContent = t("Preparando rascunho…");
  else if (state.generationMessage)
    $("generation-status").textContent = t(state.generationMessage);
  render();
  saveDraft();
}
function feedStatus(data) {
  const date = data.lastUpdated
    ? new Date(data.lastUpdated).toLocaleString(
        state.language === "en" ? "en-US" : "pt-BR",
      )
    : t("não informada");
  $("feed-status").textContent =
    `${t(state.static ? "Edição coletada" : "Fontes consultadas")} ${t("em")} ${date}${state.static ? " · " + t("Atualização programada a cada 3h") : ""}${data.stale ? " · " + t("Exibindo a última edição disponível.") : data.warning ? " · " + t("Atualização parcial: algumas fontes não responderam.") : ""}`;
}
let controller, toastTimer;
function toast(message) {
  $("toast").textContent = message;
  $("toast").hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ($("toast").hidden = true), 3500);
}
function nav() {
  const q = fold($("topic-search").value);
  $("topics").innerHTML = FAMILIES.map((f) => {
    const topics = f.topics
      .map((id) => TOPICS.find((t) => t.id === id))
      .filter((item) =>
        fold(
          [
            item.name,
            item.nameEn,
            ...item.subtopics.flatMap((s) => [s.name, s.nameEn]),
          ].join(" "),
        ).includes(q),
      );
    if (!topics.length) return "";
    return (
      `<p class="family-label">${esc(t(f.name))}</p>` +
      topics
        .map(
          (item) =>
            `<button class="topic ${!state.favorites && state.topic === item.id ? "active" : ""}" data-topic="${item.id}" aria-current="${!state.favorites && state.topic === item.id ? "page" : "false"}">${esc(name(item))}</button>`,
        )
        .join("")
    );
  }).join("");
  document
    .querySelectorAll("[data-region]")
    .forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.region === state.region)),
    );
  $("saved-count").textContent = state.saved.length;
}
function updateSources() {
  const list = state.favorites ? state.saved : state.articles;
  const old = $("source").value;
  $("source").innerHTML =
    `<option value="">${t("Todas as fontes")}</option>` +
    [...new Set(list.map((a) => a.sourceName || t("Fonte")))]
      .sort()
      .map((s) => `<option value="${esc(s)}">${esc(s)}</option>`)
      .join("");
  if ([...$("source").options].some((o) => o.value === old))
    $("source").value = old;
}
function render() {
  const q = fold($("search").value),
    days = Number($("period").value),
    source = $("source").value;
  const all = state.favorites ? state.saved : state.articles;
  const articles = all
    .filter(
      (a) =>
        (!q || fold(`${a.title} ${a.summary} ${a.sourceName}`).includes(q)) &&
        (!source || a.sourceName === source) &&
        (!days ||
          (a.pubDate && Date.parse(a.pubDate) >= Date.now() - days * 86400000)),
    )
    .sort(
      (a, b) =>
        ($("sort").value === "old" ? 1 : -1) *
        ((Date.parse(a.pubDate) || 0) - (Date.parse(b.pubDate) || 0)),
    );
  $("results").textContent =
    `${articles.length} ${t("de")} ${all.length} ${t("notícias")}`;
  $("news-grid").innerHTML = articles.length
    ? articles
        .map((a, i) => {
          const isSaved = state.saved.some((s) => s.link === a.link);
          const date =
            a.pubDate && Number.isFinite(Date.parse(a.pubDate))
              ? new Date(a.pubDate).toLocaleDateString(
                  state.language === "en" ? "en-US" : "pt-BR",
                  {
                    day: "2-digit",
                    month: "short",
                  },
                )
              : t("Data não informada");
          const topic =
            name(categoryById(a.category)) ||
            name(TOPICS.find((t) => t.id === state.topic)) ||
            "Notícia";
          return `<article class="news-card"><div class="card-visual" data-tone="${i % 3}">${safeUrl(a.image) ? `<img src="${esc(safeUrl(a.image))}" loading="lazy" alt="">` : ""}<span class="source-badge">${esc(a.sourceName || t("Fonte"))}</span><button class="save-article" data-save="${esc(a.id)}" aria-pressed="${isSaved}" aria-label="${isSaved ? t("Remover dos salvos") : t("Salvar notícia")}">${isSaved ? "★" : "☆"}</button></div><div class="card-body"><div class="card-meta"><span>${esc(topic)}</span><time>${esc(date)}</time></div><h2>${esc(a.title)}</h2><p>${esc(a.summary || t("Confira os detalhes na matéria original."))}</p><div class="card-actions"><a href="${esc(safeUrl(a.link))}" target="_blank" rel="noopener noreferrer">${t("Ler na fonte ↗")}</a><button data-edit="${esc(a.id)}">${t("✦ Criar post")}</button></div></div></article>`;
        })
        .join("")
    : `<div class="empty"><h2>${t("Nenhuma notícia por aqui")}</h2><p>${t("Tente outro tema ou limpe os filtros.")}</p></div>`;
  $("news-grid")
    .querySelectorAll("img")
    .forEach((img) =>
      img.addEventListener("error", () => img.remove(), { once: true }),
    );
}
async function load(refresh = false) {
  const ticket = ++state.request;
  controller?.abort();
  controller = new AbortController();
  nav();
  const category = categoryId();
  subnav();
  $("category-title").textContent = state.favorites
    ? t("Notícias salvas")
    : name(categoryById(category));
  $("region-label").textContent = state.favorites
    ? t("SUA CURADORIA / FAVORITAS")
    : `${t("SEU RADAR")} / ${t(state.region === "br" ? "Brasil" : "Mundo").toUpperCase()}`;
  $("refresh").disabled = state.favorites;
  if (state.favorites) {
    $("news-grid").setAttribute("aria-busy", "false");
    $("feed-status").textContent = t(
      "Sua seleção pessoal, salva neste navegador.",
    );
    updateSources();
    render();
    return;
  }
  state.articles = [];
  state.lastData = null;
  $("results").textContent = "";
  $("feed-status").textContent = t("Buscando notícias…");
  $("news-grid").innerHTML = Array(6)
    .fill('<div class="skeleton" aria-hidden="true"></div>')
    .join("");
  $("news-grid").setAttribute("aria-busy", "true");
  try {
    const url = state.static
      ? `data/${category}.json${refresh ? "?v=" + Date.now() : ""}`
      : `api/news?category=${category}&refresh=${refresh}`;
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error("Fonte indisponível");
    const data = await response.json();
    if (ticket !== state.request) return;
    state.articles = Array.isArray(data.articles) ? data.articles : [];
    state.lastData = data;
    feedStatus(data);
    updateSources();
    render();
  } catch (error) {
    if (ticket !== state.request || error.name === "AbortError") return;
    $("feed-status").textContent = t("Não foi possível atualizar esta seção.");
    $("news-grid").innerHTML =
      `<div class="empty"><h2>${t("Fonte temporariamente indisponível")}</h2><p>${t("Use Atualizar para tentar novamente ou explore outro tema.")}</p></div>`;
    $("results").textContent = "";
  } finally {
    if (ticket === state.request) {
      $("news-grid").setAttribute("aria-busy", "false");
      $("refresh").disabled = false;
    }
  }
}
function selectArticle(article) {
  state.selected = article;
  $("selected-title").textContent = article?.title || t("Seu rascunho livre");
  $("selected-link").href = safeUrl(article?.link) || "#";
  $("selected-link").hidden = !safeUrl(article?.link);
  $("generate").disabled = !article || state.busy;
}
function saveDraft() {
  const text = $("draft").value;
  $("draft-count").textContent = `${text.length} / 3000 ${t("caracteres")}`;
  $("draft-count").classList.toggle("over-limit", text.length > 3000);
  $("draft-storage").textContent = write("hub_draft", {
    text,
    article: state.selected,
  })
    ? t("Salvo neste navegador")
    : t("Armazenamento indisponível");
}
async function generate() {
  if (!state.selected || state.busy) return;
  state.busy = true;
  $("generate").disabled = true;
  $("generation-status").textContent = t("Preparando rascunho…");
  const article = state.selected;
  const data = {
    ...article,
    summary: article.summary || "",
    category: article.category || categoryId(),
    tone: $("tone").value,
    lang: $("language").value,
    emojis: $("emojis").value,
    hashtags: $("hashtags").value,
    customInstructions: $("instructions").value,
    customApiKey: state.apiKey || null,
  };
  try {
    let result;
    if (state.static) {
      result = {
        text: createTemplate(data),
        warning: t(
          "Modelo local: o título e o resumo mantêm o idioma original; instruções livres exigem a versão com servidor.",
        ),
      };
    } else {
      const r = await fetch("api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(35000),
      });
      if (!r.ok) throw new Error("Falha ao gerar rascunho");
      result = await r.json();
    }
    $("draft").value = result.text;
    state.generationMessage =
      result.mode === "gemini"
        ? "Rascunho gerado com IA. Confira os fatos e a fonte antes de compartilhar."
        : "Modelo local: o título e o resumo mantêm o idioma original; instruções livres exigem a versão com servidor.";
    $("generation-status").textContent = t(state.generationMessage);
    saveDraft();
  } catch {
    $("generation-status").textContent = t(
      "A geração falhou. Seu texto anterior foi preservado; tente novamente.",
    );
  } finally {
    state.busy = false;
    $("generate").disabled = !state.selected;
  }
}
$("topics").addEventListener("click", (e) => {
  const b = e.target.closest("[data-topic]");
  if (!b) return;
  state.topic = b.dataset.topic;
  state.subtopic = "";
  $("search").value = "";
  state.favorites = false;
  $("source").value = "";
  load();
});
$("subtopic").addEventListener("change", () => {
  state.subtopic = $("subtopic").value;
  $("source").value = "";
  $("search").value = "";
  load();
});
document.querySelectorAll("[data-language]").forEach((b) =>
  b.addEventListener("click", () => {
    state.language = b.dataset.language;
    write("hub_language", state.language);
    languageUI();
  }),
);
document.querySelectorAll("[data-region]").forEach((b) =>
  b.addEventListener("click", () => {
    state.region = b.dataset.region;
    state.favorites = false;
    $("source").value = "";
    load();
  }),
);
$("topic-search").addEventListener("input", nav);
$("favorites").addEventListener("click", () => {
  state.favorites = true;
  load();
});
$("refresh").addEventListener("click", () => load(true));
for (const id of ["search", "period", "source", "sort"])
  $(id).addEventListener(id === "search" ? "input" : "change", render);
$("clear-filters").addEventListener("click", () => {
  $("search").value = "";
  $("period").value = "0";
  $("source").value = "";
  $("sort").value = "new";
  render();
});
$("news-grid").addEventListener("click", (e) => {
  const b = e.target.closest("[data-save],[data-edit]");
  if (!b) return;
  const article = [...state.articles, ...state.saved].find(
    (a) => a.id === (b.dataset.save || b.dataset.edit),
  );
  if (!article) return;
  if (b.dataset.save) {
    const index = state.saved.findIndex((a) => a.link === article.link);
    if (index >= 0) state.saved.splice(index, 1);
    else state.saved.push(article);
    toast(
      write("bookmarked_articles", state.saved)
        ? index >= 0
          ? t("Notícia removida.")
          : t("Notícia salva.")
        : t("Sem espaço para salvar neste navegador."),
    );
    nav();
    updateSources();
    render();
  } else {
    if (state.busy) {
      toast(t("Aguarde a geração atual."));
      return;
    }
    selectArticle(article);
    $("editor").showModal();
  }
});
$("open-draft").addEventListener("click", () => {
  $("editor").showModal();
});
$("generate").addEventListener("click", generate);
$("draft").addEventListener("input", saveDraft);
$("copy").addEventListener("click", async () => {
  if (!$("draft").value.trim()) {
    toast(t("Escreva ou gere um rascunho primeiro."));
    return;
  }
  try {
    await navigator.clipboard.writeText($("draft").value);
    toast(t("Texto copiado."));
  } catch {
    toast(t("Selecione o texto e copie manualmente."));
  }
});
$("export").addEventListener("click", () => {
  const url = URL.createObjectURL(
    new Blob([$("draft").value], { type: "text/plain;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "rascunho-linkedin.txt";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
$("settings-open").addEventListener("click", () => {
  $("settings").showModal();
});
$("save-key").addEventListener("click", () => {
  state.apiKey = $("api-key").value.trim();
  $("api-key").value = "";
  $("settings").close();
  toast(t("Chave disponível apenas nesta aba."));
});
$("clear-key").addEventListener("click", () => {
  state.apiKey = "";
  $("api-key").value = "";
  $("settings").close();
  toast(t("Chave removida."));
});
async function init() {
  // Remove legacy persistent API-key storage without reading or transmitting it.
  try {
    localStorage.removeItem("gemini_api_key");
  } catch {}
  $("draft").value = typeof previous.text === "string" ? previous.text : "";
  selectArticle(state.selected);
  saveDraft();
  nav();
  try {
    const config = await fetch("site-config.json");
    if (config.ok) {
      const data = await config.json();
      state.static = data.mode === "static";
    }
  } catch {}
  if (state.static) {
    $("settings-open").textContent = t("Sobre os rascunhos ↗");
    $("settings-help").textContent = t(
      "Esta versão do GitHub Pages gera rascunhos por modelos locais, sem enviar dados a uma IA. Para geração com Gemini, execute a versão Node do projeto.",
    );
    for (const id of ["api-key", "save-key", "clear-key"]) $(id).hidden = true;
    document.querySelector('label[for="api-key"]').hidden = true;
  }
  languageUI();
  await load();
}
init();
