import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
// Adicionamos o useGLTF aqui!
import { Stars, Cloud, useGLTF } from '@react-three/drei';

const galaxyColors = {
  home: new THREE.Color('#0a0a2a'),         
  projetos: new THREE.Color('#2c0075'),     
  sobre: new THREE.Color('#ff007f'),        
  experiencias: new THREE.Color('#00ff88'), 
  contato: new THREE.Color('#ffaa00')       
};

// 1. O ASTRONAUTA PERDIDO
function LostAstronaut() {
  const astroRef = useRef();
  const { scene } = useGLTF('/astronaut.glb');

  useFrame((state, delta) => {
    if (!astroRef.current) return;
    
    const t = state.clock.elapsedTime;
    
    // Aumentei o tempo do loop para 55 segundos para compensar o trajeto maior
    const cycle = t % 55; 
    const progress = cycle / 55;
    
    // CORREÇÃO DA BORDA: Agora ele vai de -35 até 35 (bem fora da tela)
    astroRef.current.position.x = THREE.MathUtils.lerp(-35, 35, progress);
    
    astroRef.current.position.y = Math.sin(t * 0.3) * 3;
    astroRef.current.position.z = Math.sin(t * 0.2) * 2 - 8;

    astroRef.current.rotation.x += delta * 0.15;
    astroRef.current.rotation.y += delta * 0.2;
    astroRef.current.rotation.z += delta * 0.1;
  });

  return (
    <primitive 
      ref={astroRef} 
      object={scene} 
      // CORREÇÃO DO TAMANHO: Diminuído para 0.4. 
      // Se ainda ficar maior que o satélite, mude para 0.2 ou 0.15!
      scale={0.4} 
    />
  );
}

