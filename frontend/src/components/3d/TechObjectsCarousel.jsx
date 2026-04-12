import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

// --- O MATERIAL "VERCEL" DE VIDRO PREMIUM ---
const GlassMaterial = ({ color = "#ffffff", opacity = 1 }) => (
  <meshPhysicalMaterial
    color={color}
    transmission={0.9} 
    opacity={opacity}
    transparent
    metalness={0.2}
    roughness={0.05}
    ior={1.5} 
    thickness={1.5} 
    envMapIntensity={1}
  />
);

// --- MOTOR DE TRANSIÇÃO CINETICA (SPRING PHYSICS) ---
function ObjectItem({ index, activeIndex, children }) {
  const groupRef = useRef();
  const isActive = index === activeIndex;

  // PALCO ASSIMÉTRICO
  const stageCoordinates = [
    { x: 0,   y: 0,    z: 0,    s: 1 },    // 0. Home: Centro
    { x: 2.2, y: -0.2, z: -1.5, s: 1.2 },  // 1. Sobre: Flutuando à direita
    { x: 1.6, y: -0.2, z: -1,   s: 1.4 },  // 2. Projetos: Focado e próximo
    { x: 2.0, y: 0.2,  z: -2,   s: 1.3 },  // 3. Experiências: Alto e dinâmico
    { x: 2.4, y: 0.2,  z: -2.5, s: 1.5 }   // 4. Contato: Mais distante
  ];

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const targetXRot = (state.mouse.x * Math.PI) / 6; 
    const targetYRot = (state.mouse.y * Math.PI) / 6;
    
    if (isActive) {
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetXRot, 4, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, -targetYRot, 4, delta);
    } else {
      groupRef.current.rotation.x += 0.01;
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.z += 0.002;
    }

    const coords = stageCoordinates[index];
    let targetX, targetY, targetZ, targetScale;

    if (isActive) {
      groupRef.current.visible = true;
      targetX = coords.x;
      targetY = coords.y;
      targetZ = coords.z;
      targetScale = coords.s;
    } else {
      targetX = coords.x + (index % 2 === 0 ? 3 : -3); 
      targetY = -4;  
      targetZ = 5;  
      targetScale = 0; 
    }

    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 4, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 4, delta);
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 5, delta);
    
    const currentScale = groupRef.current.scale.x;
    const newScale = THREE.MathUtils.damp(currentScale, targetScale, 6, delta);
    groupRef.current.scale.set(newScale, newScale, newScale);

    if (!isActive && currentScale < 0.05) {
      groupRef.current.visible = false;
    }
  });

  return (
    <Float speed={isActive ? 2 : 0} rotationIntensity={isActive ? 0.2 : 0} floatIntensity={isActive ? 1.5 : 0}>
      <group ref={groupRef}>
        {children}
      </group>
    </Float>
  );
}

// ============================================================================
// OS 5 OBJETOS "ARQUITETURA INVISÍVEL" 
// ============================================================================

// A: O CRISTAL ALGÓRITMICO
function AlgorithmicCore() {
  const innerRef = useRef();
  const shellRef = useRef();
  useFrame((state, delta) => {
    if (innerRef.current) { innerRef.current.rotation.x += delta * 0.8; innerRef.current.rotation.y += delta * 0.5; }
    if (shellRef.current) { shellRef.current.rotation.y -= delta * 0.1; shellRef.current.rotation.z += delta * 0.05; }
  });
  return (
    <group>
      <mesh ref={innerRef} scale={0.4}><torusKnotGeometry args={[1, 0.3, 100, 16]} /><meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.8} /></mesh>
      <mesh ref={shellRef} scale={1.1}><icosahedronGeometry args={[1, 0]} /><GlassMaterial color="#0077ff" opacity={0.3} />
        <mesh scale={1.01}><icosahedronGeometry args={[1, 0]} /><meshBasicMaterial color="#0077ff" wireframe transparent opacity={0.15} /></mesh>
      </mesh>
    </group>
  );
}

