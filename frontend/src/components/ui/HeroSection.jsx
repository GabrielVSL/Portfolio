import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import PhysicsBackground from '../3d/PhysicsBackground';
import HeroTypography from './HeroTypography';

export default function HeroSection() {
  const ref = useRef(null);
  // Monitora se o componente está na tela. Se o usuário rolar pra baixo, isInView vira falso
  const isInView = useInView(ref);

  return (
    <section id="home" ref={ref} className="relative w-full h-screen overflow-hidden bg-[#F0592A]">
      
      {/* 3D Background - Recebe o status 'active' para congelar cálculos quando não estiver na tela */}
      <div className="absolute inset-0 z-0">
        <PhysicsBackground active={isInView} style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between">
        
        {/* CABEÇALHO */}
        <header className="w-full flex justify-between items-start p-6 text-white text-xs md:text-sm font-semibold tracking-wide pointer-events-auto">
          <div className="flex flex-col uppercase opacity-90">
            <span>software Developer</span>
            <span className="opacity-70 text-[10px]">focus digital experience</span>
          </div>
          <nav className="flex gap-6 uppercase opacity-80 text-[11px]">
            <a href="#work" className="hover:opacity-100 transition-opacity">Projetos</a>
            <a href="#studio" className="hover:opacity-100 transition-opacity">Studio</a>
            <a href="#journal" className="hover:opacity-100 transition-opacity">Experiencias</a>
            <a href="#contact" className="hover:opacity-100 transition-opacity">Contato</a>
          </nav>
        </header>

        {/* NOME CENTRALIZADO */}
        <main className="flex-1 flex items-center justify-center w-full px-6 overflow-hidden relative">
          <HeroTypography />
        </main>

        {/* RODAPÉ DO HERO */}
        <footer className="w-full flex justify-between items-end p-6 text-white pointer-events-auto">
          <div className="flex flex-col text-xs md:text-sm font-semibold opacity-90 leading-tight">
            <span>Mudando</span>
            <span>Experiencia de Marcas</span>
          </div>
          <div className="bg-[#1a1a1a] text-white px-4 py-2 text-xs font-bold rounded-sm flex items-center gap-2 cursor-pointer hover:bg-black transition-colors" onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
            <span>Explore</span>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </footer>
      </div>
    </section>
  );
}
