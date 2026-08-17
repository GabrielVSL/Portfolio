import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import DottedBg2 from './DottedBg2';
import { useCursor } from '../../contexts/CursorContext';

const technologies = [
  // Programming Languages
  { id: 'js', name: 'JavaScript', color: '#f1e05a', icon: 'javascript' },
  { id: 'ts', name: 'TypeScript', color: '#3178c6', icon: 'typescript' },
  { id: 'java', name: 'Java', color: '#b07219', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { id: 'csharp', name: 'C#', color: '#178600', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' },
  { id: 'swift', name: 'Swift', color: '#F05138', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg' },
  { id: 'dart', name: 'Dart', color: '#0175C2', icon: 'dart' },
  // Front-end
  { id: 'react', name: 'React', color: '#61DAFB', icon: 'react' },
  { id: 'angular', name: 'Angular', color: '#DD0031', icon: 'angular' },
  { id: 'svelte', name: 'Svelte', color: '#ff3e00', icon: 'svelte' },
  { id: 'tailwind', name: 'Tailwind CSS', color: '#06B6D4', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  // Back-end
  { id: 'nodejs', name: 'Node.js', color: '#339933', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { id: 'spring', name: 'Spring Boot', color: '#6db33f', icon: 'springboot' },
  { id: 'dotnet', name: '.NET', color: '#512BD4', icon: 'dotnet' },
  { id: 'quarkus', name: 'Quarkus', color: '#4795EB', icon: 'quarkus' },
  // Mobile
  { id: 'react-native', name: 'React Native', color: '#61DAFB', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { id: 'flutter', name: 'Flutter', color: '#02569B', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
  { id: 'swiftui', name: 'SwiftUI', color: '#007AFF', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg' },
  // DB
  { id: 'postgresql', name: 'PostgreSQL', color: '#4169E1', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { id: 'mysql', name: 'MySQL', color: '#4479A1', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { id: 'sqlite', name: 'SQLite', color: '#003B57', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
  { id: 'swiftdata', name: 'SwiftData', color: '#F05138', icon: 'swift' },
  // Infra
  { id: 'docker', name: 'Docker', color: '#2496ED', icon: 'docker' },
  { id: 'ubuntu', name: 'Ubuntu Server', color: '#E95420', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg' },
  { id: 'nginx', name: 'Nginx', color: '#009639', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg' },
  { id: 'casaos', name: 'CasaOS', color: '#ffffff', customImg: 'https://www.google.com/s2/favicons?sz=128&domain=casaos.io' },
  { id: 'activedirectory', name: 'Active Directory', color: '#0078D4', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg' },
  // Auto
  { id: 'n8n', name: 'n8n', color: '#EA4B71', icon: 'n8n' },
  { id: 'entraid', name: 'Microsoft Entra ID', color: '#0072C6', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' }
];

const styles = `
@keyframes marquee-left {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
@keyframes marquee-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}
.animate-marquee-left {
  display: flex;
  width: max-content;
  animation: marquee-left 30s linear infinite;
  will-change: transform;
}
.animate-marquee-right {
  display: flex;
  width: max-content;
  animation: marquee-right 30s linear infinite;
  will-change: transform;
}
.animate-marquee-left:hover, .animate-marquee-right:hover {
  animation-play-state: paused;
}
`;

const TechMarquee = React.memo(({ items, direction = 'left', speed = 30, hoveredTech, setHoveredTech, isPaused }) => {
  const content = (
    <>
      {items.map((tech, i) => (
         <div 
           key={i} 
           className="flex items-center gap-12 md:gap-20 px-6 md:px-10 cursor-none"
           onMouseEnter={() => setHoveredTech(tech)}
           onMouseLeave={() => setHoveredTech(null)}
         >
           <img 
             src={tech.customImg || `https://cdn.simpleicons.org/${tech.icon}/${tech.color.replace('#', '')}`}
             alt={tech.name}
             className="w-16 h-16 md:w-28 md:h-28 object-contain transition-all duration-300"
             style={{
               filter: hoveredTech?.id === tech.id 
                 ? `grayscale(0) brightness(1.2) drop-shadow(0 0 20px ${tech.color}80)`
                 : 'grayscale(1) brightness(0.5) opacity(0.5)'
             }}
           />
           <span className="text-[#F0592A] text-[2vw] md:text-[1.5vw] opacity-30">✦</span>
         </div>
      ))}
    </>
  );

  return (
    <div className="relative w-full overflow-visible flex flex-col justify-center my-[-1vw] md:my-[-2vw]">
      <div 
        className={direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}
        style={{ 
          animationDuration: `${speed}s`, 
          animationPlayState: isPaused ? 'paused' : 'running' 
        }}
      >
        <div className="flex">{content}</div>
        <div className="flex">{content}</div>
      </div>
    </div>
  );
});

export default function TechSection() {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [isHoveringMarquee, setIsHoveringMarquee] = useState(false);
  const { setCursorState } = useCursor();
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);

  React.useEffect(() => {
    if (isHoveringMarquee) {
      if (hoveredTech) {
        setCursorState(prev => ({
          ...prev,
          name: hoveredTech.name,
          color: hoveredTech.color,
          stroke: "rgba(0,0,0,0.18)",
          size: 24,
        }));
      } else {
        setCursorState(prev => ({
          ...prev,
          name: "",
          color: "#ffffff",
          stroke: "transparent",
          size: 24,
        }));
      }
    }
  }, [hoveredTech, isHoveringMarquee, setCursorState]);

  // Divide as tecnologias em 3 fileiras
  const row1 = technologies.slice(0, 10);
  const row2 = technologies.slice(10, 19);
  const row3 = technologies.slice(19, 28);

  return (
    <section 
      id="tech"
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-[#111111] flex flex-col items-center justify-center overflow-hidden py-20"
      style={{ contentVisibility: "auto", containIntrinsicSize: "100vh" }}
    >
      <style>{styles}</style>

      {/* Fundo Orgânico WebGL */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-80"
        style={{
          WebkitMaskImage: 'radial-gradient(50% 50% at 50% 50%, black 30%, transparent 100%)',
          maskImage: 'radial-gradient(50% 50% at 50% 50%, black 30%, transparent 100%)'
        }}
      >
        <DottedBg2 
          bgColor="#111111" 
          frequency={3} 
          speed={1} 
          cellSize={12} 
          gamma={2} 
          effectivePlay={isInView}
          paletteBias={-2} 
          colors={["#F0592A", "#802A10"]} 
        />
      </div>

      {/* Título de seção brutalista */}
      <div className="w-full px-6 md:px-12 mb-10 z-20 flex justify-between items-end">
        <h2 className="text-[10vw] md:text-[5vw] font-['Anton'] leading-none text-white tracking-tighter uppercase mix-blend-difference">
          THE ARSENAL
        </h2>
        <p className="text-zinc-400 font-['Inter'] text-sm md:text-base max-w-xs text-right hidden md:block mix-blend-difference">
          As ferramentas que utilizo para criar experiências digitais premiadas.
        </p>
      </div>

      <div 
        className="relative w-full flex flex-col justify-center flex-1 z-10 cursor-none"
        onMouseEnter={() => setIsHoveringMarquee(true)}
        onMouseLeave={() => {
          setIsHoveringMarquee(false);
          setCursorState(prev => ({
            ...prev,
            name: "",
            color: "#ffffff",
            stroke: "transparent"
          }));
        }}
      >
        <div className="flex flex-col py-10 rotate-[-2deg] scale-105 gap-16 md:gap-24">
          <TechMarquee items={row1} direction="left" speed={35} hoveredTech={hoveredTech} setHoveredTech={setHoveredTech} isPaused={!isInView} />
          <TechMarquee items={row2} direction="right" speed={40} hoveredTech={hoveredTech} setHoveredTech={setHoveredTech} isPaused={!isInView} />
          <TechMarquee items={row3} direction="left" speed={35} hoveredTech={hoveredTech} setHoveredTech={setHoveredTech} isPaused={!isInView} />
        </div>
      </div>
    </section>
  );
}
