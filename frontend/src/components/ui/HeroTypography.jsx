import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export default function HeroTypography() {
  const { lang } = useLanguage();
  const name = 'GABRIEL LOPES';

  return (
    <div className="relative w-full flex flex-col justify-center items-center text-center select-none px-4">
      {/* Título Principal com leveza e fluidez */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="text-5xl sm:text-7xl md:text-[88px] lg:text-[104px] font-normal tracking-[-0.035em] leading-[1.02] text-[#f8f9fc]"
      >
        {name}
        <span className="inline-block w-[3px] h-[0.78em] bg-[#3279f9] ml-2 md:ml-3 align-baseline animate-pulse rounded-full" />
      </motion.h1>

      {/* Subtítulo claro e objetivo para recrutadores com toque ASCII discreto */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 text-base md:text-xl text-[#b2bbc5] font-light tracking-tight max-w-2xl leading-relaxed"
      >
        {lang === 'pt'
          ? 'Construindo aplicações ponta a ponta — da modelagem de banco de dados e APIs seguras a interfaces fluidas e automações de impacto real.'
          : 'Building end-to-end applications — from database modeling and secure APIs to fluid interfaces and real-world automation.'}{' '}
        <span className="font-['JetBrains_Mono'] text-xs text-[#749bff]/80 ml-1 whitespace-nowrap">
          [::ascii_liftoff]
        </span>
      </motion.p>
    </div>
  );
}
