import React, { useEffect, useRef, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import { useScroll } from 'framer-motion';

import HeroSection from './components/ui/HeroSection';
import ScrollStroke from './components/ui/ScrollStroke';
import { CursorProvider } from './contexts/CursorContext';
import GlobalCursor from './components/ui/GlobalCursor';

const AboutSection = lazy(() => import('./components/ui/AboutSection'));
const ProjectsSection = lazy(() => import('./components/ui/ProjectsSection'));
const TechSection = lazy(() => import('./components/ui/TechSection'));
const JourneySection = lazy(() => import('./components/ui/JourneySection'));
const ContactSection = lazy(() => import('./components/ui/ContactSection'));
import BrutalistLoader from './components/ui/BrutalistLoader';


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
    <CursorProvider>
      <div className="w-full bg-[#111] font-['Inter'] selection:bg-black selection:text-white cursor-none">
        
        <GlobalCursor />

        {/* 1. Hero */}
      <HeroSection />

      {/* WRAPPER GLOBAL PARA O SCROLL DA LINHA */}
      <div ref={scrollTrackerRef} className="relative w-full">
        
        {/* A LINHA CAÓTICA EM BACKGROUND/OVERLAY */}
        <ScrollStroke scrollYProgress={scrollYProgress} />

        {/* 2. Sobre Mim (Manifesto) */}
        <Suspense fallback={null}>
          <AboutSection />
          
          {/* 3. Projetos (Skiper6 Hover Reveal) */}
          <ProjectsSection />

          {/* 4. Tech Stack (Parede Tipográfica Brutalista) */}
          <TechSection />

          {/* 5. Trajetória (O Monolito Acordeão) */}
          <JourneySection />

          {/* 6. Grand Finale (Contato e Rodapé) */}
          <ContactSection />
        </Suspense>

      </div>

      {/* Tela de Loading Gigante */}
      <BrutalistLoader />
    </div>
    </CursorProvider>
  );
}