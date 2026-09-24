# Notícias Hub — Radar profissional

Central de notícias e rascunhos para LinkedIn em português e inglês. Interface responsiva, acessível pelo teclado, sem conta obrigatória.

## Cobertura

24 temas × Brasil e Mundo = **48 seções**:
Tecnologia; Analytics & Dados; Inovação & Startups; Negócios & Economia; Inteligência Artificial; Cibersegurança & Privacidade; Cloud & Infraestrutura; Software & Engenharia; Produto & UX; Projetos & Agilidade; Análise de Negócios; Automação & Robótica; Fintechs & Pagamentos; Finanças & Investimentos; Marketing & Vendas; E-commerce & Varejo; Liderança & Gestão; Carreira & Futuro do Trabalho; Sustentabilidade & Energia; Logística & Operações; Healthtech & Biotecnologia; Agtech & Agronegócio; Ciência & Tecnologias Emergentes; Governança & Regulação.

As fontes combinam pesquisas RSS temáticas do Google Notícias e feeds diretos das categorias originais: Tecnoblog, Data Hackers, Startups.com.br, Brazil Journal, The Verge, AWS Big Data Blog, TechCrunch e CNBC. O nome do veículo e o link acompanham cada notícia. A presença no agregador não equivale a uma checagem editorial. Notícias podem se repetir entre temas relacionados; duplicatas dentro da mesma seção são removidas.

## Recursos

- Busca sem diferença de acentos, filtro de fonte e período, ordenação por data.
- Até 36 notícias por seção; datas desconhecidas são indicadas explicitamente.
- Favoritos e rascunho persistidos somente no navegador, com tratamento de armazenamento indisponível.
- Editor com tom, idioma, emojis e hashtags, contador de caracteres, cópia e download em TXT.
- Conteúdo externo escapado, identificadores estáveis, troca de categorias protegida contra respostas atrasadas.
- Geração com Gemini na versão Node, ou modelo local sem chave. O modo local não traduz o título/resumo nem aplica instruções livres. A interface informa essa limitação.
- Notícias sem resumo no RSS não recebem um resumo inventado. Sempre confira a matéria original.

## Executar localmente

Requer Node.js 22 ou superior.

```sh
npm ci
npm start
```

Abra http://localhost:3000. Para desenvolvimento: `npm run dev`.

Opcionalmente copie `.env.example` para `.env` e ajuste `PORT` ou `GEMINI_MODEL`. A chave Gemini é fornecida na interface, mantida apenas na memória da aba e enviada ao servidor, que chama a API do Google. Não há uma chave compartilhada do proprietário disponível para visitantes. `.env` não deve ser publicado. A geração paga não foi testada sem uma chave válida.

## GitHub Pages

O workflow `.github/workflows/pages.yml` testa o projeto, consulta os feeds e publica `dist/`. Configure **Settings → Pages → Source → GitHub Actions**. Executa em pushes na `main`, manualmente e a cada três horas; horários podem sofrer atraso do GitHub. O agendamento em repositórios públicos pode ser suspenso após períodos de inatividade conforme as regras do GitHub.

O site Pages usa notícias coletadas na última execução, com a data de coleta visível. O botão Atualizar recarrega essa edição; não dispara uma nova coleta. Favoritos, filtros e rascunhos locais funcionam sem servidor ou chaves. IA Gemini exige executar a versão Node (ou hospedá-la em um serviço compatível, usando a configuração Vercel incluída).

```sh
npm run build:pages
```

O build usa até quatro coletas simultâneas, com timeout por fonte. Quando todas falham, o build é interrompido para preservar a publicação anterior. Se uma seção falhar, o site informa a indisponibilidade sem fabricar notícias. Cada deploy substitui os dados da edição anterior; favoritos ficam no navegador.

## Verificação

```sh
npm test
npm audit
```

Os testes cobrem catálogo, IDs únicos, deduplicação, datas inválidas, URLs inseguras, atribuição no rascunho, validação da API e bloqueio de proxy de URLs arbitrárias.

## Estrutura

- `public/`: interface, catálogo compartilhado e modelo local de texto.
- `lib/news.js`: normalização, feeds, cache e recuperação de falhas.
- `server.js`: API Express e geração Gemini.
- `scripts/build-pages.js`: coleta e exportação estática.
- `test/`: testes automatizados.
- `.github/workflows/pages.yml`: publicação e atualização das notícias.

Nenhum post é enviado automaticamente ao LinkedIn. A publicação é sempre feita pelo usuário após revisão.
