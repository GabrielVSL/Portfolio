import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

export default function AbstractTechObject({ currentSection }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    const targetX = (state.mouse.x * Math.PI) / 4; 
    const targetY = (state.mouse.y * Math.PI) / 4;
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * 0.05;

    // NOVOS VALORES: Escala menor (1.5), vai pro fundo (-2), desce um pouco (-1) e vai pra direita (1.5)
    const targetScale = currentSection === 'home' ? 0.85 : 1.5;
    const targetZ = currentSection === 'home' ? 0 : -2;
    const targetYPos = currentSection === 'home' ? 0 : -1;
    const targetXPos = currentSection === 'home' ? 0 : 1.5;

    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetYPos, 0.05);
    // Adicionamos o Lerp para o eixo X também!
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetXPos, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2} floatingRange={[-0.1, 0.1]}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 200, 50]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
    </Float>
  );
}