// B: O HIPERCUBO DE IDENTIDADE (Para a secção "Sobre")
function IdentityHypercube() {
  const groupRef = useRef();
  const innerRef = useRef();
  const outerRef = useRef();

  useFrame((_, delta) => {
    // Rotação suave do conjunto completo
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x += delta * 0.05;
    }
    // O núcleo roda em sentido contrário (dá a sensação de mecanismo complexo)
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.2;
      innerRef.current.rotation.x -= delta * 0.15;
    }
    // A carapaça exterior tem um leve desvio
    if (outerRef.current) {
      outerRef.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Núcleo Interno (A sua "Base" de conhecimento puro) */}
      <mesh ref={innerRef} scale={0.5}>
        <boxGeometry args={[1, 1, 1]} />
        <GlassMaterial color="#0077ff" opacity={0.8} />
        {/* Arestas de Neon Internas */}
        <mesh scale={1.02}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.6} />
        </mesh>
      </mesh>

      {/* 2. Carapaça Externa de Vidro (A sua estrutura profissional e engenharia) */}
      <mesh ref={outerRef} scale={1.3}>
        <boxGeometry args={[1, 1, 1]} />
        <GlassMaterial color="#050505" opacity={0.5} />
        
        {/* Fios arquiteturais (Wireframe subtil) */}
        <mesh scale={1.01}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
        </mesh>
        
        {/* Nodos de Conexão nos vértices (Representando networking e os vários frameworks que domina) */}
        {[-0.5, 0.5].map(x => 
          [-0.5, 0.5].map(y => 
            [-0.5, 0.5].map(z => (
              <mesh key={`${x}${y}${z}`} position={[x, y, z]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshBasicMaterial color="#00e5ff" />
              </mesh>
            ))
          )
        )}
      </mesh>

      {/* 3. Órbitas de Foco (Trilhas de dados que rodeiam a sua identidade) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.7}>
        <torusGeometry args={[1, 0.002, 16, 100]} />
        <meshBasicMaterial color="#0077ff" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} scale={1.7}>
        <torusGeometry args={[1, 0.002, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

// C: TELA DE CÓDIGO & DISPOSITIVO MOBILE (Refinado e Frontal)
function ProjectHologram() {
  const groupRef = useRef();
  
  useFrame((state) => {
    // Apenas flutua suavemente para cima e para baixo, sem girar descontroladamente
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });

  return (
    // Rotação fixa para que a "tela" fique quase de frente para o usuário
    <group ref={groupRef} rotation={[0, -0.1, 0]}>
      
      {/* 1. IDE / Tela de Código Principal */}
      <group position={[-0.4, 0, -0.2]}>
        <mesh>
          <boxGeometry args={[2.8, 1.6, 0.05]} />
          <GlassMaterial color="#050505" opacity={0.8} />
        </mesh>
        <mesh scale={1.01}>
          <boxGeometry args={[2.8, 1.6, 0.05]} />
          <meshBasicMaterial color="#0077ff" wireframe transparent opacity={0.2} />
        </mesh>
        
        {/* Header da Janela (Simulando botões macOS/Browser) */}
        <mesh position={[-1.2, 0.7, 0.03]}><circleGeometry args={[0.04, 16]} /><meshBasicMaterial color="#ff5f56" /></mesh>
        <mesh position={[-1.05, 0.7, 0.03]}><circleGeometry args={[0.04, 16]} /><meshBasicMaterial color="#ffbd2e" /></mesh>
        <mesh position={[-0.9, 0.7, 0.03]}><circleGeometry args={[0.04, 16]} /><meshBasicMaterial color="#27c93f" /></mesh>

        {/* Linhas de "Código" Neon (Indentadas) */}
        <group position={[-1.2, 0.4, 0.03]}>
          <mesh position={[0.3, 0, 0]}><boxGeometry args={[0.6, 0.04, 0.01]} /><meshBasicMaterial color="#00e5ff" /></mesh>
          <mesh position={[0.5, -0.15, 0]}><boxGeometry args={[0.8, 0.04, 0.01]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.6} /></mesh>
          <mesh position={[0.6, -0.3, 0]}><boxGeometry args={[1.0, 0.04, 0.01]} /><meshBasicMaterial color="#0077ff" /></mesh>
          <mesh position={[0.4, -0.45, 0]}><boxGeometry args={[0.4, 0.04, 0.01]} /><meshBasicMaterial color="#00e5ff" /></mesh>
          <mesh position={[0.2, -0.6, 0]}><boxGeometry args={[0.2, 0.04, 0.01]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.4} /></mesh>
        </group>
      </group>

      {/* 2. Dispositivo Mobile (Swift/Flutter) Flutuando à Direita */}
      <group position={[1.2, -0.2, 0.4]}>
        {/* Carcaça do Celular de Vidro */}
        <mesh>
          <boxGeometry args={[0.7, 1.4, 0.08]} />
          <GlassMaterial color="#00e5ff" opacity={0.6} />
        </mesh>
        {/* Tela Escura */}
        <mesh position={[0, 0, 0.045]}>
          <boxGeometry args={[0.6, 1.3, 0.01]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
        {/* Elementos da UI do App */}
        <mesh position={[0, 0.4, 0.05]}>
          <boxGeometry args={[0.4, 0.2, 0.01]} />
          <meshBasicMaterial color="#0077ff" />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.4, 0.4, 0.01]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>
      </group>

    </group>
  );
}

