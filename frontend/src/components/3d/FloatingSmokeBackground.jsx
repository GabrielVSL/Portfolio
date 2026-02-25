import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Cloud } from '@react-three/drei';

// 1. Dicionário EXCLUSIVO para a fumaça (As cores vibrantes voltam aqui!)
const smokeColors = {
  home: new THREE.Color('#1a1a1a'),         // Preto Metálico (escondido na sombra)
  projetos: new THREE.Color('#2c0075'),     // Roxo Profundo
  sobre: new THREE.Color('#ff007f'),        // Magenta / Rosa Cyberpunk
  experiencias: new THREE.Color('#00ff88'), // Verde Mint / Matrix
  contato: new THREE.Color('#ffaa00')       // Amarelo Dourado
};

function ColoredCloudGroup({ currentSection, children }) {
    const groupRef = useRef();

    useFrame(() => {
        if (!groupRef.current) return;

        // Puxamos a cor do dicionário da fumaça
        const targetColor = smokeColors[currentSection] || smokeColors.home;

        groupRef.current.traverse((child) => {
            // Verifica se é a malha da fumaça e aplica a cor de forma lenta e suave (0.01)
            if (child.isMesh && child.material && child.material.color) {
                child.material.color.lerp(targetColor, 0.01);
            }
        });
    });

    return <group ref={groupRef}>{children}</group>;
}

export default function FloatingSmokeBackground({ currentSection }) {
    return (
        <ColoredCloudGroup currentSection={currentSection}>
            {/* A fumaça continua sempre no fundo (-12) */}
            <group position={[0, 0, -12]}>
                <Cloud
                    opacity={0.35}  
                    speed={0.2}     
                    width={20}      
                    depth={1.5}     
                    segments={20}   
                    color="#1a1a1a" // Começa preta na Home
                    bounds={[10, 2, 2]} 
                />
                 <Cloud
                    position={[0, 2, -2]}
                    opacity={0.2} 
                    speed={0.15}
                    width={15}
                    depth={1}
                    segments={10}
                    color="#1a1a1a" // Começa preta na Home
                />
            </group>
        </ColoredCloudGroup>
    );
}