import React from 'react';

/**
 * BreathingGridBackground — Reproduz a grade pontilhada com efeito de "respiro"
 * luminoso nas linhas (inspirado em teamworkgraph.com).
 *
 * Como funciona sem pesar nada na GPU/CPU:
 * 1. Uma malha SVG pontilhada (72x72px) serve como máscara CSS (mask-image).
 * 2. Apenas os pontinhos de 1px da grade deixam passar a luz; o fundo dos quadrados
 *    permanece 100% escuro (#0a0b0f).
 * 3. Grandes ondas difusas de cor (Amarelo/Lima, Azul Elétrico, Roxo e Ciano)
 *    respiram suavemente via CSS Keyframes na GPU (transform: translate3d + scale + opacity),
 *    fazendo as linhas pontilhadas da grade pulsarem e mudarem de cor organicamente.
 */
const GRID_SVG_MASK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cpath d='M 0 0.5 L 72 0.5 M 0.5 0 L 0.5 72' fill='none' stroke='white' stroke-width='1.1' stroke-dasharray='2 3'/%3E%3C/svg%3E")`;

export default function BreathingGridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      <style>{`
        @keyframes twgBreatheSlowA {
          0%, 100% {
            transform: translate3d(-8%, -4%, 0) scale(0.92);
            opacity: 0.45;
          }
          50% {
            transform: translate3d(6%, 5%, 0) scale(1.18);
            opacity: 0.95;
          }
        }
        @keyframes twgBreatheSlowB {
          0%, 100% {
            transform: translate3d(8%, 4%, 0) scale(1.12);
            opacity: 0.85;
          }
          50% {
            transform: translate3d(-6%, -6%, 0) scale(0.88);
            opacity: 0.35;
          }
        }
        @keyframes twgBreatheSlowC {
          0%, 100% {
            transform: translate3d(0%, 6%, 0) scale(0.95);
            opacity: 0.4;
          }
          50% {
            transform: translate3d(-5%, -4%, 0) scale(1.22);
            opacity: 0.9;
          }
        }
        .twg-grid-mask {
          -webkit-mask-image: ${GRID_SVG_MASK};
          mask-image: ${GRID_SVG_MASK};
          -webkit-mask-size: 72px 72px;
          mask-size: 72px 72px;
          -webkit-mask-repeat: repeat;
          mask-repeat: repeat;
        }
        .twg-breath-a {
          will-change: transform, opacity;
          animation: twgBreatheSlowA 9s ease-in-out infinite;
        }
        .twg-breath-b {
          will-change: transform, opacity;
          animation: twgBreatheSlowB 11s ease-in-out infinite;
        }
        .twg-breath-c {
          will-change: transform, opacity;
          animation: twgBreatheSlowC 10s ease-in-out infinite;
        }
      `}</style>

      {/* Camada 1: Grade pontilhada base sutil (sempre visível em baixa opacidade) */}
      <div
        className="twg-grid-mask absolute inset-0"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.085)',
        }}
      />

      {/* Camada 2: Luzes de respiro recortadas EXCLUSIVAMENTE pelas linhas pontilhadas da grade */}
      <div className="twg-grid-mask absolute inset-0">
        {/* Pulso Topo-Esquerdo / Centro-Esquerdo (Amarelo-Lima + Azul, igual à print) */}
        <div
          className="twg-breath-a absolute -left-[12%] top-[2%] w-[68vw] h-[950px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(234, 179, 8, 0.95) 0%, rgba(132, 204, 22, 0.7) 25%, rgba(59, 130, 246, 0.65) 55%, transparent 75%)',
          }}
        />

        {/* Pulso Topo-Direito / Meio-Direito (Roxo + Azul Elétrico) */}
        <div
          className="twg-breath-b absolute -right-[12%] top-[14%] w-[65vw] h-[980px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 65% 40%, rgba(168, 85, 247, 0.9) 0%, rgba(59, 130, 246, 0.75) 38%, rgba(6, 182, 212, 0.5) 60%, transparent 78%)',
          }}
        />

        {/* Pulso Meio — Seção de Projetos (Azul + Ciano + Verde-Lima) */}
        <div
          className="twg-breath-c absolute -left-[10%] top-[36%] w-[70vw] h-[1050px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.95) 0%, rgba(6, 182, 212, 0.75) 35%, rgba(234, 179, 8, 0.55) 60%, transparent 78%)',
          }}
        />

        {/* Pulso Meio-Baixo — Seção de Stack (Amarelo + Roxo + Azul) */}
        <div
          className="twg-breath-a absolute -right-[10%] top-[58%] w-[70vw] h-[1000px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 60% 50%, rgba(234, 179, 8, 0.85) 0%, rgba(168, 85, 247, 0.75) 38%, rgba(59, 130, 246, 0.55) 62%, transparent 80%)',
          }}
        />

        {/* Pulso Base — Experiência & Contato (Azul + Roxo + Esmeralda) */}
        <div
          className="twg-breath-b absolute left-[5%] bottom-[2%] w-[85vw] h-[950px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.85) 0%, rgba(139, 92, 246, 0.65) 38%, rgba(16, 185, 129, 0.5) 62%, transparent 80%)',
          }}
        />
      </div>
    </div>
  );
}
