import * as THREE from 'three';
import { useRef, useReducer, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, MeshTransmissionMaterial, Environment, Lightformer } from '@react-three/drei';
import { CuboidCollider, BallCollider, Physics, RigidBody } from '@react-three/rapier';
import { EffectComposer, N8AO, SMAA } from '@react-three/postprocessing';
import { easing } from 'maath';

function FramePauser({ active }) {
  const set = useThree((state) => state.set)
  useEffect(() => {
    set({ frameloop: active ? 'always' : 'demand' })
  }, [active, set])
  return null
}

const accents = ['#ffffff', '#111111', '#444444', '#f0f0f0'];
const shuffle = (accent = 0) => [
  { color: '#222', roughness: 0.1 }, // Um escuro
  { color: 'white', roughness: 0.75 }, // Um branco fosco
  { color: accents[accent], roughness: 0.1, accent: true }, // Uma cor de sotaque que pisca a luz
];

export default function PhysicsBackground({ active = true, ...props }) {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0);
  const connectors = useMemo(() => shuffle(accent), [accent]);
  
  return (
    <Canvas onClick={click} shadows dpr={[1, 1]} gl={{ antialias: false, powerPreference: "high-performance" }} camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }} {...props}>
      <FramePauser active={active} />
      <color attach="background" args={['#F0592A']} />
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      
      <Physics paused={!active} gravity={[0, 0, 0]}>
        <Pointer />
        {connectors.map((props, i) => <Connector key={i} {...props} />)}
        
        <Connector position={[5, 10, 2]}>
          <Model>
            <MeshTransmissionMaterial clearcoat={1} thickness={0.1} anisotropicBlur={0.1} chromaticAberration={0.1} samples={3} resolution={64} />
          </Model>
        </Connector>

        <Connector position={[-5, 10, 2]}>
          <Model>
            <MeshTransmissionMaterial clearcoat={1} thickness={0.1} anisotropicBlur={0.1} chromaticAberration={0.1} samples={3} resolution={64} />
          </Model>
        </Connector>
      </Physics>
      
      <EffectComposer disableNormalPass multisampling={0}>
        <N8AO halfRes color="black" aoRadius={2} intensity={1} aoSamples={2} denoiseSamples={1} />
      </EffectComposer>
      
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
        </group>
      </Environment>
    </Canvas>
  );
}

function Connector({ position, children, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, accent, ...props }) {
  const api = useRef()
  const pos = useMemo(() => position || [r(10), r(10), r(10)], [])
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta)
    
    if (api.current) {
      // Força de atração para o centro (0,0,0)
      vec.copy(api.current.translation()).negate().multiplyScalar(0.2)
      
      // Adicionamos uma "perturbação" contínua para dar um efeito de gravidade zero fluida
      // Isso impede que os objetos "congelem" quando o mouse para
      const t = state.clock.elapsedTime
      vec.x += Math.sin(t * 2 + pos[0]) * 0.15
      vec.y += Math.cos(t * 2 + pos[1]) * 0.15
      vec.z += Math.sin(t * 1.5 + pos[2]) * 0.15
      
      api.current.applyImpulse(vec)
    }
  })
  return (
    // canSleep={false} obriga o motor de física a nunca ignorar essa peça, garantindo movimento eterno
    <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={pos} ref={api} colliders={false} canSleep={false}>
      <CuboidCollider args={[0.38, 1.27, 0.38]} />
      <CuboidCollider args={[1.27, 0.38, 0.38]} />
      <CuboidCollider args={[0.38, 0.38, 1.27]} />
      {children ? children : <Model {...props} />}
      {accent && <pointLight intensity={4} distance={2.5} color={props.color} />}
    </RigidBody>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0))
  })
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1]} />
    </RigidBody>
  )
}

function Model({ children, color = 'white', roughness = 0, ...props }) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/c-transformed.glb')
  useFrame((state, delta) => {
    easing.dampC(ref.current.material.color, color, 0.2, delta)
  })
  return (
    <mesh ref={ref} castShadow receiveShadow scale={10} geometry={nodes.connector.geometry}>
      <meshStandardMaterial metalness={0.2} roughness={roughness} map={materials.base.map} />
      {children}
    </mesh>
  )
}

useGLTF.preload('/c-transformed.glb');
