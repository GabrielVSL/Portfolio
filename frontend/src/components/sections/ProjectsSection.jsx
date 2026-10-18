import React, { useState, useRef, useEffect } from 'react';
import {
  FiGithub,
  FiExternalLink,
  FiArrowUpRight,
  FiLayers,
  FiCpu,
  FiDatabase,
  FiSmartphone,
  FiCheckCircle,
} from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const featuredProjects = [
  {
    id: 'orderly',
    index: '01',
    icon: FiDatabase,
    tabTitle: 'Orderly',
    tabSubPt: 'Full Stack · Node & React',
    tabSubEn: 'Full Stack · Node & React',
    badgePt: 'ARQUITETURA FULL STACK REST',
    badgeEn: 'FULL STACK REST ARCHITECTURE',
    title: 'Orderly — Sistema de Pedidos',
    urlDisplay: 'orderly-online.vercel.app',
    accentColor: '#2563eb',
    accentLine: '#60a5fa',
    descriptionPt:
      'Aplicação full-stack ponta a ponta projetada com arquitetura de componentes reutilizáveis. O backend em Node.js e Express gerencia regras de negócio e persistência relacional via Sequelize + PostgreSQL, enquanto o frontend em React utiliza Context API como fonte única da verdade.',
    descriptionEn:
      'End-to-end full-stack application designed with reusable component architecture. The Node.js & Express backend handles business logic and relational persistence via Sequelize + PostgreSQL, while the React frontend uses Context API as the single source of truth.',
    architectureNodes: [
      { role: 'Frontend UI', value: 'React + Context API' },
      { role: 'REST API', value: 'Node.js + Express' },
      { role: 'ORM & Dados', value: 'Sequelize + PostgreSQL' },
    ],
    highlightsPt: [
      'Modelagem relacional completa no PostgreSQL com migrações e relacionamentos via Sequelize.',
      'Sincronização instantânea de estado do carrinho e pedidos sem prop-drilling.',
      'API RESTful modularizada seguindo separação de responsabilidades (Controllers/Models).',
    ],
    highlightsEn: [
      'Complete relational modeling in PostgreSQL with migrations and associations via Sequelize.',
      'Instant cart and order state synchronization without prop-drilling.',
      'Modular RESTful API following strict separation of concerns (Controllers/Models).',
    ],
    stack: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.simpleicons.org/express/ffffff' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: 'Sequelize', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sequelize/sequelize-original.svg' },
    ],
    video: '/orderly.mp4',
    poster: '/orderly-poster.jpg',
    liveUrl: 'https://orderly-online.vercel.app/',
    repoUrl: 'https://github.com/GabrielVSL/Orderly',
  },
  {
    id: 'cspc',
    index: '02',
    icon: FiCheckCircle,
    tabTitle: 'Portal CSPC',
    tabSubPt: 'Em Produção · -30% Chamados',
    tabSubEn: 'In Production · -30% Tickets',
    badgePt: 'IMPACTO REAL EM PRODUÇÃO',
    badgeEn: 'REAL PRODUCTION IMPACT',
    title: 'Portal Educacional CSPC',
    urlDisplay: 'jogos-cspc.vercel.app',
    accentColor: '#0284c7',
    accentLine: '#38bdf8',
    descriptionPt:
      'Plataforma interativa implantada nos laboratórios do Colégio São Paulo da Cruz. Construída com uma arquitetura orientada a JSON dinâmico que permite atualizar atividades e links pedagógicos sem alterar código-fonte, reduzindo em 30% os chamados técnicos operacionais.',
    descriptionEn:
      'Interactive platform deployed across computer labs at Colégio São Paulo da Cruz. Built with a dynamic JSON-driven architecture that allows updating educational activities without touching source code, reducing operational support tickets by 30%.',
    architectureNodes: [
      { role: 'Interface', value: 'React + Tailwind CSS' },
      { role: 'Motor de Dados', value: 'Dynamic JSON Schema' },
      { role: 'Resultado', value: '-30% Chamados TI' },
    ],
    highlightsPt: [
      'Redução comprovada de 30% no volume de chamados técnicos durante as aulas de laboratório.',
      'Arquitetura desacoplada por JSON: novos conteúdos entram no ar em segundos sem redeploy complexo.',
      'Interface de alta legibilidade e zero fricção em uso diário por estudantes e professores.',
    ],
    highlightsEn: [
      'Proven 30% reduction in technical support tickets during computer lab classes.',
      'JSON-decoupled architecture: new content goes live in seconds without complex code changes.',
      'High-legibility, zero-friction UI used daily by students and teachers.',
    ],
    stack: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/ffffff' },
    ],
    video: '/cspc.mp4',
    poster: '/cspc-poster.jpg',
    liveUrl: 'https://jogos-cspc.vercel.app',
    repoUrl: 'https://github.com/GabrielVSL/InformaticaCSPC',
  },
  {
    id: 'bhflix',
    index: '03',
    icon: FiCpu,
    tabTitle: 'BHFlix',
    tabSubPt: 'Frontend & BFF Serverless',
    tabSubEn: 'Frontend & Serverless BFF',
    badgePt: 'ARQUITETURA BFF & PERFORMANCE',
    badgeEn: 'BFF ARCHITECTURE & PERFORMANCE',
    title: 'BHFlix — Streaming & Catálogo BFF',
    urlDisplay: 'bhflix.vercel.app',
    accentColor: '#4f46e5',
    accentLine: '#818cf8',
    descriptionPt:
      'Catálogo de mídia com foco em segurança de API e experiência fluida. Utiliza uma camada Backend-for-Frontend (BFF) Serverless na Vercel para mascarar chaves sensíveis da API TMDB, busca em tempo real otimizada com Debounce e persistência local.',
    descriptionEn:
      'Media catalog focused on API security and fluid UX. Uses a Serverless Backend-for-Frontend (BFF) layer on Vercel to mask sensitive TMDB API keys, Debounce-optimized real-time search, and local persistence.',
    architectureNodes: [
      { role: 'Cliente Web', value: 'React + Vite + Debounce' },
      { role: 'Camada BFF', value: 'Vercel Serverless Proxy' },
      { role: 'Persistência', value: 'LocalStorage + TMDB API' },
    ],
    highlightsPt: [
      'Proteção completa de credenciais no servidor via arquitetura BFF (Backend-for-Frontend).',
      'Controle de concorrência e economia de requisições na busca com algoritmo de Debounce.',
      'Gerenciamento de estado "Minha Lista" persistido localmente com resposta imediata.',
    ],
    highlightsEn: [
      'Complete server-side credential protection via Backend-for-Frontend (BFF) architecture.',
      'Request throttling and concurrency control in search using Debounce.',
      'Locally persisted Watchlist state management with instant UI feedback.',
    ],
    stack: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Vercel Serverless', icon: 'https://cdn.simpleicons.org/vercel/ffffff' },
    ],
    video: '/bhflix.mp4',
    poster: '/bhflix-poster.jpg',
    liveUrl: 'https://bhflix.vercel.app',
    repoUrl: 'https://github.com/GabrielVSL/BHFlix',
  },
  {
    id: 'clearpath',
    index: '04',
    icon: FiSmartphone,
    tabTitle: 'ClearPath',
    tabSubPt: 'Mobile Nativo · Swift & iOS',
    tabSubEn: 'Native Mobile · Swift & iOS',
    badgePt: 'ECOSSISTEMA APPLE NATIVO',
    badgeEn: 'NATIVE APPLE ECOSYSTEM',
    title: 'ClearPath — App Nativo iOS',
    urlDisplay: 'github.com/GabrielVSL/ClearPath',
    accentColor: '#7c3aed',
    accentLine: '#a78bfa',
    descriptionPt:
      'Aplicação mobile nativa para iOS construída com Swift e SwiftUI. Projetada para entregar transições nativas a 60fps, arquitetura declarativa limpa e total aderência às Human Interface Guidelines da Apple.',
    descriptionEn:
      'Native iOS mobile application built with Swift and SwiftUI. Engineered to deliver 60fps native transitions, clean declarative architecture, and strict adherence to Apple Human Interface Guidelines.',
    architectureNodes: [
      { role: 'UI Nativa', value: 'SwiftUI Declarativo' },
      { role: 'Linguagem', value: 'Swift (Tipagem Forte)' },
      { role: 'Plataforma', value: 'iOS Apple HIG' },
    ],
    highlightsPt: [
      'Construído 100% em Swift e SwiftUI nativo, sem camadas de ponte híbrida.',
      'Gerenciamento de estado reativo e navegação fluida seguindo padrões da Apple.',
      'Foco em organização visual, hierarquia tipográfica e usabilidade mobile.',
    ],
    highlightsEn: [
      'Built 100% in native Swift and SwiftUI without hybrid bridge overhead.',
      'Reactive state management and fluid navigation following Apple patterns.',
      'Focused on visual organization, typographic hierarchy, and mobile usability.',
    ],
    stack: [
      { name: 'Swift', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg' },
      { name: 'SwiftUI', icon: 'https://cdn.simpleicons.org/swift/F05138' },
      { name: 'iOS', icon: 'https://cdn.simpleicons.org/apple/ffffff' },
    ],
    video: '/clearpath.mp4',
    poster: '/clearpath-poster.jpg',
    liveUrl: null,
    repoUrl: 'https://github.com/GabrielVSL/ClearPath',
  },
];