// D: QUANTUM NEXUS (Rede e Órbitas)
function QuantumNexus() {
  const outerRef = useRef();
  const innerRef = useRef();
  useFrame((_, delta) => {
    if (outerRef.current) { outerRef.current.rotation.y += delta * 0.3; outerRef.current.rotation.z += delta * 0.1; }
    if (innerRef.current) { innerRef.current.rotation.x -= delta * 0.5; }
  });
  return (
    <group>
      <mesh ref={innerRef} scale={0.7}>
        <icosahedronGeometry args={[1, 0]} /><GlassMaterial color="#00e5ff" opacity={0.6} />
        <mesh scale={1.05}><icosahedronGeometry args={[1, 0]} /><meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} /></mesh>
      </mesh>
      <group ref={outerRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]} scale={1.8}><torusGeometry args={[1, 0.015, 16, 100]} /><meshBasicMaterial color="#00e5ff" transparent opacity={0.6} /></mesh>
        <mesh rotation={[-Math.PI / 3, 0, 0]} scale={1.8}><torusGeometry args={[1, 0.015, 16, 100]} /><meshBasicMaterial color="#0077ff" transparent opacity={0.6} /></mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} scale={1.8}><torusGeometry args={[1, 0.015, 16, 100]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.3} /></mesh>
      </group>
    </group>
  );
}

// E: ORBE DE SINAL
function SignalOrb() {
  return (
    <group>
      <mesh scale={1}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial color="#0077ff" envMapIntensity={1} clearcoat={1} clearcoatRoughness={0.1} metalness={0.8} roughness={0.2} distort={0.4} speed={3} />
      </mesh>
      {[1.5, 2, 2.5].map((scale, i) => (
        <mesh key={i} scale={scale} rotation={[Math.PI/2, 0, 0]}><torusGeometry args={[1, 0.005, 16, 100]} /><meshBasicMaterial color="#00e5ff" transparent opacity={0.4 / i} /></mesh>
      ))}
    </group>
  );
}

// ============================================================================
// O CARROSSEL PRINCIPAL
// ============================================================================
export default function TechObjectsCarousel() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const responsiveScale = isMobile ? 0.65 : 1;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['home', 'sobre', 'projetos', 'experiencias', 'contato'];
      let newIndex = 0;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.6) {
            newIndex = i;
            break;
          }
        }
      }
      setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <group scale={responsiveScale}>
      {/* 0. Home: O Cristal de Lógica e Arquitetura */}
      <ObjectItem index={0} activeIndex={activeIndex}><AlgorithmicCore /></ObjectItem>
      
      {/* 1. Sobre: A Base Sólida (Infra / Servidores) */}
      <ObjectItem index={1} activeIndex={activeIndex}><IdentityHypercube /></ObjectItem>
      
      {/* 2. Projetos: A Tela de Código e Interface Mobile */}
      <ObjectItem index={2} activeIndex={activeIndex}><ProjectHologram /></ObjectItem>
      
      {/* 3. Experiências: As Conexões e Ecossistemas de Dados */}
      <ObjectItem index={3} activeIndex={activeIndex}><QuantumNexus /></ObjectItem>
      
      {/* 4. Contato: O Orbe de Sinal */}
      <ObjectItem index={4} activeIndex={activeIndex}><SignalOrb /></ObjectItem>
    </group>
  );
}