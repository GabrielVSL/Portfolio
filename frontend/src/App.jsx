import React, { useEffect, useRef } from 'react';
import { Loader } from '@react-three/drei';
import Lenis from 'lenis';
import { useScroll } from 'framer-motion';

import HeroSection from './components/ui/HeroSection';
import AboutSection from './components/ui/AboutSection';
import ProjectsSection from './components/ui/ProjectsSection';
import TechSection from './components/ui/TechSection';
import JourneySection from './components/ui/JourneySection';
import ContactSection from './components/ui/ContactSection';
import ScrollStroke from './components/ui/ScrollStroke';

export default function App() {
  const scrollTrackerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollTrackerRef,
    offset: ["start end", "end end"]
  });
  useEffect(() => {
    // Inicializar o Lenis para scroll suave
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full bg-[#111] font-['Inter'] selection:bg-black selection:text-white">
      
      {/* 1. Hero */}
      <HeroSection />

      {/* WRAPPER GLOBAL PARA O SCROLL DA LINHA */}
      <div ref={scrollTrackerRef} className="relative w-full">
        
        {/* A LINHA CAÓTICA EM BACKGROUND/OVERLAY */}
        <ScrollStroke scrollYProgress={scrollYProgress} />

        {/* 2. Sobre Mim (Manifesto) */}
        <AboutSection />

        {/* 3. Projetos (Skiper6 Hover Reveal) */}
        <ProjectsSection />

        {/* 4. Tech Stack (Parede Tipográfica Brutalista) */}
        <TechSection />

        {/* 5. Trajetória (O Monolito Acordeão) */}
        <JourneySection />

        {/* 6. Grand Finale (Contato e Rodapé) */}
        <ContactSection />

      </div>

      {/* Tela de Loading elegante padrão do Drei */}
      <Loader 
        containerStyles={{ background: '#F0592A', zIndex: 9999 }} 
        innerStyles={{ width: '300px' }} 
        barStyles={{ background: '#ffffff', height: '4px' }} 
        dataStyles={{ color: '#ffffff', fontSize: '14px', fontFamily: 'Inter' }} 
      />
    </div>
  );
}