const engineeringRepos = [
  {
    code: '05',
    title: 'RentCars',
    tagPt: 'TypeScript · Arquitetura',
    tagEn: 'TypeScript · Architecture',
    descPt: 'Sistema estruturado para locação e gestão de veículos com tipagem estática em TypeScript.',
    descEn: 'Structured vehicle rental management system built with static typing in TypeScript.',
    repoUrl: 'https://github.com/GabrielVSL/RentCars',
  },
  {
    code: '06',
    title: 'Educoins',
    tagPt: 'Eng. de Software · PUC Minas',
    tagEn: 'Software Eng. · PUC Minas',
    descPt: 'Plataforma de moeda estudantil e gamificação acadêmica para engajamento e recompensas.',
    descEn: 'Student currency and academic gamification platform for engagement and rewards.',
    repoUrl: 'https://github.com/GabrielVSL/Educoins',
  },
  {
    code: '07',
    title: 'Sincronização de Threads',
    tagPt: 'Go · Concorrência',
    tagEn: 'Go · Concurrency',
    descPt: 'Implementação prática de paralelismo, goroutines e sincronização de processos em Go.',
    descEn: 'Practical implementation of parallelism, goroutines, and process synchronization in Go.',
    repoUrl: 'https://github.com/GabrielVSL/SincronizacaoThreads',
  },
  {
    code: '08',
    title: 'GSA · Sistema Aeroportuário',
    tagPt: 'Java · POO',
    tagEn: 'Java · OOP',
    descPt: 'Gerenciador aeroportuário aplicando princípios sólidos de Orientação a Objetos em Java.',
    descEn: 'Airport management system applying solid Object-Oriented Programming principles in Java.',
    repoUrl: 'https://github.com/GabrielVSL/GSA-GerenciadorSistemaAeroportuario',
  },
];

