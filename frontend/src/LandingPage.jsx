import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';

// O seu objeto metálico, agora interativo!
function AbstractTechObject() {
  // Criamos uma referência para manipular o objeto diretamente
  const meshRef = useRef();

  // useFrame roda a cada frame de animação (geralmente 60fps)
  useFrame((state) => {
    if (!meshRef.current) return;

    // state.mouse traz a posição do mouse normalizada de -1 a 1
    // Multiplicamos por um valor pequeno para definir o limite do giro
    const targetX = (state.mouse.x * Math.PI) / 4; 
    const targetY = (state.mouse.y * Math.PI) / 4;

    // Matemática simples para criar um movimento "suave/atrasado" (Lerp)
    // Em vez de pular direto para o mouse, ele desliza até lá
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * 0.05;
  });

  return (
    // A flutuação contínua continua existindo junto com o movimento do mouse
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2} floatingRange={[-0.1, 0.1, -0.1, 0.1]}>
      {/* Reduzi a escala de 1.2 para 0.85 aqui */}
      <mesh ref={meshRef} scale={0.85}>
        <torusKnotGeometry args={[1, 0.3, 200, 50]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
    </Float>
  );
}

export default function LandingPage() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans">
      
      {/* CAMADA 1: O Fundo 3D */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} color={"#ffffff"} />
          
          <AbstractTechObject />
          
          <Environment preset="city" />
          <ContactShadows position={[0, -2.2, 0]} opacity={0.6} scale={10} blur={2.5} far={4.5} />
        </Canvas>
      </div>

      {/* CAMADA 2: Interface HTML */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">
        
        <div className="text-center mix-blend-difference text-white">
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.3em] mb-4 uppercase">
            Gabriel Victor Souza
          </h1>
          <p className="text-xs md:text-sm tracking-[0.5em] text-zinc-300 font-light uppercase">
            Engenharia de Software | Dev Full Stack | Web Stack Developer
          </p>
        </div>

        <div className="absolute bottom-12 w-full flex justify-center gap-x-8 md:gap-x-16 text-xs md:text-sm tracking-[0.2em] pointer-events-auto uppercase font-light text-zinc-500">
          <button className="hover:text-white transition-colors duration-300">Projetos</button>
          <button className="hover:text-white transition-colors duration-300">Sobre</button>
          <button className="hover:text-white transition-colors duration-300">Experiências</button>
          <button className="hover:text-white transition-colors duration-300">Contato</button>
        </div>
        
      </div>
    </div>
  );
}