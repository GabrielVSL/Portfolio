import React, { useState } from 'react';
import {
  FiArrowUpRight,
  FiChevronDown,
  FiGitCommit,
  FiList,
  FiTool,
  FiBookOpen,
  FiActivity,
} from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const coreStackBadges = [
  {
    name: 'React & TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  },
  {
    name: 'Node.js & Express',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'Java & Spring Boot',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  },
  {
    name: 'PostgreSQL & ORM',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  },
  {
    name: 'C# & .NET',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
  },
  {
    name: 'Swift & SwiftUI',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg',
  },
  {
    name: 'Docker & Linux',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  },
  {
    name: 'Git & GitHub',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  },
];

const traceSteps = [
  {
    icon: FiGitCommit,
    titlePt: 'Analisando formação acadêmica...',
    titleEn: 'Analyzing academic background...',
    descPt:
      'Bacharelado em Engenharia de Software na PUC Minas (Previsão Jun/2028) e ex-Monitor de Desenvolvimento de Interfaces Web.',
    descEn:
      'B.S. in Software Engineering at PUC Minas (Expected Jun/2028) and former Web Interface Development Teaching Assistant.',
  },
  {
    icon: FiList,
    titlePt: 'Verificando atuação profissional atual...',
    titleEn: 'Checking current professional role...',
    descPt:
      'Analista de Sistemas no Colégio São Paulo da Cruz — responsável por aplicações internas, servidores Windows/Linux e políticas de Firewall.',
    descEn:
      'Systems Analyst at Colégio São Paulo da Cruz — responsible for internal applications, Windows/Linux servers, and Firewall policies.',
  },
  {
    icon: FiTool,
    titlePt: 'Inspecionando arquitetura Full Stack...',
    titleEn: 'Inspecting Full Stack architecture...',
    descPt:
      'Domínio do ciclo completo: modelagem relacional (PostgreSQL), APIs REST e BFF Serverless (Node.js, Java, C#) e UI em React e SwiftUI.',
    descEn:
      'Full lifecycle ownership: relational modeling (PostgreSQL), REST APIs & Serverless BFF (Node.js, Java, C#), and UI in React & SwiftUI.',
  },
  {
    icon: FiBookOpen,
    titlePt: 'Medindo impacto real em produção...',
    titleEn: 'Measuring real production impact...',
    descPt:
      'Desenvolvimento do Portal Educacional CSPC e automações corporativas (Make, Node-RED e scripts), reduzindo chamados técnicos em 30%.',
    descEn:
      'Built the CSPC Educational Portal and corporate automations (Make, Node-RED, scripts), reducing support tickets by 30%.',
  },
  {
    icon: FiActivity,
    titlePt: 'Validando idiomas e comunicação...',
    titleEn: 'Validating languages & communication...',
    descPt:
      'Inglês Avançado, experiência prática em mentoria de código e foco na resolução de problemas reais de negócio.',
    descEn:
      'Advanced English, hands-on code mentorship experience, and strong focus on solving real business problems.',
  },
];

export default function AboutSection() {
  const { lang } = useLanguage();
  const [stepsExpanded, setStepsExpanded] = useState(true);

  return (
    <section
      id="studio"
      className="relative z-10 w-full py-20 md:py-28 px-4 sm:px-8 bg-transparent text-[#f8f9fc] flex items-center justify-center overflow-hidden"
    >
      {/* Container emoldurado por linhas pontilhadas arquitetônicas (idêntico à referência enviada) */}
      <div className="relative max-w-[1280px] w-full mx-auto border border-dashed border-white/[0.14] bg-[#0d0e13]">
        {/* Extensões sutis da grade pontilhada nos cantos (efeito blueprint da print) */}
        <div
          aria-hidden="true"
          className="hidden lg:block pointer-events-none absolute -top-8 left-0 right-0 h-8 border-x border-dashed border-white/[0.08]"
        />
        <div
          aria-hidden="true"
          className="hidden lg:block pointer-events-none absolute -bottom-8 left-0 right-0 h-8 border-x border-dashed border-white/[0.08]"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* =================================================================
              COLUNA ESQUERDA: PITCH DIRETO + CTA + BADGES COM ÍCONES
             ================================================================= */}
          <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-dashed border-white/[0.14]">
            <div>
              <span className="font-['JetBrains_Mono'] text-xs tracking-[0.14em] uppercase text-[#9ba3b0] block mb-4">
                {lang === 'pt' ? '01 / PERFIL DE ENGENHARIA' : '01 / ENGINEERING PROFILE'}
              </span>

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.15] text-[#f8f9fc] mb-6">
                {lang === 'pt'
                  ? 'Da infraestrutura e API até a experiência na tela'
                  : 'From infrastructure and API to the screen experience'}
              </h2>

              <p className="text-[15px] sm:text-base text-[#b2bbc5] font-light leading-[1.7] mb-8">
                {lang === 'pt'
                  ? 'Estudante de Engenharia de Software na PUC Minas e Analista de Sistemas no Colégio São Paulo da Cruz. Gosto do processo inteiro: modelar o banco de dados, construir a API, desenhar a interface e automatizar fluxos reais para que equipes inteiras ganhem tempo.'
                  : 'Software Engineering student at PUC Minas and Systems Analyst at Colégio São Paulo da Cruz. I enjoy the entire process: modeling the database, building the API, crafting the interface, and automating real workflows so entire teams save time.'}
              </p>

              <a
                href="https://www.linkedin.com/in/gabrielvictorsouza/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-white/25 bg-white/[0.02] hover:bg-white/[0.08] text-xs sm:text-sm font-medium text-[#f8f9fc] transition-colors"
              >
                <span>
                  {lang === 'pt' ? 'Conectar no LinkedIn' : 'Connect on LinkedIn'}
                </span>
                <FiArrowUpRight className="text-sm" />
              </a>
            </div>

            {/* Bloco inferior de compatibilidade / stack (idêntico ao "Compatível com" da print) */}
            <div className="mt-12 pt-8">
              <p className="text-xs font-medium text-[#d2d7e0] mb-3.5">
                {lang === 'pt'
                  ? 'Experiência prática com'
                  : 'Hands-on experience with'}
              </p>

              <div className="flex flex-wrap gap-2">
                {coreStackBadges.map((item) => (
                  <div
                    key={item.name}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#181a22] border border-white/[0.08] text-xs font-medium text-[#e4e7ee]"
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="w-3.5 h-3.5 object-contain"
                    />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>

              <p className="mt-3.5 text-xs text-[#8a93a2] font-light">
                {lang === 'pt'
                  ? 'além de automações corporativas (Make, Node-RED) e gestão de servidores'
                  : 'plus corporate workflow automation (Make, Node-RED) and server administration'}
              </p>
            </div>
          </div>

          {/* =================================================================
              COLUNA DIREITA: FORMA ORGÂNICA ROXA + JANELA MACBOOK
             ================================================================= */}
          <div className="lg:col-span-7 relative p-6 sm:p-10 lg:p-12 flex items-end justify-center overflow-hidden min-h-[540px]">
            {/* Forma Geométrica Orgânica Roxa ao fundo com linhas curvas internas (como na print) */}
            <svg
              viewBox="0 0 800 700"
              className="pointer-events-none absolute inset-0 w-full h-full object-cover"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Fita orgânica roxa diagonal */}
              <path
                d="M 420 -40 C 560 -40, 740 -20, 780 0 C 750 220, 620 420, 420 500 C 220 580, 60 550, -30 520 L -30 310 C 120 340, 260 280, 340 160 C 390 80, 405 10, 420 -40 Z"
                fill="#8b3dff"
              />
              {/* Linhas internas lavanda estilo topografia/órbitas da print */}
              <g fill="none" stroke="#a86bff" strokeWidth="5" opacity="0.65">
                <ellipse cx="470" cy="180" rx="220" ry="120" transform="rotate(-28 470 180)" />
                <ellipse cx="380" cy="260" rx="260" ry="140" transform="rotate(-18 380 260)" />
                <ellipse cx="220" cy="390" rx="190" ry="110" transform="rotate(15 220 390)" />
                <path d="M 520 -20 C 500 120, 610 220, 760 180" />
                <path d="M 80 510 C 140 390, 290 360, 430 460" />
              </g>
            </svg>

            {/* JANELA ESTILO MACBOOK / DESKTOP (Fiel à referência enviada) */}
            <div className="relative z-10 w-full max-w-[620px] rounded-t-2xl rounded-b-xl bg-[#f3f4f6] text-[#1f2328] shadow-[0_24px_60px_rgba(0,0,0,0.65)] border border-white/40 p-5 sm:p-7">
              {/* Traffic Lights (Botões do MacBook) */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#6e7781]">
                  gabriel-lopes — profile-context
                </span>
              </div>

              {/* Barra de Prompt Cinza Arredondada no Topo da Janela */}
              <div className="w-full rounded-xl bg-[#e3e5e8] px-4 py-3 text-xs sm:text-[13px] font-medium text-[#24292f] mb-6">
                {lang === 'pt'
                  ? 'Resuma a experiência prática, arquitetura e entregas em produção de Gabriel Lopes'
                  : "Summarize Gabriel Lopes's hands-on experience, architecture, and production impact"}
              </div>

              {/* Cabeçalho "Steps 5/5" */}
              <button
                type="button"
                onClick={() => setStepsExpanded(!stepsExpanded)}
                className="flex items-center gap-1.5 text-xs font-medium text-[#57606a] hover:text-[#24292f] mb-4 cursor-pointer"
              >
                <span>{lang === 'pt' ? 'Etapas 5/5' : 'Steps 5/5'}</span>
                <FiChevronDown
                  className={`transition-transform duration-200 ${
                    stepsExpanded ? 'rotate-0' : '-rotate-90'
                  }`}
                />
              </button>

              {/* Lista de Etapas de Inspeção com Linha Conectora Vertical */}
              {stepsExpanded && (
                <div className="space-y-3.5 mb-6">
                  {traceSteps.map((step, idx) => {
                    const Icon = step.icon;
                    const isLast = idx === traceSteps.length - 1;
                    return (
                      <div key={idx} className="relative flex items-start gap-3">
                        {/* Linha vertical entre ícones */}
                        {!isLast && (
                          <span
                            aria-hidden="true"
                            className="absolute left-[7px] top-5 -bottom-3.5 w-[1px] bg-[#d0d7de]"
                          />
                        )}
                        <div className="mt-0.5 text-[#57606a] shrink-0">
                          <Icon size={15} />
                        </div>
                        <div className="text-[11px] sm:text-xs leading-snug">
                          <p className="font-semibold text-[#424a53]">
                            {lang === 'pt' ? step.titlePt : step.titleEn}
                          </p>
                          <p className="text-[#6e7781] mt-0.5">
                            {lang === 'pt' ? step.descPt : step.descEn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Resumo Executivo Final na Base da Janela (igual à referência) */}
              <div className="pt-4 border-t border-[#d8dee4] text-xs sm:text-[13px] text-[#24292f] space-y-3">
                <p className="leading-relaxed">
                  {lang === 'pt'
                    ? 'Aqui está o resumo executivo do perfil técnico de Gabriel Victor Souza Lopes com base em seus projetos e atuação profissional:'
                    : 'Here is the executive summary of Gabriel Victor Souza Lopes based on his production projects and professional track record:'}
                </p>

                <div>
                  <h4 className="font-semibold text-[#1f2328] mb-1">
                    {lang === 'pt'
                      ? 'Impacto em Produção & Automação'
                      : 'Production Impact & Automation'}
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-[#424a53] text-[11px] sm:text-xs">
                    <li>
                      {lang === 'pt'
                        ? 'Redução de 30% no volume de chamados técnicos após lançar o Portal Educacional CSPC e automações internas.'
                        : '30% reduction in technical support tickets after launching the CSPC Educational Portal and internal automations.'}
                    </li>
                    <li>
                      {lang === 'pt'
                        ? 'Administração ativa de servidores Windows/Linux, redes e Firewall aliada ao desenvolvimento Full Stack.'
                        : 'Active administration of Windows/Linux servers, networks, and Firewalls paired with Full Stack development.'}
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1f2328] mb-1">
                    {lang === 'pt'
                      ? 'Arquitetura & Qualidade de Código'
                      : 'Architecture & Code Quality'}
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-[#424a53] text-[11px] sm:text-xs">
                    <li>
                      {lang === 'pt'
                        ? 'Projetos estruturados com APIs RESTful (Node.js/Express, Java, C#), BFF Serverless, PostgreSQL e interfaces em React e SwiftUI.'
                        : 'Projects architected with RESTful APIs (Node.js/Express, Java, C#), Serverless BFF, PostgreSQL, and UIs in React & SwiftUI.'}
                    </li>
                    <li>
                      {lang === 'pt'
                        ? 'Disponível para atuar em Belo Horizonte (Presencial/Híbrido) ou Remoto — Inglês Avançado.'
                        : 'Available in Belo Horizonte (On-site/Hybrid) or Remote — Advanced English.'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