// 2. CHUVA DE COMETAS
function ShootingStar({ delay = 0, duration = 3.5, yPos = 8, zPos = -8, scale = 1, startX = 25, endX = -25, dropY = 4 }) {
  const cometRef = useRef();
  
  // MÁGICA MATEMÁTICA: Calcula o ângulo exato da trajetória para virar o nariz do cometa!
  const angle = Math.atan2(-dropY, endX - startX) - Math.PI / 2;

  useFrame((state) => {
    if (!cometRef.current) return;
    const t = state.clock.elapsedTime + delay;
    const cycle = t % 15; 
    
    if (cycle < duration) { 
      const progress = cycle / duration;
      cometRef.current.position.x = THREE.MathUtils.lerp(startX, endX, progress);
      // Agora ele cai de 'yPos' até 'yPos - dropY'
      cometRef.current.position.y = THREE.MathUtils.lerp(yPos, yPos - dropY, progress);
      cometRef.current.visible = true;
    } else {
      cometRef.current.visible = false;
    }
  });

  return (
    // Aplicamos o ângulo dinâmico aqui!
    <group ref={cometRef} rotation={[0, 0, angle]} position={[0, 0, zPos]} scale={scale}>
      
      {/* NÚCLEO (Cabeça do cometa) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* GLOW (Brilho ao redor do núcleo) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#88ccff" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </mesh>
      
      {/* CAUDA CIANO (Agora perfeitamente alinhada atrás da cabeça) */}
      <mesh position={[0, -2.5, 0]}>
        <coneGeometry args={[0.08, 5, 16]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
      
      {/* CAUDA ROXA (Mais longa e dissipando no escuro) */}
      <mesh position={[0, -4, 0]}>
        <coneGeometry args={[0.15, 8, 16]} />
        <meshBasicMaterial color="#4c00ff" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>

    </group>
  );
}

// 3. SATÉLITE
function FloatingSatellite() {
  const satRef = useRef();
  
  useFrame((state, delta) => {
    if (!satRef.current) return;
    const t = state.clock.elapsedTime;
    
    // ROTA DO SATÉLITE: Loop de 70 segundos (bem lento)
    // Usamos (t + 20) para ele não nascer no mesmo exato momento que o astronauta
    const cycle = (t + 20) % 70; 
    const progress = cycle / 70;
    
    // Cruza da extrema direita (35) para a extrema esquerda (-35)
    satRef.current.position.x = THREE.MathUtils.lerp(35, -35, progress);
    
    // Flutua no eixo Y (Sobe e desce suavemente)
    satRef.current.position.y = Math.sin(t * 0.4) * 1.5 + 4;

    // Órbita e giro constantes
    satRef.current.rotation.y += delta * 0.1;
    satRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
  });

  return (
    // Colocamos ele em z=-12 para ficar no meio termo (atrás do astronauta, na frente das estrelas)
    <group ref={satRef} position={[0, 0, -12]} scale={0.6}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 1.5, 16]} />
        <meshStandardMaterial color="#c4c4c4" metalness={0.9} roughness={0.2} />
      </mesh>
      <group position={[-1.2, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.5, 0.05, 0.8]} />
          <meshStandardMaterial color="#000a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.03, 0]}>
           <boxGeometry args={[1.4, 0.01, 0.7]} />
           <meshBasicMaterial color="#0055ff" wireframe />
        </mesh>
      </group>
      <group position={[1.2, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.5, 0.05, 0.8]} />
          <meshStandardMaterial color="#000a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.03, 0]}>
           <boxGeometry args={[1.4, 0.01, 0.7]} />
           <meshBasicMaterial color="#0055ff" wireframe />
        </mesh>
      </group>
      <mesh position={[0, 0, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 1.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#ff007f" blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// 4. ASTEROIDES
function DriftingAsteroids() {
  const groupRef = useRef();
  const asteroids = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      x: THREE.MathUtils.randFloat(-25, 25),
      y: THREE.MathUtils.randFloat(-10, 10),
      z: THREE.MathUtils.randFloat(-12, -4),
      scale: THREE.MathUtils.randFloat(0.05, 0.25),
      speed: THREE.MathUtils.randFloat(0.5, 1.5),
      rotX: THREE.MathUtils.randFloat(0.01, 0.03),
      rotY: THREE.MathUtils.randFloat(0.01, 0.03),
    }));
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((asteroid, i) => {
      const data = asteroids[i];
      asteroid.position.x -= delta * data.speed;
      asteroid.rotation.x += data.rotX;
      asteroid.rotation.y += data.rotY;
      if (asteroid.position.x < -25) {
        asteroid.position.x = 25;
        asteroid.position.y = THREE.MathUtils.randFloat(-10, 10);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {asteroids.map((data, i) => (
        <mesh key={i} position={[data.x, data.y, data.z]} scale={data.scale}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#333333" roughness={0.9} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

// COMPONENTE PRINCIPAL
export default function SpaceBackground({ currentSection }) {
  const starsRef = useRef();
  const activeNebulaRef = useRef();

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y -= delta * 0.01;
      starsRef.current.rotation.x -= delta * 0.005;
    }
    const targetColor = galaxyColors[currentSection] || galaxyColors.home;
    if (activeNebulaRef.current) {
      activeNebulaRef.current.traverse((child) => {
        if (child.isMesh && child.material && child.material.color) {
          child.material.color.lerp(targetColor, 0.02);
        }
      });
    }
  });

  return (
    <group position={[0, 0, -15]}>
      <group ref={starsRef}>
        <Stars radius={50} depth={50} count={5000} factor={4} saturation={1} fade={true} speed={1.5} />
      </group>

      <DriftingAsteroids />
      <FloatingSatellite />
      
      {/* Aqui invocamos o nosso Astronauta! */}
      <LostAstronaut />

      {/* Cometas agora têm rotas variadas! */}
      {/* 1. Cometa principal: Rasante, cai 6 posições no eixo Y de cima pra baixo */}
      <ShootingStar delay={0} duration={3.5} yPos={10} zPos={-8} scale={1} startX={30} endX={-30} dropY={6} />
      
      {/* 2. Cometa de fundo: Queda mais íngreme (dropY=12), vindo lá do alto (yPos=15) */}
      <ShootingStar delay={5} duration={4.5} yPos={15} zPos={-12} scale={0.6} startX={35} endX={-15} dropY={12} />
      
      {/* 3. Cometa frontal rápido: Passa um pouco mais reto na parte de baixo */}
      <ShootingStar delay={10} duration={2.5} yPos={6} zPos={-5} scale={1.3} startX={20} endX={-30} dropY={4} />

      <group position={[0, 0, -5]}>
        <Cloud opacity={0.2} speed={0.05} width={40} depth={10} segments={30} color="#1a0033" position={[5, 5, -2]} />
        <Cloud opacity={0.15} speed={0.08} width={40} depth={10} segments={30} color="#001a33" position={[-5, -5, -4]} />
        <group ref={activeNebulaRef}>
          <Cloud opacity={0.25} speed={0.15} width={30} depth={5} segments={20} color="#0a0a2a" />
        </group>
      </group>
    </group>
  );
}

// Pre-carrega o modelo para não dar "engasgo" quando o site abrir
useGLTF.preload('/astronaut.glb');