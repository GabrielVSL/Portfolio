<div align="center">

<img src="./frontend/public/favicon.svg" width="72" height="72" alt="Gabriel Lopes Logo" />

# Gabriel Victor Souza Lopes · Software Engineering Portfolio

**Desenvolvedor Full Stack & Analista de Sistemas**  
*Engenharia de Software @ PUC Minas · Belo Horizonte, MG*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Gabriel_Victor_Souza-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabrielvictorsouza/)
[![GitHub](https://img.shields.io/badge/GitHub-GabrielVSL-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/GabrielVSL)
[![Email](https://img.shields.io/badge/Email-gabrieelvictor26%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:gabrieelvictor26@gmail.com)
[![License](https://img.shields.io/badge/License-MIT-3279f9?style=for-the-badge)](./LICENSE)

</div>

---

## ⚡ Visão Geral

Este repositório contém o código-fonte do meu portfólio profissional. Mais do que uma página estática de links, o próprio site foi projetado como uma **demonstração prática de engenharia front-end, performance gráfica no navegador e arquitetura de componentes**:

- **Zero Bibliotecas 3D Pesadas:** Toda a cena espacial interativa da Hero (`<AsciiCosmosCanvas />`) foi escrita do zero em **HTML5 `<canvas>` 2D puro**, calculando projeção 3D em perspectiva, iluminação direcional Lambertiana ($N \cdot L$) em rampa de caracteres ASCII e física de campo vetorial a 60fps.
- **Grade Arquitetônica com Respiro na GPU (`<BreathingGridBackground />`):** Uma malha pontilhada de `72x72px` em SVG atua como `mask-image` no CSS, permitindo que ondas de luz coloridas (`translate3d` + `scale` + `opacity`) iluminem exclusivamente os pontilhados de `1px` da grade sem alterar a cor do fundo escuro (`#0a0b0f`).
- **Grafo de Stack com Zero Re-renders (`<TechSection />`):** A constelação de 24 tecnologias conectadas usa animações puras de compositor CSS (`will-change: transform`) combinadas a um único loop de `requestAnimationFrame` controlado por `IntersectionObserver` que manipula referências DOM diretamente, sem disparar re-renderizações do React ao mover o mouse.
- **Showcase de Projetos com Instância Única de Vídeo (`<ProjectsSection />`):** Substituição de `85 MB` de GIFs decodificados na CPU por um palco interativo que monta **apenas 1 elemento `<video>` (`.mp4` H.264 acelerado por hardware)** por vez, reduzindo o peso inicial de mídia em **99,7%**.
- **Internacionalização Nativa (`PT / EN`):** Suporte completo a Português e Inglês em todas as seções via Context API (`LanguageContext`).

---

## 🚀 Projetos em Destaque no Portfólio

| # | Projeto | Categoria | Stack Principal | Links |
| :-: | :--- | :--- | :--- | :--- |
| **01** | **Orderly** | Full Stack · Arquitetura REST | `React` `Node.js` `Express` `PostgreSQL` `Sequelize` | [🌐 Live Demo](https://orderly-online.vercel.app/) · [💻 GitHub](https://github.com/GabrielVSL/Orderly) |
| **02** | **Portal Educacional CSPC** | Em Produção · **-30% Chamados** | `React` `JavaScript` `Tailwind CSS` `Dynamic JSON` | [🌐 Live Demo](https://jogos-cspc.vercel.app) · [💻 GitHub](https://github.com/GabrielVSL/InformaticaCSPC) |
| **03** | **BHFlix** | Frontend & Serverless BFF | `React` `Vite` `Tailwind CSS` `Vercel Serverless` | [🌐 Live Demo](https://bhflix.vercel.app) · [💻 GitHub](https://github.com/GabrielVSL/BHFlix) |
| **04** | **ClearPath** | Mobile Nativo · Ecossistema Apple | `Swift` `SwiftUI` `iOS` | [💻 GitHub](https://github.com/GabrielVSL/ClearPath) |
| **05** | **RentCars** | Arquitetura & Tipagem Estática | `TypeScript` `Node.js` `Clean Code` | [💻 GitHub](https://github.com/GabrielVSL/RentCars) |
| **06** | **Educoins** | Eng. de Software · PUC Minas | `JavaScript` `SCSS` `REST API` | [💻 GitHub](https://github.com/GabrielVSL/Educoins) |
| **07** | **Sincronização de Threads** | Concorrência & Sistemas | `Go (Golang)` `Goroutines` `Concurrency` | [💻 GitHub](https://github.com/GabrielVSL/SincronizacaoThreads) |
| **08** | **GSA · Sistema Aeroportuário** | Programação Orientada a Objetos | `Java` `POO` `Arquitetura` | [💻 GitHub](https://github.com/GabrielVSL/GSA-GerenciadorSistemaAeroportuario) |

---

## 🏛️ Arquitetura do Projeto

```text
Portfolio/
├── LICENSE                                  # Licença MIT
├── README.md                                # Documentação técnica do projeto
└── frontend/                                # Aplicação React 19 + Vite 7 + Tailwind CSS 4
    ├── index.html                           # Entry point HTML + Favicon SVG customizado
    ├── package.json                         # Dependências enxutas de produção
    ├── vite.config.js                       # Configuração de build do Vite
    ├── public/                              # Previews em MP4 otimizados, posters JPG e ícone
    │   ├── favicon.svg                      # Ícone vetorial orbital + grafo (✦)
    │   ├── orderly.mp4 / orderly-poster.jpg
    │   ├── cspc.mp4 / cspc-poster.jpg
    │   ├── bhflix.mp4 / bhflix-poster.jpg
    │   └── clearpath.mp4 / clearpath-poster.jpg
    └── src/
        ├── main.jsx                         # Bootstrap React + LanguageProvider
        ├── App.jsx                          # Composição de seções + Lenis Smooth Scroll
        ├── index.css                        # Tokens de tema e estilização global
        ├── contexts/
        │   └── LanguageContext.jsx          # Contexto bilíngue (PT-BR / EN-US)
        └── components/
            ├── sections/                    # Seções principais da página
            │   ├── HeroSection.jsx          # Hero com campo de partículas ASCII 3D
            │   ├── AboutSection.jsx         # Resumo executivo estilo macOS + stack
            │   ├── ProjectsSection.jsx      # Palco interativo de projetos + repositórios
            │   ├── TechSection.jsx          # Grafo conectado de 24 tecnologias
            │   ├── JourneySection.jsx       # Linha do tempo profissional e acadêmica
            │   └── ContactSection.jsx       # Canal direto para recrutadores
            └── ui/                          # Motores visuais e componentes de interface
                ├── Navbar.jsx               # Navegação flutuante com Scroll Spy e idioma
                ├── HeroTypography.jsx       # Tipografia principal da Hero
                ├── AsciiCosmosCanvas.jsx    # Motor 2D de planeta e anéis ASCII em 60fps
                ├── BreathingGridBackground.jsx # Grade pontilhada com máscara SVG e respiro GPU
                └── ScrollStroke.jsx         # Linha guia animada pelo progresso do scroll
```

---

## 🛠️ Tecnologias do Portfólio

- **Core:** [React 19](https://react.dev/) + [Vite 7](https://vite.dev/)
- **Estilização:** [Tailwind CSS 4](https://tailwindcss.com/) + CSS Custom Properties & SVG Masks
- **Animações & Scroll:** [Framer Motion](https://www.framer.com/motion/) + [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
- **Gráficos Interativos:** HTML5 `<canvas>` 2D API nativo + SVG Vetorial

---

## 💻 Como Executar Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/GabrielVSL/Portfolio.git

# 2. Acesse a pasta da aplicação
cd Portfolio/frontend

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento (http://localhost:5173)
npm run dev
```

Para gerar o build otimizado de produção:

```bash
npm run build
npm run preview
```

---

## 📬 Contato

- **Nome:** Gabriel Victor Souza Lopes
- **Formação:** Engenharia de Software — PUC Minas (Previsão: Junho/2028)
- **Atuação Atual:** Analista de Sistemas — Colégio São Paulo da Cruz
- **LinkedIn:** [linkedin.com/in/gabrielvictorsouza](https://www.linkedin.com/in/gabrielvictorsouza/)
- **GitHub:** [github.com/GabrielVSL](https://github.com/GabrielVSL)
- **E-mail:** [gabrieelvictor26@gmail.com](mailto:gabrieelvictor26@gmail.com)
