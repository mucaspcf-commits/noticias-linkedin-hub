// Editorial boundaries: each subtopic belongs to one primary theme.
// Terms separated by | are alternatives, not mandatory simultaneous matches.
export const EXTRA_TOPICS = [
  [
    "pessoas",
    "Pessoas & Recursos Humanos",
    "users",
    "recursos humanos|gestão de pessoas",
    "human resources|people management",
  ],
  [
    "educacao",
    "Edtech & Aprendizagem",
    "book-open",
    "edtech|tecnologia educacional",
    "edtech|education technology",
  ],
  [
    "cliente",
    "Experiência do Cliente",
    "heart",
    "experiência do cliente|customer success",
    "customer experience|customer success",
  ],
  [
    "setor-publico",
    "Govtech & Serviços Públicos",
    "landmark",
    "govtech|governo digital",
    "govtech|digital government",
  ],
  [
    "mobilidade",
    "Mobilidade & Cidades Inteligentes",
    "train",
    "mobilidade urbana|cidades inteligentes",
    "urban mobility|smart cities",
  ],
  [
    "web3",
    "Blockchain & Economia Digital",
    "blocks",
    "blockchain|tokenização",
    "blockchain|tokenization",
  ],
];
const rows = {
  tecnologia: [
    [
      "transformacao",
      "Transformação digital",
      "transformação digital|maturidade digital",
      "digital transformation|digital maturity",
    ],
    [
      "iot",
      "Internet das Coisas",
      "internet das coisas|IoT industrial",
      "internet of things|industrial IoT",
    ],
    [
      "conectividade",
      "Conectividade & 5G",
      "redes 5G|conectividade digital",
      "5G networks|digital connectivity",
    ],
    [
      "hardware",
      "Hardware & Dispositivos",
      "hardware computadores|dispositivos inteligentes",
      "computer hardware|smart devices",
    ],
  ],
  analytics: [
    [
      "bi",
      "BI & Visualização",
      "business intelligence|Power BI|visualização de dados",
      "business intelligence|data visualization",
    ],
    [
      "engenharia",
      "Engenharia de Dados",
      "engenharia de dados|data lake|lakehouse",
      "data engineering|data lake|lakehouse",
    ],
    [
      "estatistica",
      "Estatística & Experimentação",
      "teste A/B|inferência causal|estatística aplicada",
      "A/B testing|causal inference|applied statistics",
    ],
    [
      "governanca-dados",
      "Qualidade & Governança de Dados",
      "qualidade de dados|governança de dados",
      "data quality|data governance",
    ],
  ],
  inovacao: [
    [
      "empreendedorismo",
      "Empreendedorismo",
      "empreendedorismo|novos negócios",
      "entrepreneurship|new ventures",
    ],
    [
      "venture-capital",
      "Venture Capital",
      "venture capital|capital de risco",
      "venture capital|startup funding",
    ],
    [
      "inovacao-aberta",
      "Inovação Aberta",
      "inovação aberta|parcerias startups",
      "open innovation|startup partnerships",
    ],
    [
      "scaleups",
      "Scale-ups & Ecossistemas",
      "scaleup|ecossistema startups",
      "scaleups|startup ecosystem",
    ],
  ],
  negocios: [
    [
      "macroeconomia",
      "Macroeconomia",
      "inflação economia|taxa de juros|PIB",
      "inflation economy|interest rates|GDP",
    ],
    [
      "estrategia",
      "Estratégia Competitiva",
      "estratégia competitiva|modelo de negócio",
      "competitive strategy|business models",
    ],
    [
      "fusoes",
      "Fusões & Aquisições",
      "fusões aquisições|aquisição empresas",
      "mergers acquisitions|corporate acquisition",
    ],
    [
      "internacional",
      "Comércio Internacional",
      "comércio internacional|exportações|geoeconomia",
      "international trade|exports|geoeconomics",
    ],
  ],
  ia: [
    [
      "generativa",
      "IA Generativa & LLMs",
      "IA generativa|modelos de linguagem",
      "generative AI|large language models",
    ],
    [
      "agentes",
      "Agentes & Copilotos",
      "agentes de IA|copilotos inteligência artificial",
      "AI agents|AI copilots",
    ],
    [
      "mlops",
      "Machine Learning & MLOps",
      "aprendizado de máquina|MLOps",
      "machine learning|MLOps",
    ],
    [
      "responsavel",
      "IA Responsável & Avaliação",
      "IA responsável|avaliação modelos IA|segurança IA",
      "responsible AI|AI evaluation|AI safety",
    ],
  ],
  seguranca: [
    [
      "ameacas",
      "Ameaças & Ransomware",
      "ransomware|ameaças cibernéticas",
      "ransomware|cyber threats",
    ],
    [
      "identidade",
      "Identidade & Zero Trust",
      "zero trust|gestão de identidade",
      "zero trust|identity access management",
    ],
    [
      "privacidade",
      "Privacidade & LGPD",
      "LGPD|proteção de dados pessoais",
      "GDPR|personal data protection",
    ],
    [
      "appsec",
      "AppSec & Resposta a Incidentes",
      "segurança aplicações|resposta incidentes cibernéticos",
      "application security|cyber incident response",
    ],
  ],
  cloud: [
    [
      "arquitetura",
      "Arquitetura Cloud",
      "arquitetura cloud|multicloud",
      "cloud architecture|multicloud",
    ],
    ["finops", "FinOps & Custos", "FinOps|custos nuvem", "FinOps|cloud costs"],
    [
      "plataformas",
      "Plataformas & Kubernetes",
      "Kubernetes|engenharia de plataforma",
      "Kubernetes|platform engineering",
    ],
    [
      "datacenters",
      "Data Centers & Edge",
      "data center|edge computing",
      "data centers|edge computing",
    ],
  ],
  desenvolvimento: [
    [
      "linguagens",
      "Linguagens & Frameworks",
      "linguagens de programação|JavaScript|Python",
      "programming languages|software frameworks",
    ],
    [
      "arquitetura-software",
      "Arquitetura & APIs",
      "arquitetura de software|microsserviços|desenvolvimento de APIs",
      "software architecture|API development",
    ],
    [
      "devops",
      "DevOps & Entrega Contínua",
      "DevOps|integração contínua",
      "DevOps|continuous delivery",
    ],
    [
      "qualidade",
      "Testes & Qualidade de Software",
      "testes de software|qualidade de software|testes automatizados",
      "software testing|software quality",
    ],
  ],
  produto: [
    [
      "discovery",
      "Discovery & Pesquisa",
      "product discovery|pesquisa usuários",
      "product discovery|user research",
    ],
    [
      "ux",
      "UX & Acessibilidade",
      "UX design|acessibilidade digital",
      "UX design|digital accessibility",
    ],
    [
      "roadmap",
      "Roadmaps & Priorização",
      "roadmap de produto|gestão de produto|priorização de produto",
      "product roadmap|product prioritization",
    ],
    [
      "growth",
      "Product Growth & Métricas",
      "product-led growth|métricas de produto|crescimento de produto",
      "product led growth|product metrics",
    ],
  ],
  projetos: [
    [
      "agilidade",
      "Agilidade & Scrum",
      "Scrum|gestão ágil",
      "Scrum|agile management",
    ],
    [
      "pmo",
      "PMO & Portfólio",
      "PMO|gestão de portfólio|escritório de projetos",
      "project management office|project portfolio management",
    ],
    [
      "riscos",
      "Riscos & Planejamento",
      "riscos projetos|planejamento projetos",
      "project risk management|project planning",
    ],
    [
      "mudanca",
      "Gestão da Mudança",
      "gestão da mudança|mudança organizacional",
      "organizational change management",
    ],
  ],
  "analise-negocios": [
    [
      "requisitos",
      "Requisitos & Stakeholders",
      "análise de requisitos|engenharia de requisitos|analista de negócios",
      "requirements analysis|business stakeholders",
    ],
    [
      "processos",
      "BPM & Process Mining",
      "gestão de processos|mineração de processos|process mining",
      "business process management|process mining",
    ],
    [
      "business-case",
      "Business Case & Viabilidade",
      "business case|viabilidade negócios",
      "business case|business feasibility",
    ],
    [
      "sistemas",
      "Sistemas de Negócio & ERP",
      "ERP|sistemas de gestão empresarial",
      "enterprise resource planning|business systems",
    ],
  ],
  automacao: [
    [
      "rpa",
      "RPA & Automação de Processos",
      "RPA automação|automação processos",
      "robotic process automation|process automation",
    ],
    [
      "robotica",
      "Robótica & Cobots",
      "robótica|robôs colaborativos",
      "robotics|collaborative robots",
    ],
    [
      "industria",
      "Indústria 4.0 & Manufatura",
      "indústria 4.0|manufatura inteligente",
      "industry 4.0|smart manufacturing",
    ],
    ["nocode", "No-code & Low-code", "no-code|low-code", "no-code|low-code"],
  ],
  fintech: [
    [
      "pagamentos",
      "Pagamentos & Pix",
      "Pix pagamentos|pagamentos digitais",
      "instant payments|digital payments",
    ],
    [
      "openfinance",
      "Open Finance",
      "open finance|open banking",
      "open finance|open banking",
    ],
    [
      "credito",
      "Crédito & Bancos Digitais",
      "crédito fintech|bancos digitais",
      "fintech lending|digital banking",
    ],
    [
      "seguros",
      "Insurtech & Regtech",
      "insurtech|regtech",
      "insurtech|regtech",
    ],
  ],
  financas: [
    [
      "mercados",
      "Mercados & Investimentos",
      "mercado ações|renda fixa",
      "stock market|fixed income",
    ],
    [
      "corporativas",
      "Finanças Corporativas",
      "finanças corporativas|FP&A",
      "corporate finance|financial planning analysis",
    ],
    [
      "risco",
      "Risco Financeiro",
      "risco financeiro|risco crédito",
      "financial risk|credit risk",
    ],
    [
      "valuation",
      "Valuation & Capital",
      "valuation empresas|mercado capitais",
      "company valuation|capital markets",
    ],
  ],
  marketing: [
    [
      "conteudo",
      "Conteúdo & Marca",
      "marketing conteúdo|branding",
      "content marketing|branding",
    ],
    [
      "aquisicao",
      "SEO & Aquisição",
      "SEO|aquisição clientes",
      "search engine optimization|customer acquisition",
    ],
    ["vendas", "Vendas & RevOps", "RevOps|vendas B2B", "RevOps|B2B sales"],
    [
      "social",
      "Redes Sociais & Creator Economy",
      "LinkedIn conteúdo|creator economy",
      "LinkedIn content|creator economy",
    ],
  ],
  ecommerce: [
    [
      "marketplaces",
      "Marketplaces",
      "marketplaces comércio",
      "ecommerce marketplaces",
    ],
    [
      "omnichannel",
      "Omnichannel & Varejo",
      "omnichannel|varejo digital",
      "omnichannel|digital retail",
    ],
    [
      "conversao",
      "Conversão & Checkout",
      "conversão de vendas|checkout|abandono de carrinho",
      "ecommerce conversion|checkout optimization",
    ],
    [
      "fulfillment",
      "Fulfillment & Last Mile",
      "fulfillment|última milha entregas",
      "fulfillment|last mile delivery",
    ],
  ],
  lideranca: [
    [
      "cultura",
      "Cultura & Liderança",
      "cultura organizacional|liderança equipes",
      "organizational culture|team leadership",
    ],
    [
      "decisao",
      "Decisão & Pensamento Estratégico",
      "tomada decisão empresas|pensamento estratégico",
      "business decision making|strategic thinking",
    ],
    [
      "okr",
      "OKRs & Desempenho",
      "OKR|gestão desempenho empresarial",
      "OKRs|business performance management",
    ],
    [
      "negociacao",
      "Negociação & Comunicação",
      "negociação empresarial|comunicação liderança",
      "business negotiation|leadership communication",
    ],
  ],
  carreira: [
    [
      "habilidades",
      "Habilidades & Requalificação",
      "requalificação profissional|habilidades futuro",
      "reskilling|future skills",
    ],
    [
      "emprego",
      "Mercado de Trabalho",
      "mercado trabalho tecnologia|empregabilidade",
      "technology job market|employability",
    ],
    [
      "remoto",
      "Trabalho Remoto & Híbrido",
      "trabalho remoto|trabalho híbrido",
      "remote work|hybrid work",
    ],
    [
      "networking",
      "Networking & Marca Pessoal",
      "networking profissional|marca pessoal",
      "professional networking|personal branding",
    ],
  ],
  sustentabilidade: [
    [
      "clima",
      "Clima & Descarbonização",
      "descarbonização|tecnologia climática",
      "decarbonization|climate technology",
    ],
    [
      "energia",
      "Energia & Transição",
      "energia renovável|transição energética",
      "renewable energy|energy transition",
    ],
    [
      "circular",
      "Economia Circular",
      "economia circular|reciclagem tecnologia",
      "circular economy|recycling technology",
    ],
    [
      "esg",
      "ESG & Relato Corporativo",
      "ESG empresas|relatório sustentabilidade",
      "corporate ESG|sustainability reporting",
    ],
  ],
  logistica: [
    [
      "supplychain",
      "Supply Chain & Resiliência",
      "cadeia suprimentos|supply chain resiliência",
      "supply chain|supply chain resilience",
    ],
    [
      "estoques",
      "Estoques & Compras",
      "gestão estoques|compras estratégicas",
      "inventory management|strategic procurement",
    ],
    [
      "transporte",
      "Transportes & Distribuição",
      "logística transporte|distribuição logística",
      "freight logistics|distribution logistics",
    ],
    [
      "operacoes",
      "Operações & Melhoria Contínua",
      "lean manufacturing|melhoria contínua",
      "lean manufacturing|continuous improvement",
    ],
  ],
  saude: [
    [
      "digital",
      "Saúde Digital & Telemedicina",
      "saúde digital|telemedicina",
      "digital health|telemedicine",
    ],
    [
      "biotech",
      "Biotecnologia",
      "biotecnologia|terapia gênica",
      "biotechnology|gene therapy",
    ],
    [
      "medtech",
      "Dispositivos & Medtech",
      "dispositivos médicos|medtech",
      "medical devices|medtech",
    ],
    [
      "dados-saude",
      "Dados & IA em Saúde",
      "inteligência artificial saúde|dados saúde",
      "AI healthcare|health data",
    ],
  ],
  agro: [
    [
      "precisao",
      "Agricultura de Precisão",
      "agricultura de precisão|sensores agrícolas",
      "precision agriculture|agricultural sensors",
    ],
    [
      "biotecnologia",
      "Biotecnologia Agrícola",
      "biotecnologia agrícola|bioinsumos",
      "agricultural biotechnology|bioinputs",
    ],
    [
      "cadeia-agro",
      "Cadeia & Rastreabilidade",
      "rastreabilidade agronegócio|cadeia agroalimentar",
      "agricultural traceability|agrifood supply chain",
    ],
    [
      "clima-agro",
      "Agro Sustentável",
      "agricultura regenerativa|agricultura sustentável",
      "regenerative agriculture|sustainable agriculture",
    ],
  ],
  ciencia: [
    [
      "quantica",
      "Computação Quântica",
      "computação quântica",
      "quantum computing",
    ],
    [
      "chips",
      "Semicondutores",
      "semicondutores|microchips",
      "semiconductors|microchips",
    ],
    [
      "espaco",
      "Espaço & Satélites",
      "exploração espacial|satélites tecnologia",
      "space exploration|satellite technology",
    ],
    [
      "materiais",
      "Materiais & Pesquisa Aplicada",
      "novos materiais|pesquisa aplicada",
      "advanced materials|applied research",
    ],
  ],
  governanca: [
    [
      "compliance",
      "Compliance & Integridade",
      "compliance empresas|integridade corporativa",
      "corporate compliance|business integrity",
    ],
    [
      "regulacao",
      "Regulação Digital",
      "regulação inteligência artificial|regulação plataformas",
      "AI regulation|digital platform regulation",
    ],
    [
      "conselhos",
      "Conselhos & Governança",
      "governança corporativa|conselhos administração",
      "corporate governance|boards of directors",
    ],
    [
      "legaltech",
      "Legaltech & Propriedade Intelectual",
      "legaltech|propriedade intelectual",
      "legaltech|intellectual property",
    ],
  ],
  pessoas: [
    [
      "talentos",
      "Recrutamento & Talentos",
      "recrutamento seleção|gestão talentos",
      "recruitment|talent management",
    ],
    [
      "peopleanalytics",
      "People Analytics",
      "people analytics|dados recursos humanos",
      "people analytics|HR analytics",
    ],
    [
      "inclusao",
      "Diversidade & Inclusão",
      "diversidade e inclusão|inclusão no trabalho",
      "workplace diversity|workplace inclusion|diversity and inclusion",
    ],
    [
      "bemestar",
      "Bem-estar & Benefícios",
      "bem-estar trabalho|benefícios corporativos",
      "workplace wellbeing|employee benefits",
    ],
  ],
  educacao: [
    [
      "edtech",
      "Plataformas Edtech",
      "plataformas educacionais|edtech",
      "learning platforms|edtech",
    ],
    [
      "corporativa",
      "Aprendizagem Corporativa",
      "educação corporativa|treinamento corporativo",
      "corporate learning|employee training",
    ],
    [
      "ia-educacao",
      "IA na Educação",
      "inteligência artificial educação",
      "artificial intelligence education",
    ],
    [
      "credenciais",
      "Microcredenciais & Certificações",
      "microcredenciais|certificações profissionais",
      "microcredentials|professional certifications",
    ],
  ],
  cliente: [
    [
      "customer-success",
      "Customer Success",
      "customer success|sucesso do cliente",
      "customer success|customer retention",
    ],
    [
      "atendimento",
      "Atendimento & Contact Centers",
      "atendimento cliente|contact center",
      "customer support|contact center",
    ],
    [
      "jornada",
      "Jornada & Voz do Cliente",
      "jornada cliente|voz do cliente",
      "customer journey|voice of customer",
    ],
    [
      "crm",
      "CRM & Fidelização",
      "CRM|fidelização de clientes|relacionamento com clientes",
      "customer relationship management|customer loyalty",
    ],
  ],
  "setor-publico": [
    [
      "servicos",
      "Serviços Públicos Digitais",
      "serviços públicos digitais|governo digital",
      "digital public services|digital government",
    ],
    [
      "dados-abertos",
      "Dados Abertos & Transparência",
      "dados abertos governo|transparência pública",
      "government open data|public transparency",
    ],
    [
      "compras",
      "Compras Públicas & Inovação",
      "compras públicas inovação|licitações tecnologia",
      "public procurement|government technology procurement",
    ],
    [
      "politicas",
      "Políticas de Inovação",
      "política inovação|inclusão digital",
      "innovation policy|digital inclusion",
    ],
  ],
  mobilidade: [
    [
      "eletrica",
      "Mobilidade Elétrica",
      "veículos elétricos|infraestrutura recarga",
      "electric vehicles|charging infrastructure",
    ],
    [
      "cidades",
      "Cidades Inteligentes",
      "cidades inteligentes|infraestrutura urbana digital",
      "smart cities|digital urban infrastructure",
    ],
    [
      "transporte-publico",
      "Transporte Público & MaaS",
      "mobilidade serviço|transporte público tecnologia",
      "mobility as a service|public transport technology",
    ],
    [
      "autonomos",
      "Veículos Autônomos",
      "veículos autônomos|direção autônoma",
      "autonomous vehicles|self driving",
    ],
  ],
  web3: [
    [
      "blockchain",
      "Blockchain Empresarial",
      "blockchain empresarial|blockchain corporativo|blockchain nas empresas",
      "enterprise blockchain|business blockchain",
    ],
    [
      "tokenizacao",
      "Tokenização de Ativos",
      "tokenização ativos|ativos digitais tokenizados",
      "asset tokenization|tokenized assets",
    ],
    [
      "identidade-digital",
      "Identidade Descentralizada",
      "identidade descentralizada|credenciais verificáveis",
      "decentralized identity|verifiable credentials",
    ],
    [
      "infraestrutura",
      "Infraestrutura & Regulação Web3",
      "regulação criptoativos|infraestrutura blockchain",
      "crypto regulation|blockchain infrastructure",
    ],
  ],
};
export const SUBTOPICS = Object.fromEntries(
  Object.entries(rows).map(([parent, children]) => [
    parent,
    children.map(([id, name, pt, en]) => ({
      id,
      name,
      queries: { br: pt, world: en },
    })),
  ]),
);
export const FAMILIES = [
  {
    name: "Tecnologia & Dados",
    topics: [
      "tecnologia",
      "ia",
      "analytics",
      "seguranca",
      "cloud",
      "desenvolvimento",
      "automacao",
      "ciencia",
      "web3",
    ],
  },
  {
    name: "Negócios & Finanças",
    topics: ["negocios", "inovacao", "fintech", "financas", "governanca"],
  },
  {
    name: "Produto, Clientes & Execução",
    topics: [
      "produto",
      "analise-negocios",
      "projetos",
      "marketing",
      "ecommerce",
      "cliente",
      "logistica",
    ],
  },
  {
    name: "Pessoas & Aprendizagem",
    topics: ["lideranca", "carreira", "pessoas", "educacao"],
  },
  {
    name: "Setores & Impacto",
    topics: [
      "sustentabilidade",
      "saude",
      "agro",
      "setor-publico",
      "mobilidade",
    ],
  },
];