export default function ProjectsSection() {
  const { lang } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  const activeProject = featuredProjects[activeIdx];

  // Reproduz apenas o vídeo único ativo quando a seção está visível (zero peso extra na página)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [activeIdx]);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative z-10 w-full py-20 md:py-28 px-4 sm:px-8 bg-transparent text-[#f8f9fc] border-t border-dashed border-white/[0.1] overflow-hidden"
    >
      <div className="max-w-[1280px] w-full mx-auto">
        {/* =================================================================
            CABEÇALHO CENTRALIZADO (Estilo da seção inferior da referência)
           ================================================================= */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          <span className="font-['JetBrains_Mono'] text-xs tracking-[0.14em] uppercase text-[#749bff] mb-3">
            {lang === 'pt' ? '02 / PROJETOS EM PRODUÇÃO' : '02 / PRODUCTION PROJECTS'}
          </span>

          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.1] text-[#f8f9fc]">
            {lang === 'pt'
              ? 'Explore como construo sistemas de ponta a ponta'
              : 'Explore how I build end-to-end systems'}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#b2bbc5] font-light leading-relaxed">
            {lang === 'pt'
              ? 'Selecione um projeto abaixo para inspecionar sua arquitetura, decisões técnicas, código-fonte e aplicação rodando ao vivo.'
              : 'Select a project below to inspect its architecture, technical decisions, source code, and live deployment.'}
          </p>

          <a
            href="https://github.com/GabrielVSL?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-lg border border-white/15 bg-white/[0.02] hover:bg-white/[0.06] text-xs text-[#d2d7e0] transition-colors"
          >
            <FiGithub className="text-[#749bff]" />
            <span>
              {lang === 'pt'
                ? 'Explorar todos os 18+ repositórios no GitHub ↗'
                : 'Explore all 18+ repositories on GitHub ↗'}
            </span>
          </a>
        </div>

        {/* =================================================================
            4 ABAS SELETORAS DE PROJETOS (Fiel aos 4 cards seletores azuis da print)
           ================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {featuredProjects.map((proj, idx) => {
            const Icon = proj.icon;
            const isSelected = activeIdx === idx;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`text-left p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                  isSelected
                    ? 'bg-[#132038] border-[#3b82f6] shadow-[0_0_25px_rgba(50,121,249,0.15)]'
                    : 'bg-[#11131a] border-white/[0.08] hover:bg-[#161922] hover:border-white/[0.16]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                      isSelected
                        ? 'bg-[#3b82f6]/20 text-[#60a5fa]'
                        : 'bg-white/[0.05] text-[#8a93a2]'
                    }`}
                  >
                    <Icon size={14} />
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#6a6d78]">
                    [{proj.index}]
                  </span>
                </div>

                <div>
                  <h3
                    className={`text-sm sm:text-base font-semibold tracking-tight ${
                      isSelected ? 'text-[#f8f9fc]' : 'text-[#d2d7e0]'
                    }`}
                  >
                    {proj.tabTitle}
                  </h3>
                  <p
                    className={`text-xs mt-0.5 font-light ${
                      isSelected ? 'text-[#93c5fd]' : 'text-[#8a93a2]'
                    }`}
                  >
                    {lang === 'pt' ? proj.tabSubPt : proj.tabSubEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* =================================================================
            PALCO PRINCIPAL EMOLDURADO POR LINHAS PONTILHADAS (1 Único Vídeo Ativo!)
           ================================================================= */}
        <div className="border border-dashed border-white/[0.14] bg-[#0d0e13]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* LADO ESQUERDO: JANELA DARK MACOS SOBRE GEOMETRIA COLORIDA (Como o card azul da print) */}
            <div className="lg:col-span-7 relative p-6 sm:p-10 lg:p-12 flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-dashed border-white/[0.14] min-h-[380px] sm:min-h-[460px]">
              {/* Geometria Azul/Colorida no Canto Superior Esquerdo (idêntica ao bloco azul da referência) */}
              <svg
                viewBox="0 0 600 500"
                className="pointer-events-none absolute top-0 left-0 w-[78%] h-[78%]"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon
                  points="0,0 520,0 380,380 0,440"
                  fill={activeProject.accentColor}
                />
                <g
                  stroke={activeProject.accentLine}
                  strokeWidth="2"
                  opacity="0.45"
                  fill="none"
                >
                  <line x1="0" y1="90" x2="490" y2="20" />
                  <line x1="60" y1="0" x2="290" y2="410" />
                  <line x1="240" y1="0" x2="40" y2="390" />
                  <line x1="0" y1="260" x2="420" y2="190" />
                </g>
              </svg>

              {/* Janela Dark Mode Estilo macOS / IDE (1 único vídeo MP4 acelerado por GPU) */}
              <div className="relative z-10 w-full rounded-xl bg-[#14161d] border border-white/[0.12] shadow-[0_24px_60px_rgba(0,0,0,0.75)] overflow-hidden">
                {/* Barra de Título da Janela */}
                <div className="h-9 px-4 bg-[#1a1d26] border-b border-white/[0.07] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="px-3 py-0.5 rounded bg-[#0e1015] border border-white/[0.06] font-['JetBrains_Mono'] text-[11px] text-[#8a93a2] truncate max-w-[220px] sm:max-w-xs">
                    {activeProject.urlDisplay}
                  </div>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#6a6d78]">
                    [{activeProject.index}]
                  </span>
                </div>

                {/* Vídeo Único em Execução Suave */}
                <div className="relative w-full aspect-video bg-[#090a0f]">
                  <video
                    ref={videoRef}
                    key={activeProject.video}
                    src={activeProject.video}
                    poster={activeProject.poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Fluxo de Arquitetura Rápido na Base da Janela (Estilo Grafo de Nós) */}
                <div className="px-4 py-3 bg-[#11131a] border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-2">
                  {activeProject.architectureNodes.map((node, i) => (
                    <React.Fragment key={node.role}>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: activeProject.accentLine }}
                        />
                        <span className="font-['JetBrains_Mono'] text-[10px] text-[#8a93a2]">
                          {node.role}:
                        </span>
                        <span className="font-['JetBrains_Mono'] text-[11px] text-[#f8f9fc] font-medium">
                          {node.value}
                        </span>
                      </div>
                      {i < activeProject.architectureNodes.length - 1 && (
                        <span className="text-white/20 font-['JetBrains_Mono'] text-xs hidden sm:inline">
                          ───
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* LADO DIREITO: ESPECIFICAÇÕES DE ENGENHARIA, STACK COM ÍCONES & LINKS */}
            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <span className="font-['JetBrains_Mono'] text-[11px] tracking-[0.12em] uppercase text-[#60a5fa] block mb-3">
                  {lang === 'pt' ? activeProject.badgePt : activeProject.badgeEn}
                </span>

                <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#f8f9fc] mb-4">
                  {activeProject.title}
                </h3>

                <p className="text-sm sm:text-[15px] text-[#b2bbc5] font-light leading-[1.7] mb-6">
                  {lang === 'pt'
                    ? activeProject.descriptionPt
                    : activeProject.descriptionEn}
                </p>

                {/* Decisões Técnicas / Destaques */}
                <div className="space-y-2.5 mb-8 pt-5 border-t border-dashed border-white/[0.12]">
                  <p className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-[#8a93a2] mb-2">
                    {lang === 'pt' ? 'Destaques de Engenharia' : 'Engineering Highlights'}
                  </p>
                  {(lang === 'pt'
                    ? activeProject.highlightsPt
                    : activeProject.highlightsEn
                  ).map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#d2d7e0] font-light leading-relaxed"
                    >
                      <span className="font-['JetBrains_Mono'] text-[#60a5fa] mt-0.5">
                        +
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Botões de Ação Diretos (Live Demo + GitHub) */}
                <div className="flex flex-wrap items-center gap-3">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f8f9fc] text-[#0d0e13] text-xs sm:text-sm font-medium hover:bg-[#e2e6ee] transition-colors"
                    >
                      <span>
                        {lang === 'pt' ? 'Testar Aplicação' : 'Launch Live App'}
                      </span>
                      <FiArrowUpRight className="text-sm" />
                    </a>
                  )}

                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/25 bg-white/[0.02] hover:bg-white/[0.08] text-xs sm:text-sm font-medium text-[#f8f9fc] transition-colors"
                  >
                    <FiGithub className="text-sm" />
                    <span>
                      {lang === 'pt' ? 'Código no GitHub' : 'View on GitHub'}
                    </span>
                    <FiArrowUpRight className="text-sm opacity-70" />
                  </a>
                </div>
              </div>

              {/* Badges de Tecnologias Usadas (Mesmo estilo visual da AboutSection) */}
              <div className="mt-10 pt-6 border-t border-dashed border-white/[0.12]">
                <p className="text-xs font-medium text-[#8a93a2] mb-3">
                  {lang === 'pt' ? 'Construído com' : 'Built with'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeProject.stack.map((tech) => (
                    <div
                      key={tech.name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#181a22] border border-white/[0.08] text-xs font-medium text-[#e4e7ee]"
                    >
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        loading="lazy"
                        decoding="async"
                        className="w-3.5 h-3.5 object-contain"
                      />
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================
              FAIXA INFERIOR DE 4 COLUNAS: OUTROS REPOSITÓRIOS DE ENGENHARIA
             ================================================================= */}
          <div className="border-t border-dashed border-white/[0.14] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {engineeringRepos.map((repo, idx) => (
              <a
                key={repo.code}
                href={repo.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-6 flex flex-col justify-between gap-4 hover:bg-white/[0.02] transition-colors ${
                  idx !== 0
                    ? 'border-t sm:border-t-0 sm:border-l border-dashed border-white/[0.14]'
                    : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[11px] text-[#60a5fa] mb-2">
                    <span>{lang === 'pt' ? repo.tagPt : repo.tagEn}</span>
                    <span className="text-[#6a6d78]">[{repo.code}]</span>
                  </div>

                  <h4 className="text-base font-semibold text-[#f8f9fc] group-hover:text-[#60a5fa] transition-colors flex items-center justify-between">
                    <span>{repo.title}</span>
                    <FiExternalLink className="text-xs opacity-50 group-hover:opacity-100 transition-opacity" />
                  </h4>

                  <p className="mt-1.5 text-xs text-[#8a93a2] font-light leading-relaxed">
                    {lang === 'pt' ? repo.descPt : repo.descEn}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 font-['JetBrains_Mono'] text-[11px] text-[#b2bbc5] group-hover:text-white transition-colors pt-2">
                  <FiLayers className="text-xs text-[#60a5fa]" />
                  <span>{lang === 'pt' ? 'Abrir repositório ↗' : 'Open repository ↗'}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
