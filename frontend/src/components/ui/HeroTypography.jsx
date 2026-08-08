import React from 'react';
import { motion } from 'framer-motion';

export default function HeroTypography() {
  const name = "GABRIEL LOPES";

  return (
    <div className="w-full flex justify-center items-center text-white leading-none uppercase overflow-hidden whitespace-nowrap">
      <motion.h1 
        className="text-[10vw] md:text-[240px] font-['Anton']"
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        style={{
          transform: 'scaleY(1.5)', // Isso "estica" a fonte para cima, deixando-a com a exata proporção super alta do Skiper-UI
          transformOrigin: 'bottom',
          letterSpacing: '-0.04em', // Deixa as letras bem juntinhas
        }}
      >
        {name}
      </motion.h1>
    </div>
  );
}
