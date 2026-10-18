import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowDownRight } from 'react-icons/fi';
import AsciiCosmosCanvas from '../ui/AsciiCosmosCanvas';
import HeroTypography from '../ui/HeroTypography';
import { useLanguage } from '../../contexts/LanguageContext';

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { lang } = useLanguage();

  return (
    <section
      id="home"
      ref={ref}
      className="relative w-full h-screen overflow-hidden bg-[#0a0b0f] flex flex-col justify-center items-center"
    >
      {/* Motor Gráfico de Partículas ASCII Interativo */}
      <div className="absolute inset-0 z-0">
        <AsciiCosmosCanvas active={isInView} />
      </div>

      {/* Conteúdo Central Limpo e Arejado */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full px-6 pt-10">
        <HeroTypography />

        {/* Botões de Ação em Pílula focados em Recrutadores */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
          <a
            href="#work"
            className="px-6 py-3 rounded-full bg-[#f8f9fc] text-[#121317] text-sm font-medium tracking-tight hover:bg-[#e1e6ec] transition-all cursor-pointer flex items-center gap-2 shadow-[0_8px_30px_rgba(255,255,255,0.1)]"
          >
            <span>{lang === 'pt' ? 'Ver Projetos Reais' : 'View Real Projects'}</span>
            <FiArrowDownRight className="text-[#3279f9] text-base" />
          </a>

          <a
            href="https://www.linkedin.com/in/gabrielvictorsouza/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full bg-[#b7bfd9]/[0.09] border border-white/[0.08] backdrop-blur-md text-[#f8f9fc] text-sm font-normal hover:bg-[#b7bfd9]/[0.16] transition-all flex items-center gap-2"
          >
            <FiLinkedin className="text-[#749bff]" />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://github.com/GabrielVSL"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full bg-[#b7bfd9]/[0.09] border border-white/[0.08] backdrop-blur-md text-[#f8f9fc] text-sm font-normal hover:bg-[#b7bfd9]/[0.16] transition-all flex items-center gap-2"
          >
            <FiGithub className="text-[#b2bbc5]" />
            <span>GitHub</span>
          </a>
        </div>
      </main>
    </section>
  );
}
