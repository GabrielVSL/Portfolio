import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useScroll } from 'framer-motion';

import Navbar from './components/ui/Navbar';
import ScrollStroke from './components/ui/ScrollStroke';
import BreathingGridBackground from './components/ui/BreathingGridBackground';

import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import TechSection from './components/sections/TechSection';
import JourneySection from './components/sections/JourneySection';
import ContactSection from './components/sections/ContactSection';

export default function App() {
  const scrollTrackerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollTrackerRef,
    offset: ['start end', 'end end'],
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full bg-[#0a0b0f] text-[#f8f9fc] font-['Inter'] selection:bg-[#3279f9] selection:text-white">
      <Navbar />

      <HeroSection />

      <div ref={scrollTrackerRef} className="relative w-full overflow-hidden">
        {/* Grade Pontilhada Arquitetônica com Efeito de Respiro (Estilo teamworkgraph.com) */}
        <BreathingGridBackground />

        <ScrollStroke scrollYProgress={scrollYProgress} />
        <AboutSection />
        <ProjectsSection />
        <TechSection />
        <JourneySection />
        <ContactSection />
      </div>
    </div>
  );
}