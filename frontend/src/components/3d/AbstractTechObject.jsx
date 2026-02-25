import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

// Dicionário atualizado para Prata nas seções
const sectionColors = {
  home: new THREE.Color('#1a1a1a'),         
  projetos: new THREE.Color('#c4c4c4'),     // Prata
  sobre: new THREE.Color('#c4c4c4'),        // Prata
  experiencias: new THREE.Color('#c4c4c4'), // Prata
  contato: new THREE.Color('#c4c4c4')       // Prata
};

export default function AbstractTechObject({ currentSection }) {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    // Rotação com o mouse
    const targetX = (state.mouse.x * Math.PI) / 4; 
    const targetY = (state.mouse.y * Math.PI) / 4;
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * 0.05;

    // Movimento de Posição e Escala (Continua na velocidade normal de 0.05)
    const targetScale = currentSection === 'home' ? 0.85 : 1.5;
    const targetZ = currentSection === 'home' ? 0 : -2;
    const targetYPos = currentSection === 'home' ? 0 : -1;
    const targetXPos = currentSection === 'home' ? 0 : 1.5;

    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetYPos, 0.05);
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetXPos, 0.05);

    // A MÁGICA DA COR LENTA:
    const targetColor = sectionColors[currentSection] || sectionColors.home;
    // Mudamos de 0.05 para 0.01. Quanto menor o número, mais demorada a transição!
    materialRef.current.color.lerp(targetColor, 0.01); 
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2} floatingRange={[-0.1, 0.1]}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 200, 50]} />
        <meshStandardMaterial 
          ref={materialRef} 
          color="#1a1a1a"   
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
    </Float>
  );
}