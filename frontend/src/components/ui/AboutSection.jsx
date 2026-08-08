import React from 'react';

export default function AboutSection() {
  return (
    <section id="studio" className="relative w-full min-h-screen bg-[#111111] text-[#f0f0f0] flex items-center justify-center py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Usamos leading-[0.85] para colar as linhas. Se quiser ainda mais colado, mude para 0.8 ou 0.75 */}
        <h2 className="text-[7vw] md:text-[6vw] leading-[1.12] uppercase font-['Anton'] tracking-tight text-[#f0f0f0]">
          Não escrevo apenas código.<br />Construo experiências.
        </h2>
        <div className="w-full flex justify-end">
          <p className="max-w-lg text-lg md:text-2xl font-['Inter'] opacity-70 leading-relaxed text-right font-light">
            Focado em criar interfaces digitais imersivas que conectam usuários e marcas através de design brutalista, interações fluidas e tecnologias de ponta como React, Three.js e Framer Motion.
          </p>
        </div>
      </div>
    </section>
  );
}
