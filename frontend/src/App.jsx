import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, Loader } from '@react-three/drei';
import { ReactLenis } from 'lenis/react';

// Importar as seções (Verifique se os caminhos estão corretos no seu projeto)
import HomeSection from './pages/HomeSection';
import ProjectsSection from './pages/ProjectsSection';
import AboutSection from './pages/AboutSection';
import ExperiencesSection from './pages/ExperiencesSection';
import ContactSection from './pages/ContactSection';
import Navbar from './components/ui/Navbar';
import SoundControl from './components/ui/SoundControl';
import SpaceBackground from './components/3d/SpaceBackground';
import TechObjectsCarousel from './components/3d/TechObjectsCarousel';

export default function App() {
  // Ref para o R3F conseguir rastrear o mouse sobre o HTML
  const htmlWrapperRef = useRef();

  return (
    <>
      {/* ========================================================================= */}
      {/* CAMADA 1: MOTOR WEBGL (Isolado do fluxo HTML. Z-Index negativo e Fixo)  */}
      {/* ========================================================================= */}
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          zIndex: -1, 
          pointerEvents: 'none' // Impede que o Canvas roube os cliques do HTML
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 2]}
          eventSource={htmlWrapperRef} // Ouve o mouse do elemento HTML
          eventPrefix="client"
        >
          {/* HARDCODE DO FUNDO 3D: Isso garante que o fundo seja SEMPRE escuro, 
              mesmo se o Tailwind falhar ou o CSS quebrar. */}
          <color attach="background" args={['#050505']} />

          <Suspense fallback={null}>
            <SpaceBackground />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} color={"#ffffff"} />
            
            {/* Presumo que você gerencia a seção ativa via Contexto ou State 
                passando para o TechObjectsCarousel */}
            <TechObjectsCarousel />
            
            <Environment preset="city" />
            <ContactShadows
              position={[0, -2.2, 0]}
              opacity={0.6}
              scale={10}
              blur={2.5}
              far={4.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* ========================================================================= */}
      {/* CAMADA 2: DOM HTML (Controlado pelo Lenis. Rola por cima do Canvas)     */}
      {/* ========================================================================= */}
      <ReactLenis root>
        {/* Usamos estilos nativos para forçar a cor do texto e proibir rolagem horizontal */}
<main 
          ref={htmlWrapperRef}
          style={{ 
            position: 'relative', 
            zIndex: 1, 
            width: '100%', 
            color: '#ffffff', 
            backgroundColor: 'transparent' 
          }}
          className="font-sans"
        >
          {/* Navbar global fixa no topo */}
          <Navbar />

          <div className="flex flex-col w-full min-h-screen">
            <HomeSection />
            <AboutSection />
            <ProjectsSection />
            <ExperiencesSection />
            <ContactSection />
          </div>

          <div style={{ height: '10vh' }} />
        </main>
      </ReactLenis>

      {/* ========================================================================= */}
      {/* CAMADA 3: TELA DE LOADING (Sobrepõe tudo Z-Index alto)                  */}
      {/* ========================================================================= */}
      <Loader 
        containerStyles={{ backgroundColor: '#050505' }}
        dataInterpolation={(p) => `Carregando Experiência ${p.toFixed(0)}%`}
      />
    </>
  );
}