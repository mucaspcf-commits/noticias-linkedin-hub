import { categoryById, displayName } from "./topics.js";
export function createTemplate({
  title,
  summary = "",
  link,
  category,
  tone = "profissional",
  lang = "pt",
  emojis = "medium",
  hashtags = "few",
}) {
  const en = lang === "en";
  const name =
    displayName(categoryById(category), lang) ||
    (en ? "Technology" : "Tecnologia");
  const hooks = en
    ? {
        profissional: "On my professional reading list:",
        analitico: "A development worth examining:",
        persuasivo: "What could this change in your business?",
        descontraido: "An interesting read to share:",
      }
    : {
        profissional: "No meu radar profissional:",
        analitico: "Uma notícia para analisar com atenção:",
        persuasivo: "O que isso pode mudar no seu negócio?",
        descontraido: "Uma leitura interessante para compartilhar:",
      };
  const body = [
    `${emojis === "none" ? "" : "💡 "}${hooks[tone] || hooks.profissional}`,
    title,
    summary,
    en
      ? "Questions to explore: What changes in practice? Which opportunities and risks deserve attention?"
      : "Vale refletir: o que muda na prática? Quais oportunidades e riscos merecem atenção?",
    en
      ? "How does this connect with your work?"
      : "Como esse tema se conecta ao seu trabalho?",
    `${en ? "Source" : "Fonte"}: ${link}`,
  ];
  if (hashtags !== "none")
    body.push(
      hashtags === "many"
        ? `#${name
            .split(" ")[0]
            .normalize("NFD")
            .replace(
              /[^a-zA-Z]/g,
              "",
            )} ${en ? "#Technology #Business #Innovation #Learning" : "#Tecnologia #Negocios #Inovacao #Aprendizado"}`
        : en
          ? "#Technology #Business"
          : "#Tecnologia #Negocios",
    );
  return body.filter(Boolean).join("\n\n");
}
