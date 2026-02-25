import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';

import AbstractTechObject from './components/3d/AbstractTechObject';
import FloatingSmokeBackground from './components/3d/FloatingSmokeBackground';
import HomeSection from './components/ui/HomeSection';
import ProjectsSection from './components/ui/ProjectsSection';
import ExperiencesSection from './components/ui/ExperiencesSection';
import AboutSection from './components/ui/AboutSection';
import ContactSection from './components/ui/ContactSection';
import Navbar from './components/ui/Navbar';


export default function LandingPage() {
  const [section, setSection] = useState('home');
  const containerRef = useRef();

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden font-sans">
      
      {/* CAMADA 1: O Fundo 3D */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 6], fov: 45 }} 
          dpr={[1, 2]}
          eventSource={containerRef} 
          eventPrefix="client"
        >
          <FloatingSmokeBackground currentSection={section} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} color={"#ffffff"} />
          <AbstractTechObject currentSection={section} />
          <Environment preset="city" />
          <ContactShadows position={[0, -2.2, 0]} opacity={0.6} scale={10} blur={2.5} far={4.5} />
        </Canvas>
      </div>

      {/* CAMADA 2: Interface HTML */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">
        <HomeSection section={section} />
        <ProjectsSection section={section} />
        <AboutSection section={section} /> 
        <ExperiencesSection section={section} />
        <ContactSection section={section} />

        <Navbar section={section} setSection={setSection} />
      </div>

    </div>
  );
}