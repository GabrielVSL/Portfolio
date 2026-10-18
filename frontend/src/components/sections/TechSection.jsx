import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * Nós posicionados organicamente ao redor do centro (elipse aberta no meio),
 * replicando a composição leve e arejada da referência.
 * Zero re-renders de React, zero backdrop-blur e zero hover pesado.
 */
const graphNodes = [
  // Topo Esquerdo -> Topo Centro -> Topo Direito
  { id: 'git', name: 'Git', x: 24, y: 11, size: 46, bg: '#181a20', border: '#2a2e39', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', layer: 1, floatDur: '7.5s', floatDelay: '0s' },
  { id: 'figma-node', name: 'Tailwind CSS', x: 32.5, y: 16, size: 40, bg: '#0d151c', border: '#06B6D440', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', layer: 2, floatDur: '8.2s', floatDelay: '-1.2s' },
  { id: 'react', name: 'React', x: 41, y: 9.5, size: 48, bg: '#0f1922', border: '#61DAFB50', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', layer: 1, floatDur: '6.8s', floatDelay: '-2.4s' },
  { id: 'ts', name: 'TypeScript', x: 43, y: 19, size: 38, bg: '#3178c6', border: '#3178c6', iconWhite: 'typescript', layer: 2, floatDur: '7.9s', floatDelay: '-0.7s' },
  { id: 'nodejs', name: 'Node.js', x: 54.5, y: 9, size: 48, bg: '#142217', border: '#33993360', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', layer: 1, floatDur: '8.5s', floatDelay: '-3.1s' },
  { id: 'postgres', name: 'PostgreSQL', x: 61, y: 17.5, size: 38, bg: '#f4f6fb', border: '#ffffff', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', layer: 2, floatDur: '7.2s', floatDelay: '-1.8s' },
  { id: 'java', name: 'Java', x: 71.5, y: 19, size: 48, bg: '#f8f9fc', border: '#ffffff', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', layer: 1, floatDur: '8.8s', floatDelay: '-4.0s' },
  { id: 'js', name: 'JavaScript', x: 72.5, y: 7, size: 32, bg: '#f7df1e', border: '#f7df1e', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', layer: 2, floatDur: '6.5s', floatDelay: '-2.0s' },

  // Lado Direito (Cima -> Baixo)
  { id: 'spring', name: 'Spring Boot', x: 82, y: 23, size: 44, bg: '#132016', border: '#6db33f60', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg', layer: 1, floatDur: '7.7s', floatDelay: '-0.9s' },
  { id: 'docker', name: 'Docker', x: 89, y: 29, size: 44, bg: '#0f1c2e', border: '#2496ED60', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', layer: 2, floatDur: '8.4s', floatDelay: '-2.7s' },
  { id: 'go', name: 'Go', x: 81.5, y: 48, size: 42, bg: '#f8f9fc', border: '#ffffff', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg', layer: 1, floatDur: '7.1s', floatDelay: '-1.5s' },
  { id: 'python', name: 'Python', x: 89.5, y: 52, size: 44, bg: '#18202c', border: '#3572A560', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', layer: 2, floatDur: '8.9s', floatDelay: '-3.5s' },
  { id: 'csharp', name: 'C#', x: 90.5, y: 63, size: 44, bg: '#231429', border: '#9b4f9660', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg', layer: 1, floatDur: '7.4s', floatDelay: '-0.4s' },
  { id: 'linux', name: 'Linux', x: 86, y: 76.5, size: 38, bg: '#1d1e24', border: '#343844', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg', layer: 2, floatDur: '8.1s', floatDelay: '-2.2s' },
  { id: 'github', name: 'GitHub', x: 83.5, y: 85, size: 42, bg: '#16181d', border: '#2c303a', iconWhite: 'github', layer: 1, floatDur: '7.6s', floatDelay: '-1.1s' },
  { id: 'vscode', name: 'VS Code', x: 90.5, y: 90, size: 46, bg: '#f8f9fc', border: '#ffffff', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', layer: 2, floatDur: '8.3s', floatDelay: '-3.8s' },

  // Base (Direita -> Esquerda)
  { id: 'swift', name: 'Swift', x: 71, y: 88, size: 44, bg: '#261412', border: '#F0513860', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg', layer: 1, floatDur: '7.8s', floatDelay: '-2.5s' },
  { id: 'swiftui', name: 'SwiftUI', x: 61.5, y: 91, size: 34, bg: '#0c192c', border: '#007AFF60', iconWhite: 'apple', layer: 2, floatDur: '6.9s', floatDelay: '-0.6s' },
  { id: 'html', name: 'HTML5', x: 49, y: 95, size: 46, bg: '#211512', border: '#e34c2660', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', layer: 1, floatDur: '8.6s', floatDelay: '-1.9s' },
  { id: 'css', name: 'CSS3', x: 35, y: 93, size: 44, bg: '#101a28', border: '#1572B660', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', layer: 2, floatDur: '7.3s', floatDelay: '-3.2s' },
  { id: 'angular', name: 'Angular', x: 22, y: 95, size: 44, bg: '#f8f9fc', border: '#ffffff', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg', layer: 1, floatDur: '8.0s', floatDelay: '-1.4s' },

  // Lado Esquerdo (Baixo -> Cima)
  { id: 'flutter', name: 'Flutter', x: 8.5, y: 86, size: 44, bg: '#16181f', border: '#2a2e3b', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg', layer: 1, floatDur: '7.5s', floatDelay: '-2.9s' },
  { id: 'vite', name: 'Vite', x: 20, y: 82, size: 42, bg: '#1a1626', border: '#646CFF50', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', layer: 2, floatDur: '8.7s', floatDelay: '-0.8s' },
  { id: 'vercel', name: 'Vercel', x: 23, y: 72, size: 42, bg: '#0d192b', border: '#3279f960', iconWhite: 'vercel', layer: 1, floatDur: '7.0s', floatDelay: '-2.1s' },
  { id: 'nodered', name: 'Node-RED', x: 9.5, y: 65, size: 42, bg: '#f8f9fc', border: '#ffffff', iconColor: { slug: 'nodered', hex: '8F0000' }, layer: 2, floatDur: '8.2s', floatDelay: '-3.6s' },
  { id: 'make', name: 'Make', x: 18.5, y: 58, size: 38, bg: '#20152b', border: '#6d00cc60', iconWhite: 'make', layer: 1, floatDur: '7.4s', floatDelay: '-1.0s' },
  { id: 'sequelize', name: 'Sequelize', x: 6, y: 46, size: 48, bg: '#f8f9fc', border: '#ffffff', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sequelize/sequelize-original.svg', layer: 1, floatDur: '8.5s', floatDelay: '-2.3s' },
  { id: 'express', name: 'Express', x: 18.5, y: 44.5, size: 32, bg: '#f8f9fc', border: '#ffffff', iconColor: { slug: 'express', hex: '111111' }, layer: 2, floatDur: '6.7s', floatDelay: '-0.5s' },
  { id: 'postman', name: 'Postman', x: 9.5, y: 32.5, size: 40, bg: '#241814', border: '#FF6C3750', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg', layer: 1, floatDur: '7.9s', floatDelay: '-1.7s' },
];

// Arestas pontilhadas formando a malha triangulada ao redor do título (igual à print)
const meshEdges = [
  ['git', 'figma-node'],
  ['git', 'react'],
  ['git', 'postman'],
  ['figma-node', 'react'],
  ['figma-node', 'ts'],
  ['figma-node', 'express'],
  ['react', 'ts'],
  ['react', 'nodejs'],
  ['ts', 'nodejs'],
  ['ts', 'postgres'],
  ['nodejs', 'postgres'],
  ['nodejs', 'java'],
  ['nodejs', 'js'],
  ['postgres', 'java'],
  ['js', 'java'],
  ['js', 'spring'],
  ['java', 'spring'],
  ['java', 'go'],
  ['spring', 'docker'],
  ['spring', 'go'],
  ['docker', 'python'],
  ['go', 'python'],
  ['go', 'csharp'],
  ['python', 'csharp'],
  ['csharp', 'linux'],
  ['linux', 'github'],
  ['linux', 'vscode'],
  ['github', 'vscode'],
  ['github', 'swift'],
  ['swift', 'swiftui'],
  ['swiftui', 'html'],
  ['html', 'css'],
  ['css', 'angular'],
  ['css', 'vite'],
  ['angular', 'vite'],
  ['angular', 'flutter'],
  ['flutter', 'vite'],
  ['flutter', 'nodered'],
  ['vite', 'vercel'],
  ['vercel', 'make'],
  ['vercel', 'nodered'],
  ['nodered', 'make'],
  ['nodered', 'sequelize'],
  ['make', 'express'],
  ['sequelize', 'express'],
  ['sequelize', 'postman'],
  ['express', 'postman'],
];

// Pequenas tags de contexto espalhadas na malha (como "Para fazer", "Em risco", "No caminho certo" na print)
const statusPills = [
  { id: 'p1', pt: 'Full Stack', en: 'Full Stack', x: 16.8, y: 25.5, bg: '#23252c', border: '#383b46', text: '#d2d7e0' },
  { id: 'p2', pt: 'Em produção', en: 'In production', x: 87.8, y: 14, bg: '#152c4a', border: '#254b7c', text: '#7eb6ff' },
  { id: 'p3', pt: 'Clean Code', en: 'Clean Code', x: 12.2, y: 78, bg: '#382c11', border: '#5c481c', text: '#f3c65f' },
];

export default function TechSection() {
  const { lang } = useLanguage();
  const sectionRef = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);

  // Parallax ultra-leve via requestAnimationFrame direto na GPU (Zero React state / Zero re-renders!)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(section);

    const onMouseMove = (e) => {
      if (!isVisible) return;
      const rect = section.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const tick = () => {
      if (isVisible) {
        currentX += (targetX - currentX) * 0.06;
        currentY += (targetY - currentY) * 0.06;

        if (layer1Ref.current) {
          layer1Ref.current.style.transform = `translate3d(${(currentX * -10).toFixed(
            2
          )}px, ${(currentY * -10).toFixed(2)}px, 0)`;
        }
        if (layer2Ref.current) {
          layer2Ref.current.style.transform = `translate3d(${(currentX * 14).toFixed(
            2
          )}px, ${(currentY * 14).toFixed(2)}px, 0)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const nodeMap = {};
  graphNodes.forEach((n) => {
    nodeMap[n.id] = n;
  });

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="relative z-10 w-full py-20 md:py-28 bg-transparent flex flex-col items-center justify-center overflow-hidden border-t border-dashed border-white/[0.1] select-none"
    >
      {/* Vinheta radial suave no centro para destacar o grafo deixando as bordas respirarem na grade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 68% 65% at 50% 50%, #0a0b0f 55%, rgba(10, 11, 15, 0.45) 85%, transparent 100%)',
        }}
      />
      {/* Keyframes CSS puros acelerados por GPU (transform: translate3d) */}
      <style>{`
        @keyframes agFloatSlow {
          0%, 100% { transform: translate3d(-50%, -50%, 0); }
          50% { transform: translate3d(-50%, calc(-50% - 7px), 0); }
        }
        .ag-node-float {
          will-change: transform;
          animation-name: agFloatSlow;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>

      {/* PALCO DO GRAFO (Proporção idêntica à referência enviada) */}
      <div className="relative w-full max-w-[1360px] mx-auto h-[520px] sm:h-[640px] md:h-[740px] flex items-center justify-center px-4">
        {/* 1. MALHA DE LINHAS PONTILHADAS + ELEMENTOS GRÁFICOS (SVG estático super leve) */}
        <svg
          viewBox="0 0 1000 700"
          className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          {/* Arestas pontilhadas finas idênticas à referência */}
          {meshEdges.map(([aId, bId], i) => {
            const a = nodeMap[aId];
            const b = nodeMap[bId];
            if (!a || !b) return null;
            return (
              <line
                key={i}
                x1={a.x * 10}
                y1={a.y * 7}
                x2={b.x * 10}
                y2={b.y * 7}
                stroke="rgba(255, 255, 255, 0.11)"
                strokeWidth="1"
                strokeDasharray="2 3.5"
              />
            );
          })}

          {/* Pequenos detalhes gráficos brancos da referência (*, +, laço curvo) */}
          {/* Asterisco superior esquerdo */}
          <g transform="translate(138, 128)" stroke="#f8f9fc" strokeWidth="2" strokeLinecap="round" opacity="0.85">
            <line x1="-8" y1="0" x2="8" y2="0" />
            <line x1="0" y1="-8" x2="0" y2="8" />
            <line x1="-6" y1="-6" x2="6" y2="6" />
            <line x1="-6" y1="6" x2="6" y2="-6" />
          </g>

          {/* Sinal '+' superior direito */}
          <g transform="translate(640, 80)" stroke="#f8f9fc" strokeWidth="2" strokeLinecap="round" opacity="0.85">
            <line x1="-6" y1="0" x2="6" y2="0" />
            <line x1="0" y1="-6" x2="0" y2="6" />
          </g>

          {/* Traço caligráfico curvo à direita (como na referência) */}
          <path
            d="M 798 442 C 812 446, 825 436, 822 426 C 819 418, 811 424, 815 433 C 820 443, 835 438, 845 426"
            fill="none"
            stroke="#f8f9fc"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Órbita dupla rabiscada à direita */}
          <g transform="translate(866, 272)" fill="none" stroke="#f8f9fc" strokeWidth="1.8" opacity="0.85">
            <ellipse cx="0" cy="0" rx="10" ry="7" transform="rotate(-25)" />
            <ellipse cx="1" cy="1" rx="10" ry="7" transform="rotate(30)" />
          </g>
        </svg>

        {/* 2. CAMADA PARALLAX 1 (Nós Principais + Pílulas de Status) */}
        <div
          ref={layer1Ref}
          className="hidden sm:block absolute inset-0 pointer-events-none"
          style={{ willChange: 'transform' }}
        >
          {graphNodes
            .filter((n) => n.layer === 1)
            .map((node) => (
              <div
                key={node.id}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  width: `${node.size}px`,
                  height: `${node.size}px`,
                  backgroundColor: node.bg,
                  borderColor: node.border,
                  animationDuration: node.floatDur,
                  animationDelay: node.floatDelay,
                }}
                className="ag-node-float absolute rounded-2xl border flex items-center justify-center"
              >
                <img
                  src={
                    node.img
                      ? node.img
                      : node.iconWhite
                      ? `https://cdn.simpleicons.org/${node.iconWhite}/ffffff`
                      : `https://cdn.simpleicons.org/${node.iconColor.slug}/${node.iconColor.hex}`
                  }
                  alt={node.name}
                  decoding="async"
                  loading="lazy"
                  className="w-[54%] h-[54%] object-contain"
                />
              </div>
            ))}

          {statusPills.map((pill) => (
            <div
              key={pill.id}
              style={{
                left: `${pill.x}%`,
                top: `${pill.y}%`,
                backgroundColor: pill.bg,
                borderColor: pill.border,
                color: pill.text,
                transform: 'translate3d(-50%, -50%, 0)',
              }}
              className="absolute px-3 py-1 rounded-md border text-[11px] font-medium tracking-tight whitespace-nowrap"
            >
              {lang === 'pt' ? pill.pt : pill.en}
            </div>
          ))}
        </div>

        {/* 3. CAMADA PARALLAX 2 (Nós Secundários para profundidade suave) */}
        <div
          ref={layer2Ref}
          className="hidden sm:block absolute inset-0 pointer-events-none"
          style={{ willChange: 'transform' }}
        >
          {graphNodes
            .filter((n) => n.layer === 2)
            .map((node) => (
              <div
                key={node.id}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  width: `${node.size}px`,
                  height: `${node.size}px`,
                  backgroundColor: node.bg,
                  borderColor: node.border,
                  animationDuration: node.floatDur,
                  animationDelay: node.floatDelay,
                }}
                className="ag-node-float absolute rounded-xl border flex items-center justify-center"
              >
                <img
                  src={
                    node.img
                      ? node.img
                      : node.iconWhite
                      ? `https://cdn.simpleicons.org/${node.iconWhite}/ffffff`
                      : `https://cdn.simpleicons.org/${node.iconColor.slug}/${node.iconColor.hex}`
                  }
                  alt={node.name}
                  decoding="async"
                  loading="lazy"
                  className="w-[54%] h-[54%] object-contain"
                />
              </div>
            ))}
        </div>

        {/* 4. NÚCLEO CENTRAL: TIPOGRAFIA COM DETALHES ARTÍSTICOS + SUBTÍTULO LEVE */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-4">
          <span className="font-['JetBrains_Mono'] text-xs text-[#749bff] mb-4">
            03 / technical_ecosystem
          </span>

          <h2 className="text-5xl sm:text-7xl md:text-[86px] font-semibold tracking-[-0.035em] leading-[0.96] text-[#f8f9fc] uppercase">
            {/* Linha 1 com rabisco orbital amarelo/ciano sobre a letra O/A como na referência */}
            <span className="relative inline-block">
              ECOSSISTEM
              <span className="relative inline-block">
                A
                <svg
                  viewBox="0 0 90 90"
                  className="pointer-events-none absolute -top-3 -left-3 w-[135%] h-[135%]"
                  aria-hidden="true"
                >
                  <path
                    d="M25,48 C18,26 48,12 68,25 C84,36 74,66 48,70 C24,73 14,50 32,32 C48,16 76,28 70,52 C64,74 30,76 22,55"
                    fill="none"
                    stroke="#f5c400"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
            <br />
            {/* Linha 2: "DE ST[A]CK" onde o 'A' é desenhado como um grafo conectado igual ao 'A' de GRAPH */}
            <span className="inline-flex items-baseline justify-center">
              <span>DE ST</span>
              {/* Letra 'A' construída como Grafo de Nós Conectados */}
              <svg
                viewBox="0 0 68 78"
                className="inline-block w-[0.74em] h-[0.82em] mx-[0.02em] translate-y-[0.04em] overflow-visible"
                aria-label="A"
              >
                {/* Linhas brancas da estrutura do 'A' */}
                <g stroke="#f8f9fc" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="26" y1="6" x2="8" y2="72" />
                  <line x1="42" y1="6" x2="60" y2="72" />
                  <line x1="26" y1="6" x2="42" y2="6" />
                  <line x1="26" y1="6" x2="49" y2="36" />
                  <line x1="42" y1="6" x2="21" y2="28" />
                  <line x1="21" y1="28" x2="49" y2="36" />
                  <line x1="15" y1="50" x2="49" y2="36" />
                  <line x1="15" y1="50" x2="54" y2="52" />
                  <line x1="15" y1="50" x2="60" y2="72" />
                  <line x1="8" y1="72" x2="34" y2="48" />
                </g>
                {/* Nós coloridos nos vértices da letra 'A' */}
                <circle cx="26" cy="6" r="4" fill="#a855f7" />
                <circle cx="42" cy="6" r="4" fill="#3b82f6" />
                <circle cx="21" cy="28" r="4" fill="#38bdf8" />
                <circle cx="49" cy="36" r="4" fill="#ef4444" />
                <circle cx="34" cy="48" r="4" fill="#eab308" />
                <circle cx="15" cy="50" r="4" fill="#3b82f6" />
                <circle cx="54" cy="52" r="4" fill="#22c55e" />
                <circle cx="8" cy="72" r="4" fill="#22c55e" />
                <circle cx="60" cy="72" r="4" fill="#a855f7" />
              </svg>
              <span>CK</span>
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-xl text-[#b2bbc5] font-light max-w-xl leading-relaxed">
            {lang === 'pt'
              ? 'Conheça o ecossistema de linguagens, frameworks e bancos de dados que se conectam nos meus projetos de ponta a ponta.'
              : 'Explore the ecosystem of languages, frameworks, and databases that connect across my end-to-end projects.'}
          </p>

          {/* Pílula única discreta estilo "Veja a prévia do seu grafo" da print */}
          <a
            href="#work"
            className="mt-7 px-5 py-2 rounded-lg border border-white/15 bg-white/[0.02] hover:bg-white/[0.06] text-xs font-normal text-[#d2d7e0] transition-colors"
          >
            {lang === 'pt'
              ? 'Ver tecnologias aplicadas nos projetos ↑'
              : 'See technologies applied in projects ↑'}
          </a>

          {/* Grade Mobile Limpa (exibida apenas em telas pequenas onde o grafo amplo fica oculto) */}
          <div className="grid grid-cols-5 gap-2.5 sm:hidden mt-10 w-full">
            {graphNodes.slice(0, 15).map((node) => (
              <div
                key={node.id}
                style={{ backgroundColor: node.bg, borderColor: node.border }}
                className="aspect-square rounded-xl border flex items-center justify-center p-2.5"
              >
                <img
                  src={
                    node.img
                      ? node.img
                      : node.iconWhite
                      ? `https://cdn.simpleicons.org/${node.iconWhite}/ffffff`
                      : `https://cdn.simpleicons.org/${node.iconColor.slug}/${node.iconColor.hex}`
                  }
                  alt={node.name}
                  loading="lazy"
                  className="w-6 h-6 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
