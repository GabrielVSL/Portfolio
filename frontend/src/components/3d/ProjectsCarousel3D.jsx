import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import { easing } from 'maath';
import '../../utils/threeUtils'; // Registra os componentes customizados (BentPlaneGeometry)

// Vamos usar os gifs que estão na pasta public
const projectImages = [
  '/bhflix.gif',
  '/clearpath.gif',
  '/cspc.gif',
  '/orderly.gif',
  '/bhflix.gif',
  '/clearpath.gif',
  '/cspc.gif',
  '/orderly.gif'
];

export default function ProjectsCarousel3D() {
  const [isVisible, setIsVisible] = useState(false);
  const groupRef = useRef();

  useEffect(() => {
    // Sobe o carrossel após 1.5 segundos da montagem
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Animação de entrada (só sobe se isVisible for true)
    const targetY = isVisible ? 0 : -10;
    const targetScale = isVisible ? 1 : 0.01;
    
    easing.damp(groupRef.current.position, 'y', targetY, 0.5, delta);
    easing.damp3(groupRef.current.scale, targetScale, 0.5, delta);
  });

  return (
    <group ref={groupRef} position={[0, -10, 0]} scale={0.01}>
      <Rig rotation={[0, 0, 0.15]}>
        <Carousel radius={1.8} count={8} />
      </Rig>
    </group>
  );
}

function Rig(props) {
  const ref = useRef();
  const [pointerDown, setPointerDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [rotation, setRotation] = useState(0);

  // Implementa auto-rotação e interatividade de drag
  useFrame((state, delta) => {
    if (!pointerDown) {
      // Auto rotação lenta quando não está arrastando
      setRotation((r) => r - delta * 0.2);
    }
    
    // Suaviza a rotação do rig
    easing.damp(ref.current.rotation, 'y', rotation, 0.2, delta);
    
    // Movimento suave da câmera baseado no mouse (parallax)
    easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y * 1.5, 10], 0.3, delta);
    state.camera.lookAt(0, 0, 0);
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setPointerDown(true);
    setStartX(e.clientX);
  };

  const handlePointerUp = () => setPointerDown(false);

  const handlePointerMove = (e) => {
    if (pointerDown) {
      e.stopPropagation();
      const deltaX = e.clientX - startX;
      setRotation((r) => r + deltaX * 0.01);
      setStartX(e.clientX);
    }
  };

  return (
    <group 
      ref={ref} 
      {...props}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
      onPointerMove={handlePointerMove}
    />
  );
}

function Carousel({ radius = 1.4, count = 8 }) {
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url={projectImages[i]}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius, 
        0, 
        Math.cos((i / count) * Math.PI * 2) * radius
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
      onClick={() => {
        // Redireciona para a seção de projetos rolando a página
        const el = document.getElementById('projetos');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    />
  ));
}

function Card({ url, onClick, ...props }) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const pointerOver = (e) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);
  
  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    // Para Material básico do drei <Image>
    easing.damp(ref.current.material, 'grayscale', hovered ? 0 : 0.4, 0.2, delta);
    easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.2, 0.2, delta);
  });

  return (
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      onClick={onClick}
      {...props}
    >
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}
