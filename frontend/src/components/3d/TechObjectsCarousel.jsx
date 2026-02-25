import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
// IMPORTANTE: Adicionamos o MeshDistortMaterial aqui na importação!
import { Float, MeshDistortMaterial } from '@react-three/drei';

const bgPositions = [
  [-3.5, 0.5, -5],   
  [3.5, 1.5, -6],    
  [-3, -1.5, -4],    
  [3, -2, -5],       
  [0, 2.5, -7]       
];

const sections = ['home', 'projetos', 'sobre', 'experiencias', 'contato'];

function ObjectItem({ index, currentSection, children }) {
  const groupRef = useRef();
  
  const activeIndex = sections.indexOf(currentSection);
  const isActive = index === activeIndex;

  useFrame((state) => {
    if (!groupRef.current) return;

    const targetXRot = (state.mouse.x * Math.PI) / 4; 
    const targetYRot = (state.mouse.y * Math.PI) / 4;
    
    if (isActive) {
      groupRef.current.rotation.y += (targetXRot - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (-targetYRot - groupRef.current.rotation.x) * 0.05;
    } else {
      groupRef.current.rotation.x += 0.003;
      groupRef.current.rotation.y += 0.002;
    }

    let targetX, targetY, targetZ, targetScale;
    let targetColor = new THREE.Color('#050505'); 

    if (isActive) {
      if (index === 0) {
        targetX = 0; targetY = 0; targetZ = 0; targetScale = 0.85;
        targetColor.set('#1a1a1a'); 
      } else {
        targetX = 1.5; targetY = -1; targetZ = -2; targetScale = 1.5;
        targetColor.set('#c4c4c4'); 
      }
    } else {
      [targetX, targetY, targetZ] = bgPositions[index];
      targetScale = 0.6; 
    }

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.04);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.04);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.04);
    
    const currentScale = groupRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.04);
    groupRef.current.scale.set(newScale, newScale, newScale);

    groupRef.current.traverse((child) => {
      if (child.isMesh && child.material && child.material.name === 'mainMaterial') {
        child.material.color.lerp(targetColor, 0.02);
      }
    });
  });

  return (
    <Float speed={isActive ? 2 : 1} rotationIntensity={isActive ? 0.5 : 1} floatIntensity={isActive ? 2 : 4}>
      <group ref={groupRef}>
        {children}
      </group>
    </Float>
  );
}

const CustomMaterial = () => (
  <meshStandardMaterial name="mainMaterial" color="#050505" metalness={0.9} roughness={0.1} />
);

// --- O NOVO COMPONENTE ESTILO SPLINE ---
function SplineLiquidOrb() {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  // Animação interna dos anéis giratórios
  useFrame((state, delta) => {
    if (ring1.current) ring1.current.rotation.x += delta * 0.4;
    if (ring2.current) ring2.current.rotation.y -= delta * 0.6;
    if (ring3.current) {
      ring3.current.rotation.z += delta * 0.5;
      ring3.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <group>
      {/* O NÚCLEO: Uma esfera que se distorce como líquido metálico */}
      <mesh scale={0.75}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial 
          name="mainMaterial" // Recebe a cor prata/preta do carrossel
          color="#050505" 
          metalness={1}       // Reflexo máximo
          roughness={0.1}     // Liso como vidro
          distort={0.4}       // O quanto a forma "derrete" e se deforma
          speed={3}           // Velocidade do movimento orgânico
        />
      </mesh>

      {/* ANÉIS ORBITAIS: Contraste geométrico e rígido por fora */}
      <mesh ref={ring1} scale={1.2}>
        <torusGeometry args={[1, 0.01, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
      <mesh ref={ring2} scale={1.35} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring3} scale={1.5} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[1, 0.005, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function QuantumDataCore() {
  const coreRef = useRef();
  const shellRef = useRef();
  const particlesRef = useRef();

  useFrame((state, delta) => {
    // O cristal central gira
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5;
      coreRef.current.rotation.x += delta * 0.3;
    }
    // A gaiola externa branca gira na direção oposta
    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.2;
      shellRef.current.rotation.z += delta * 0.1;
    }
    // Partículas (dados) orbitando
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 1.2;
      particlesRef.current.rotation.x -= delta * 0.6;
    }
  });

  return (
    <group>
      {/* --- NOVO NÚCLEO CENTRAL (Cristal Escuro + Neon) --- */}
      <group ref={coreRef} scale={0.5}>
        
        {/* Cristal Central Escuro */}
        <mesh>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial 
            name="mainMaterial" // Fica preto/prata dinamicamente
            color="#050505" 
            metalness={1} 
            roughness={0.1}
            flatShading={true} 
          />
        </mesh>
        
        {/* Aura do Cristal (Wireframe holográfico ciano) */}
        <mesh scale={1.2}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </mesh>

        {/* Órbita 1 (Anéis metálicos finos) */}
        <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshStandardMaterial name="mainMaterial" color="#050505" metalness={1} roughness={0.1} />
        </mesh>
        
        {/* Órbita 2 */}
        <mesh rotation={[Math.PI / 2, 0, -Math.PI / 4]}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshStandardMaterial name="mainMaterial" color="#050505" metalness={1} roughness={0.1} />
        </mesh>
        
        {/* Órbita 3 */}
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshStandardMaterial name="mainMaterial" color="#050505" metalness={1} roughness={0.1} />
        </mesh>
      </group>

      {/* --- GAIOLA EXTERNA (Malha branca/transparente) --- */}
      <mesh ref={shellRef} scale={1.1}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
      </mesh>

      {/* --- FRAGMENTOS ÓRBITAIS (Cubinhos) --- */}
      <group ref={particlesRef}>
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const x = Math.sin(angle) * 1.5;
          const y = Math.cos(angle) * 1.5;
          const z = Math.sin(i) * 0.5; 
          
          return (
            <mesh key={i} position={[x, y, z]}>
              <boxGeometry args={[0.12, 0.12, 0.12]} />
              <meshStandardMaterial 
                name="mainMaterial" 
                color="#050505" 
                metalness={0.9} 
                roughness={0.1} 
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export default function TechObjectsCarousel({ currentSection }) {
  return (
    <>
      {/* 0: HOME -> Nó Orgânico Clássico */}
      <ObjectItem index={0} currentSection={currentSection}>
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 200, 50]} />
          <CustomMaterial />
        </mesh>
      </ObjectItem>

      {/* 1: PROJETOS -> Prisma Duplo */}
      <ObjectItem index={1} currentSection={currentSection}>
        <mesh>
          <icosahedronGeometry args={[1, 0]} />
          <CustomMaterial />
        </mesh>
        <mesh scale={1.2}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
        </mesh>
      </ObjectItem>

      {/* 2: SOBRE -> Giroscópio */}
      <ObjectItem index={2} currentSection={currentSection}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.1, 16, 100]} />
          <CustomMaterial />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]} scale={0.8}>
          <torusGeometry args={[1, 0.1, 16, 100]} />
          <CustomMaterial />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} scale={0.6}>
          <torusGeometry args={[1, 0.1, 16, 100]} />
          <CustomMaterial />
        </mesh>
      </ObjectItem>

      {/* 3: EXPERIÊNCIAS -> O Núcleo */}
      <ObjectItem index={3} currentSection={currentSection}>
        <QuantumDataCore />
      </ObjectItem>

      {/* 4: CONTATO -> Orbe Líquido com Anéis (Estilo Spline!) */}
      <ObjectItem index={4} currentSection={currentSection}>
        <SplineLiquidOrb />
      </ObjectItem>
    </>
  );
}