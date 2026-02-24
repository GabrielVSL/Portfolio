// 1. Importamos o useRef aqui!
import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';

import AbstractTechObject from './components/3d/AbstractTechObject';
import HomeSection from './components/ui/HomeSection';
import ProjectsSection from './components/ui/ProjectsSection';
import Navbar from './components/ui/Navbar';

export default function LandingPage() {
  const [section, setSection] = useState('home');
  
  // 2. Criamos uma âncora para a nossa tela inteira
  const containerRef = useRef();

  return (
    // 3. Colamos o 'ref={containerRef}' na div principal
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden font-sans">
      
      {/* CAMADA 1: O Fundo 3D */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 6], fov: 45 }} 
          dpr={[1, 2]}
          // 4. Dizemos pro Canvas escutar o nosso container, e não o document.body
          eventSource={containerRef} 
          eventPrefix="client"
        >
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
        <Navbar section={section} setSection={setSection} />
      </div>

    </div>
  );
}