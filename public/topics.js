import { EXTRA_TOPICS, SUBTOPICS, FAMILIES } from "./taxonomy.js";
import { THEME_EN, SUBTHEME_EN } from "./catalog-en.js";
export { FAMILIES };
export const TOPICS = [
  [
    "tecnologia",
    "Tecnologia",
    "cpu",
    "tecnologia transformação digital",
    "technology digital transformation",
  ],
  [
    "analytics",
    "Analytics & Dados",
    "bar-chart-3",
    "análise dados business intelligence",
    "data analytics business intelligence",
  ],
  [
    "inovacao",
    "Inovação & Startups",
    "lightbulb",
    "inovação startups empreendedorismo",
    "innovation startups venture capital",
  ],
  [
    "negocios",
    "Negócios & Economia",
    "briefcase",
    "negócios economia empresas",
    "business economy companies",
  ],
  [
    "ia",
    "Inteligência Artificial",
    "brain",
    "inteligência artificial IA generativa agentes",
    "artificial intelligence generative AI agents",
  ],
  [
    "seguranca",
    "Cibersegurança & Privacidade",
    "shield-check",
    "cibersegurança privacidade LGPD",
    "cybersecurity privacy data protection",
  ],
  [
    "cloud",
    "Cloud & Infraestrutura",
    "cloud",
    "computação nuvem infraestrutura data centers",
    "cloud computing infrastructure data centers",
  ],
  [
    "desenvolvimento",
    "Software & Engenharia",
    "code-2",
    "engenharia software programação DevOps",
    "software engineering programming DevOps",
  ],
  [
    "produto",
    "Produto & UX",
    "layers",
    "gestão produto digital experiência usuário",
    "product management user experience UX",
  ],
  [
    "projetos",
    "Projetos & Agilidade",
    "kanban",
    "gestão projetos agilidade transformação",
    "project management agile transformation",
  ],
  [
    "analise-negocios",
    "Análise de Negócios",
    "chart-no-axes-combined",
    "análise negócios requisitos processos BPM",
    "business analysis requirements process management",
  ],
  [
    "automacao",
    "Automação & Robótica",
    "bot",
    "automação robótica RPA indústria 4.0",
    "automation robotics RPA industry 4.0",
  ],
  [
    "fintech",
    "Fintechs & Pagamentos",
    "wallet",
    "fintech pagamentos bancos digitais open finance",
    "fintech payments digital banking open finance",
  ],
  [
    "financas",
    "Finanças & Investimentos",
    "trending-up",
    "finanças investimentos mercado capitais",
    "finance investing capital markets",
  ],
  [
    "marketing",
    "Marketing & Vendas",
    "megaphone",
    "marketing digital vendas marcas",
    "digital marketing sales branding",
  ],
  [
    "ecommerce",
    "E-commerce & Varejo",
    "shopping-cart",
    "ecommerce varejo comércio eletrônico",
    "ecommerce retail digital commerce",
  ],
  [
    "lideranca",
    "Liderança & Gestão",
    "users",
    "liderança gestão estratégia organizações",
    "leadership management corporate strategy",
  ],
  [
    "carreira",
    "Carreira & Futuro do Trabalho",
    "graduation-cap",
    "carreira futuro trabalho educação profissional",
    "careers future of work professional education",
  ],
  [
    "sustentabilidade",
    "Sustentabilidade & Energia",
    "leaf",
    "sustentabilidade ESG energia renovável",
    "sustainability ESG renewable energy",
  ],
  [
    "logistica",
    "Logística & Operações",
    "truck",
    "logística supply chain operações",
    "logistics supply chain operations",
  ],
  [
    "saude",
    "Healthtech & Biotecnologia",
    "heart-pulse",
    "healthtech biotecnologia saúde digital",
    "healthtech biotechnology digital health",
  ],
  [
    "agro",
    "Agtech & Agronegócio",
    "sprout",
    "agtech agronegócio agricultura tecnologia",
    "agtech agribusiness agriculture technology",
  ],
  [
    "ciencia",
    "Ciência & Tecnologias Emergentes",
    "flask-conical",
    "ciência computação quântica semicondutores espaço",
    "science quantum computing semiconductors space",
  ],
  [
    "governanca",
    "Governança & Regulação",
    "scale",
    "governança corporativa regulação tecnologia compliance",
    "corporate governance technology regulation compliance",
  ],
  ...EXTRA_TOPICS,
].map(([id, name, icon, pt, en]) => ({
  id,
  name,
  icon,
  queries: { br: pt, world: en },
  nameEn: THEME_EN[id],
  subtopics: SUBTOPICS[id].map((s, i) => ({
    ...s,
    nameEn: SUBTHEME_EN[id][i],
  })),
}));
export const CATEGORIES = TOPICS.flatMap((t) =>
  ["br", "world"].flatMap((region) =>
    [null, ...t.subtopics].map((s) => ({
      id: `${t.id}${s ? "--" + s.id : ""}-${region}`,
      topic: t.id,
      subtopic: s?.id || null,
      region,
      name: s?.name || t.name,
      nameEn: s?.nameEn || t.nameEn,
      icon: t.icon,
      label: `${t.name}${s ? " / " + s.name : ""} (${region === "br" ? "Brasil" : "Mundo"})`,
      query: (s || t).queries[region],
    })),
  ),
);
export const categoryById = (id) => CATEGORIES.find((c) => c.id === id);
export const displayName = (item, lang = "pt") =>
  lang === "en" ? item?.nameEn : item?.name;
