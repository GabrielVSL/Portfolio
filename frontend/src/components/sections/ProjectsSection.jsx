import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGithub,
  FiExternalLink,
  FiArrowUpRight,
} from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const featuredProjects = [
  {
    id: 'apex',
    index: '01',
    iconImg: '/icons/apex.png',
    tabTitle: 'ApexExperience',
    tabSubPt: 'Em Produção · Java & React',
    tabSubEn: 'In Production · Java & React',
    badgePt: 'PRODUÇÃO · JAVA 21, MICRONAUT & JWT',
    badgeEn: 'PRODUCTION · JAVA 21, MICRONAUT & JWT',
    title: 'Apex Track Experience',
    urlDisplay: 'apex-experience.vercel.app',
    accentColor: '#dc2626',
    accentLine: '#f87171',
    descriptionPt:
      'Plataforma full-stack para reserva de supercarros em 8 circuitos oficiais FIA, implantada em produção. Backend em Java 21 e Micronaut com arquitetura em Facades, autenticação JWT stateless (RBAC), carteira digital integrada (ApexPay), E-Pass QR assinado com HMAC-SHA256, controle otimista de vagas (@Version) e mensageria transacional via Resend API.',
    descriptionEn:
      'Full-stack platform for booking supercars across 8 official FIA circuits, deployed in production. Built with a Java 21 & Micronaut backend using Facade architecture, stateless JWT authentication (RBAC), integrated digital wallet (ApexPay), HMAC-SHA256 signed E-Pass QR, optimistic concurrency control (@Version), and transactional messaging via Resend API.',
    architectureNodes: [
      { role: 'UI', value: 'React 19 + TS' },
      { role: 'API', value: 'Java 21 + Micronaut' },
      { role: 'Auth', value: 'JWT + HMAC QR' },
    ],
    highlightsPt: [
      'Autenticação JWT stateless com RBAC (Piloto / Diretor de Prova), E-Pass QR assinado com HMAC-SHA256 e mensageria OTP/e-mail via Resend API.',
      'Prevenção de overbooking com controle otimista (@Version) por circuito e turno, fila assíncrona (@Scheduled) e carteira digital ApexPay.',
      'Frontend em React 19, TypeScript, Zustand, Leaflet e Recharts com suítes automatizadas em JUnit 5, Mockito e Vitest.',
    ],
    highlightsEn: [
      'Stateless JWT auth with RBAC (Pilot / Race Director), HMAC-SHA256 signed E-Pass QR check-in, and transactional OTP/email messaging via Resend API.',
      'Overbooking prevention using optimistic locking (@Version) per circuit/slot, scheduled async queues, and ApexPay digital wallet.',
      'React 19, TypeScript, Zustand, Leaflet, and Recharts frontend backed by automated JUnit 5, Mockito, and Vitest suites.',
    ],
    stack: [
      { name: 'Java 21', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: 'Hibernate JPA', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hibernate/hibernate-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    ],
    video: null,
    image: '/apex-preview.jpg',
    poster: '/apex-preview.jpg',
    liveUrl: 'https://apex-experience.vercel.app/',
    repoUrl: 'https://github.com/GabrielVSL/ApexExperience',
  },
  {
    id: 'lumiere',
    index: '02',
    iconImg: '/icons/lumiere.png',
    tabTitle: 'Lumière',
    tabSubPt: 'Streaming · FastAPI & React',
    tabSubEn: 'Streaming · FastAPI & React',
    badgePt: 'PRODUÇÃO · STREAMING, ETL & PYTHON ASYNC',
    badgeEn: 'PRODUCTION · STREAMING, ETL & PYTHON ASYNC',
    title: 'Lumière — Cinema Clássico',
    urlDisplay: 'olumiere.vercel.app',
    accentColor: '#d97706',
    accentLine: '#fbbf24',
    descriptionPt:
      'Plataforma editorial de streaming dedicada à preservação de mais de 600 obras clássicas em domínio público (1895–1955). Combina FastAPI assíncrono e SQLAlchemy 2.0 Async com pipeline ETL multi-fonte (Wikidata SPARQL, Internet Archive e TMDB), motor determinístico de auditoria autoral (LicenseEngine) e player HTML5 nativo com HTTP 206 Range Requests e legendas WebVTT.',
    descriptionEn:
      'Editorial streaming platform preserving 600+ classic public-domain films (1895–1955). Combines asynchronous FastAPI and SQLAlchemy 2.0 Async with a multi-source ETL pipeline (Wikidata SPARQL, Internet Archive & TMDB), deterministic copyright jurisdiction engine (LicenseEngine), and native HTML5 player with HTTP 206 Range Requests and custom WebVTT subtitles.',
    architectureNodes: [
      { role: 'UI', value: 'React 19 + GSAP' },
      { role: 'API', value: 'FastAPI Async' },
      { role: 'Motor', value: 'ETL + LicenseEngine' },
    ],
    highlightsPt: [
      'Motor determinístico de direitos autorais (LicenseEngine) validando regras do Brasil (Lei 9.610/98), EUA e União Europeia em tempo real.',
      'Streaming nativo sem anúncios via HTTP 206 Partial Content, troca dinâmica de resolução, proxy de legendas WebVTT e proteções OWASP/SSRF.',
      'Pipeline ETL assíncrono integrando Wikidata SPARQL, Internet Archive e TMDB, com camada de contingência offline-first no frontend e testes Pytest.',
    ],
    highlightsEn: [
      'Deterministic copyright audit engine (LicenseEngine) evaluating Brazilian (Law 9.610/98), US, and EU public-domain rules in real time.',
      'Ad-free native streaming via HTTP 206 Partial Content, dynamic resolution switching, WebVTT subtitle proxy, and OWASP/SSRF guards.',
      'Asynchronous ETL pipeline integrating Wikidata SPARQL, Internet Archive & TMDB, backed by offline-first frontend fallback and Pytest.',
    ],
    stack: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
      { name: 'SQLAlchemy', icon: 'https://cdn.simpleicons.org/sqlalchemy/ffffff' },
      { name: 'GSAP', icon: 'https://cdn.simpleicons.org/greensock/88CE02' },
    ],
    video: null,
    image: '/lumiere-preview.jpg',
    poster: '/lumiere-preview.jpg',
    liveUrl: 'https://olumiere.vercel.app',
    repoUrl: 'https://github.com/GabrielVSL/Lumiere',
  },
  {
    id: 'patties',
    index: '03',
    iconImg: '/icons/patties.png',
    tabTitle: 'Patties Burger',
    tabSubPt: 'Em Produção · Node & React',
    tabSubEn: 'In Production · Node & React',
    badgePt: 'PRODUÇÃO · D2C, JWT & FOOD TRACKER',
    badgeEn: 'PRODUCTION · D2C, JWT & FOOD TRACKER',
    title: 'Patties Burger Direct (Orderly)',
    urlDisplay: 'burger-patties.vercel.app',
    accentColor: '#b91c1c',
    accentLine: '#f59e0b',
    descriptionPt:
      'Plataforma digital Direct-to-Consumer completa para pedidos de smash burgers, implantada em produção (Vercel, Render e Neon Postgres). Conta com autenticação JWT (bcryptjs), isolamento de sessão multiusuário (x-session-id), checkout atômico com transações ACID e Snapshot Pattern, mensageria via Resend API, proteção Helmet/Rate Limit e Food Tracker ao vivo com mapa Leaflet.',
    descriptionEn:
      'Full Direct-to-Consumer smash burger ordering platform deployed in production (Vercel, Render & Neon Postgres). Features JWT authentication (bcryptjs), multi-user session isolation (x-session-id), atomic ACID transactional checkout with Snapshot Pattern, Resend API messaging, Helmet/Rate Limit security, and a live Leaflet Food Tracker.',
    architectureNodes: [
      { role: 'UI', value: 'React + Leaflet' },
      { role: 'Auth', value: 'JWT + Helmet' },
      { role: 'Dados', value: 'ACID + PostgreSQL' },
    ],
    highlightsPt: [
      'Segurança ponta a ponta: autenticação JWT com bcryptjs, Helmet, Express Rate Limit e isolamento de sessão via header x-session-id.',
      'Checkout atômico ACID com Snapshot Pattern via Sequelize, motor de cupons server-side e mensageria transacional via Resend (cadastro e reset).',
      'Food Tracker interativo em tempo real com mapa de rotas (Leaflet), stepper de 5 etapas e suíte de testes automatizados (Jest + Supertest).',
    ],
    highlightsEn: [
      'End-to-end security: JWT auth with bcryptjs, Helmet, Express Rate Limit, and session isolation via x-session-id interceptor.',
      'Atomic ACID checkout with Snapshot Pattern via Sequelize, server-side coupon validation, and transactional emails via Resend.',
      'Interactive real-time Food Tracker with Leaflet route mapping, 5-stage order stepper, and automated Jest + Supertest suites.',
    ],
    stack: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.simpleicons.org/express/ffffff' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: 'Sequelize', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sequelize/sequelize-original.svg' },
      { name: 'Resend', icon: 'https://cdn.simpleicons.org/resend/ffffff' },
    ],
    video: '/orderly.mp4',
    poster: '/orderly-poster.jpg',
    image: '/orderly-poster.jpg',
    liveUrl: 'https://burger-patties.vercel.app/',
    repoUrl: 'https://github.com/GabrielVSL/PettiesBurger',
  },
  {
    id: 'itau-bootcamp',
    index: '04',
    iconImg: '/icons/itau.png',
    tabTitle: 'ItauBootcamp',
    tabSubPt: 'BFF Next.js · Java 21 & IA',
    tabSubEn: 'Next.js BFF · Java 21 & AI',
    badgePt: 'PRODUÇÃO · BFF + 2 MICROSSERVIÇOS JAVA & IA',
    badgeEn: 'PRODUCTION · BFF + 2 JAVA & AI MICROSERVICES',
    title: 'ItauBootcamp — Portal Unificado Java & IA',
    urlDisplay: 'itau-bootcamp.vercel.app',
    accentColor: '#ea580c',
    accentLine: '#fb923c',
    descriptionPt:
      'Super-App financeiro em Next.js 15 + TypeScript que atua como camada BFF orquestrando dois microsserviços Java 21 / Spring Boot 3 independentes em produção: CheckoutService (Design Patterns GoF) e Finance-AI-Service (Consultor IA multimodal com Spring AI, Groq/Gemini e voz Whisper STT), isolados em bancos separados no Neon PostgreSQL.',
    descriptionEn:
      'Financial Super-App in Next.js 15 + TypeScript acting as a BFF layer orchestrating two independent Java 21 / Spring Boot 3 microservices in production: CheckoutService (GoF Design Patterns) and Finance-AI-Service (Multimodal AI Financial Advisor with Spring AI, Groq/Gemini, and Whisper STT voice), backed by isolated Neon PostgreSQL databases.',
    architectureNodes: [
      { role: 'Portal BFF', value: 'Next.js 15 + TS' },
      { role: 'Serviços', value: 'Java 21 · Spring & AI' },
      { role: 'Dados', value: '2 DBs Neon Postgres' },
    ],
    highlightsPt: [
      'Orquestração cross-service no BFF com tratamento de falha parcial, anti-IDOR via cookie HttpOnly (X-Session-Id) e recálculo server-side de preços.',
      'Consultor IA multimodal (texto, voz Whisper STT e @Tool Calling real no SQL) com roteador Groq LPU + fallback automático para Google Gemini.',
      'Arquitetura distribuída em 3 repositórios com GoF (Facade, Strategy O(1), Chain of Responsibility) e 57 testes automatizados nos microsserviços.',
    ],
    highlightsEn: [
      'Cross-service BFF orchestration with partial-failure handling, HttpOnly session anti-IDOR (X-Session-Id), and server-side price recalculation.',
      'Multimodal AI advisor (text, Whisper STT voice & real SQL @Tool Calling) with Groq LPU router + automatic Google Gemini fallback.',
      'Distributed 3-repository architecture with GoF (Facade, O(1) Strategy, Chain of Responsibility) and 57 automated microservice tests.',
    ],
    stack: [
      { name: 'Next.js 15', icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
      { name: 'Java 21', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'Spring AI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
      { name: 'Groq', icon: '/icons/groq.svg' },
      { name: 'Gemini', icon: 'https://cdn.simpleicons.org/googlegemini/8E75B2' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    ],
    video: null,
    slides: [
      {
        src: '/itau-hero.png',
        labelPt: 'Portal BFF',
        labelEn: 'Portal BFF',
        url: 'itau-bootcamp.vercel.app',
      },
      {
        src: '/itau-shop.png',
        labelPt: 'CheckoutService',
        labelEn: 'CheckoutService',
        url: 'itau-bootcamp.vercel.app/shop',
      },
      {
        src: '/itau-budget.png',
        labelPt: 'Finance-AI',
        labelEn: 'Finance-AI',
        url: 'itau-bootcamp.vercel.app/budget',
      },
    ],
    liveUrl: 'https://itau-bootcamp.vercel.app',
    repoUrl: 'https://github.com/GabrielVSL/ItauBootcamp',
    repoLabelPt: 'Portal BFF',
    repoLabelEn: 'Portal BFF',
    extraRepos: [
      {
        name: 'CheckoutService',
        url: 'https://github.com/GabrielVSL/CheckoutService',
      },
      {
        name: 'Finance-AI-Service',
        url: 'https://github.com/GabrielVSL/Finance-AI-Service',
      },
    ],
  },
];

const engineeringRepos = [
  {
    code: '05',
    title: 'Portal CSPC',
    iconImg: '/icons/cspc.png',
    tagPt: 'Em Produção · -30% Chamados',
    tagEn: 'In Production · -30% Tickets',
    descPt:
      'Plataforma educacional implantada nos laboratórios do Colégio São Paulo da Cruz com motor JSON dinâmico sem alterar código.',
    descEn:
      'Educational platform deployed across Colégio São Paulo da Cruz labs powered by a dynamic JSON engine.',
    repoUrl: 'https://github.com/GabrielVSL/InformaticaCSPC',
  },
  {
    code: '06',
    title: 'GSA · Sistema Aeroportuário',
    iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    tagPt: 'C++ · AED & POO',
    tagEn: 'C++ · DSA & OOP',
    descPt:
      'Sistema em C++ para gestão de voos, tripulação e reservas da companhia Voo Seguro com foco em estruturas de dados.',
    descEn:
      'C++ management system for flights, crew, and reservations engineered with core data structures and OOP.',
    repoUrl: 'https://github.com/GabrielVSL/GSA-GerenciadorSistemaAeroportuario',
  },
  {
    code: '07',
    title: 'ClearPath',
    iconImg: '/icons/clearpath.png',
    tagPt: 'Swift · Mobile Nativo iOS',
    tagEn: 'Swift · Native iOS',
    descPt:
      'Aplicação mobile nativa para iOS em Swift e SwiftUI com arquitetura declarativa e aderência às Apple HIG.',
    descEn:
      'Native iOS mobile app built with Swift and SwiftUI featuring declarative architecture and Apple HIG compliance.',
    repoUrl: 'https://github.com/GabrielVSL/ClearPath',
  },
  {
    code: '08',
    title: 'Sincronização de Threads',
    iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg',
    tagPt: 'Go · Concorrência',
    tagEn: 'Go · Concurrency',
    descPt:
      'Implementação prática de paralelismo, goroutines e sincronização de processos em Go.',
    descEn:
      'Practical implementation of parallelism, goroutines, and process synchronization in Go.',
    repoUrl: 'https://github.com/GabrielVSL/SincronizacaoThreads',
  },
];

export default function ProjectsSection() {
  const { lang } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringMedia, setIsHoveringMedia] = useState(false);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  const activeProject = featuredProjects[activeIdx];
  const hasSlides = Array.isArray(activeProject.slides) && activeProject.slides.length > 0;
  const currentSlide = hasSlides
    ? activeProject.slides[activeSlideIdx % activeProject.slides.length]
    : null;

  // Reseta o slide ao trocar de projeto
  useEffect(() => {
    setActiveSlideIdx(0);
  }, [activeIdx]);

  // Observa visibilidade da seção para pausar vídeo ou autoplay de slides fora da tela
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Reproduz apenas o vídeo único ativo quando a seção está visível (zero peso extra na página)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeProject.video) return;

    video.load();
    if (isVisible) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [activeIdx, activeProject.video, isVisible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeProject.video) return;

    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible, activeProject.video]);

  // Alterna suavemente entre as telas reais do projeto multi-serviço quando visível
  useEffect(() => {
    if (!hasSlides || !isVisible || isHoveringMedia) return;

    const timer = setInterval(() => {
      setActiveSlideIdx((prev) => (prev + 1) % activeProject.slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [hasSlides, isVisible, isHoveringMedia, activeProject.slides]);

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
                ? 'Explorar todos os 20+ repositórios no GitHub ↗'
                : 'Explore all 20+ repositories on GitHub ↗'}
            </span>
          </a>
        </div>

        {/* =================================================================
            4 ABAS SELETORAS DE PROJETOS (Ícones oficiais de cada site)
           ================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {featuredProjects.map((proj, idx) => {
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
                    className={`w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden p-1 transition-all ${
                      isSelected
                        ? 'bg-white/[0.1] ring-1 ring-white/20'
                        : 'bg-white/[0.05] ring-1 ring-white/[0.08]'
                    }`}
                  >
                    <img
                      src={proj.iconImg}
                      alt={`${proj.tabTitle} icon`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain rounded-[4px]"
                    />
                  </span>
                  <div className="flex items-center gap-1.5">
                    {proj.extraRepos && (
                      <span className="hidden sm:inline-block font-['JetBrains_Mono'] text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-[#fb923c] border border-[#fb923c]/25">
                        3 repos
                      </span>
                    )}
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#6a6d78]">
                      [{proj.index}]
                    </span>
                  </div>
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
            PALCO PRINCIPAL EMOLDURADO POR LINHAS PONTILHADAS
           ================================================================= */}
        <div className="border border-dashed border-white/[0.14] bg-[#0d0e13]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* LADO ESQUERDO: JANELA DARK MACOS SOBRE GEOMETRIA COLORIDA */}
            <div className="lg:col-span-7 relative p-6 sm:p-10 lg:p-12 flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-dashed border-white/[0.14] min-h-[380px] sm:min-h-[460px]">
              {/* Geometria Colorida no Canto Superior Esquerdo */}
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

              {/* Janela Dark Mode Estilo macOS / IDE */}
              <div
                onMouseEnter={() => setIsHoveringMedia(true)}
                onMouseLeave={() => setIsHoveringMedia(false)}
                className="relative z-10 w-full rounded-xl bg-[#14161d] border border-white/[0.12] shadow-[0_24px_60px_rgba(0,0,0,0.75)] overflow-hidden"
              >
                {/* Barra de Título da Janela */}
                <div className="h-9 px-4 bg-[#1a1d26] border-b border-white/[0.07] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="px-3 py-0.5 rounded bg-[#0e1015] border border-white/[0.06] font-['JetBrains_Mono'] text-[11px] text-[#8a93a2] truncate max-w-[220px] sm:max-w-xs flex items-center gap-1.5">
                    <img
                      src={activeProject.iconImg}
                      alt=""
                      className="w-3.5 h-3.5 object-contain rounded-[2px] shrink-0"
                    />
                    <span className="truncate">
                      {currentSlide ? currentSlide.url : activeProject.urlDisplay}
                    </span>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#6a6d78] shrink-0">
                    [{activeProject.index}]
                  </span>
                </div>

                {/* Preview: Vídeo MP4, Slideshow Animado ou Print em Alta Resolução */}
                <div className="relative w-full aspect-video bg-[#090a0f] overflow-hidden">
                  {hasSlides ? (
                    <AnimatePresence mode="sync" initial={false}>
                      <motion.img
                        key={currentSlide.src}
                        src={currentSlide.src}
                        alt={lang === 'pt' ? currentSlide.labelPt : currentSlide.labelEn}
                        loading="eager"
                        decoding="async"
                        initial={{ opacity: 0, scale: 1.035 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.99 }}
                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                    </AnimatePresence>
                  ) : activeProject.video ? (
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
                  ) : (
                    <img
                      key={activeProject.image}
                      src={activeProject.image}
                      alt={activeProject.title}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  )}
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
                <div className="flex items-center gap-2.5 mb-3">
                  <img
                    src={activeProject.iconImg}
                    alt={`${activeProject.tabTitle} logo`}
                    className="w-5 h-5 object-contain rounded-[4px]"
                  />
                  <span
                    className="font-['JetBrains_Mono'] text-[11px] tracking-[0.12em] uppercase"
                    style={{ color: activeProject.accentLine }}
                  >
                    {lang === 'pt' ? activeProject.badgePt : activeProject.badgeEn}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#f8f9fc] mb-4">
                  {activeProject.title}
                </h3>

                <p className="text-sm sm:text-[15px] text-[#b2bbc5] font-light leading-[1.7] mb-6">
                  {lang === 'pt'
                    ? activeProject.descriptionPt
                    : activeProject.descriptionEn}
                </p>

                {/* Decisões Técnicas / Destaques */}
                <div className="space-y-2.5 mb-7 pt-5 border-t border-dashed border-white/[0.12]">
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
                      <span
                        className="font-['JetBrains_Mono'] mt-0.5"
                        style={{ color: activeProject.accentLine }}
                      >
                        +
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Botões de Ação Diretos (Live Demo + GitHub principal + microsserviços abaixo quando houver) */}
                <div className="flex flex-col gap-2.5">
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
                        {activeProject.repoLabelPt
                          ? lang === 'pt'
                            ? activeProject.repoLabelPt
                            : activeProject.repoLabelEn
                          : lang === 'pt'
                            ? 'Código no GitHub'
                            : 'View on GitHub'}
                      </span>
                      <FiArrowUpRight className="text-sm opacity-70" />
                    </a>
                  </div>

                  {activeProject.extraRepos && (
                    <div className="flex flex-wrap items-center gap-3">
                      {activeProject.extraRepos.map((repo) => (
                        <a
                          key={repo.name}
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/25 bg-white/[0.02] hover:bg-white/[0.08] text-xs sm:text-sm font-medium text-[#f8f9fc] transition-colors"
                        >
                          <FiGithub className="text-sm" />
                          <span>{repo.name}</span>
                          <FiArrowUpRight className="text-sm opacity-70" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Badges de Tecnologias Usadas (Mesmo estilo visual da AboutSection) */}
              <div className="mt-8 pt-6 border-t border-dashed border-white/[0.12]">
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

                  <h4 className="text-base font-semibold text-[#f8f9fc] group-hover:text-[#60a5fa] transition-colors flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 min-w-0">
                      <img
                        src={repo.iconImg}
                        alt={`${repo.title} icon`}
                        loading="lazy"
                        decoding="async"
                        className="w-4 h-4 object-contain rounded-[3px] shrink-0"
                      />
                      <span className="truncate">{repo.title}</span>
                    </span>
                    <FiExternalLink className="text-xs opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />
                  </h4>

                  <p className="mt-1.5 text-xs text-[#8a93a2] font-light leading-relaxed">
                    {lang === 'pt' ? repo.descPt : repo.descEn}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 font-['JetBrains_Mono'] text-[11px] text-[#b2bbc5] group-hover:text-white transition-colors pt-2">
                  <FiGithub className="text-xs text-[#60a5fa]" />
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