const searches = {
  tecnologia: [
    "tecnologia|transformação digital",
    "technology|digital transformation",
  ],
  analytics: [
    "análise de dados|business intelligence|ciência de dados",
    "data analytics|business intelligence|data science",
  ],
  inovacao: [
    "inovação|startups|empreendedorismo",
    "innovation|startups|venture capital",
  ],
  negocios: ["negócios|economia|empresas", "business|economy|companies"],
  ia: [
    "inteligência artificial|IA generativa|agentes de IA",
    "artificial intelligence|generative AI|AI agents",
  ],
  seguranca: [
    "cibersegurança|LGPD|privacidade de dados",
    "cybersecurity|data privacy|data protection",
  ],
  cloud: [
    "computação em nuvem|data centers|cloud computing",
    "cloud computing|data centers|cloud infrastructure",
  ],
  desenvolvimento: [
    "engenharia de software|programação|DevOps",
    "software engineering|programming|DevOps",
  ],
  produto: [
    "produto digital|experiência do usuário|gestão de produto",
    "product management|user experience|UX design",
  ],
  projetos: [
    "gestão de projetos|metodologias ágeis|Scrum",
    "project management|agile methodology|Scrum",
  ],
  "analise-negocios": [
    "análise de negócios|gestão de processos|BPM",
    "business analysis|business requirements|process management",
  ],
  automacao: [
    "automação|robótica|indústria 4.0",
    "automation|robotics|industry 4.0",
  ],
  fintech: [
    "fintech|pagamentos digitais|open finance",
    "fintech|digital payments|open banking",
  ],
  financas: [
    "mercado financeiro|investimentos|mercado de capitais",
    "financial markets|investing|capital markets",
  ],
  marketing: [
    "marketing digital|estratégia de vendas|marcas",
    "digital marketing|sales strategy|branding",
  ],
  ecommerce: [
    "ecommerce|varejo|comércio eletrônico",
    "ecommerce|retail|digital commerce",
  ],
  lideranca: [
    "liderança|gestão empresarial|estratégia empresarial",
    "leadership|corporate management|business strategy",
  ],
  carreira: [
    "carreira|futuro do trabalho|educação profissional",
    "careers|future of work|professional education",
  ],
  sustentabilidade: [
    "sustentabilidade|ESG|energia renovável",
    "sustainability|ESG|renewable energy",
  ],
  logistica: [
    "logística|supply chain|gestão de operações",
    "logistics|supply chain|operations management",
  ],
  saude: [
    "healthtech|biotecnologia|saúde digital",
    "healthtech|biotechnology|digital health",
  ],
  agro: [
    "agtech|agronegócio|agricultura digital",
    "agtech|agribusiness|digital agriculture",
  ],
  ciencia: [
    "computação quântica|semicondutores|exploração espacial",
    "quantum computing|semiconductors|space exploration",
  ],
  governanca: [
    "governança corporativa|regulação de tecnologia|compliance",
    "corporate governance|technology regulation|compliance",
  ],
};
export function searchFeed(category) {
  const terms = category.subtopic
    ? category.query
    : searches[category.topic]?.[category.region === "br" ? 0 : 1] ||
      category.query;
  const query = terms
    .split("|")
    .map((term) => `"${term}"`)
    .join(" OR ");
  const p = new URLSearchParams({
    q: `(${query}) when:30d`,
    hl: category.region === "br" ? "pt-BR" : "en-US",
    gl: category.region === "br" ? "BR" : "US",
    ceid: category.region === "br" ? "BR:pt-419" : "US:en",
  });
  return {
    name: "Google Notícias",
    url: `https://news.google.com/rss/search?${p}`,
  };
}
