import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getWakatimeData } from '../../services/wakatimeService';

// Tive a ideia de fazer as logos terem fisica e cairem nessa "caixa" onde alguns teriam um tamanho maior e outros
// um tamanho menor, o texto ficaria mais centralizado com algum efeito para passar uma experiencia bem diferente
// para todo mundo, alem disso ficou faltando coisas para colocar, ja usei muita coisa e quero que o tech stack
// mostre isso, sccs, windows, linux, casaOS, postman, dbeaver, MySQL, SQLite, já mechi com firewall sistema de cameras
// mas ai já não sei se estou perdendo o foco, me diz ai o que poderia ser retirado que não faz muito sentido
// com o que estou tendo no site no momento, pois quero tirar esse grid chato que todo o site tem, e transformar em algo
// melhor para o usuario, pois ele nao vai olhar um por um, essa seção mostra eles bagunçados, mas caso o usuario
// queria ver eles organizados vamos ter que colocar um botão para ajsutar eles não acha? o site precisa ser bonito
// mas precisa ser entendivel tambem, penso nesse site mais como um portfolio para trabalhos freelancer do que um emprego
// o que acha que podemos fazer com tudo isso que te falei? tem melhorias ideias melhores? as vezes melhorias
// com base em sites ja reconehcidos, me reotrna ai o que vc acha.

// PS: se for falar de bibliotecas então dá pra usar GSAP e um monte para framer motion, tem o thre js drei tambem, varias varias

const technologies = [
  { id: 'js', name: 'JavaScript', color: '#f1e05a', icon: 'javascript' },
  { id: 'ts', name: 'TypeScript', color: '#3178c6', icon: 'typescript' },
  { id: 'react', name: 'React', color: '#61DAFB', icon: 'react' },
  { id: 'react-native', name: 'React Native', color: '#61DAFB', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { id: 'angular', name: 'Angular', color: '#DD0031', icon: 'angular' },
  { id: 'svelte', name: 'Svelte', color: '#ff3e00', icon: 'svelte' },
  { id: 'astro', name: 'Astro', color: '#ff5a03', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/astro/astro-original.svg' },
  { id: 'java', name: 'Java', color: '#b07219', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { id: 'spring', name: 'Spring Boot', color: '#6db33f', icon: 'springboot' },
  { id: 'quarkus', name: 'Quarkus', color: '#4795EB', icon: 'quarkus' },
  { id: 'micronaut', name: 'Micronaut', color: '#ffffff', customImg: 'https://www.google.com/s2/favicons?sz=128&domain=micronaut.io' },
  { id: 'python', name: 'Python', color: '#3572A5', icon: 'python' },
  { id: 'csharp', name: 'C#', color: '#178600', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' },
  { id: 'cpp', name: 'C++', color: '#f34b7d', icon: 'cplusplus' },
  { id: 'swift', name: 'Swift', color: '#F05138', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg' },
  { id: 'swiftui', name: 'SwiftUI', color: '#007AFF', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg' },
  { id: 'flutter', name: 'Flutter', color: '#02569B', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
  { id: 'nodejs', name: 'Node.js', color: '#339933', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { id: 'postgresql', name: 'PostgreSQL', color: '#4169E1', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { id: 'tailwind', name: 'Tailwind CSS', color: '#06B6D4', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { id: 'git', name: 'Git', color: '#F05032', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { id: 'html', name: 'HTML5', color: '#e34c26', icon: 'html5' },
  { id: 'css', name: 'CSS3', color: '#1572B6', customImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { id: 'docker', name: 'Docker', color: '#2496ED', icon: 'docker' },
];

const TechCard = ({ tech, wakaData }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Busca os dados dessa tecnologia específica no JSON do WakaTime (ignorando maiúsculas)
  const stats = wakaData?.find(w => 
    w.name.toLowerCase() === tech.name.toLowerCase() || 
    w.name.toLowerCase() === tech.id.toLowerCase()
  );

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Grid MENORES: padding reduzido (p-4)
      className="relative flex flex-col items-center justify-center p-4 md:p-5 rounded-2xl bg-[#0a0a0a] border border-white/5 cursor-pointer overflow-hidden group"
      // Aqui colocamos o glow de borda interno estilo Apple Intelligence
      animate={{
        boxShadow: isHovered 
          ? `inset 0 0 60px -10px ${tech.color}40, inset 0 0 10px 1px ${tech.color}80, 0 0 20px -5px ${tech.color}30` 
          : 'inset 0 0 0px 0px rgba(0,0,0,0), 0 0 0px 0px rgba(0,0,0,0)'
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Imagem SVG carregada diretamente do SimpleIcons ou de um Custom URL */}
      <img 
        src={tech.customImg ? tech.customImg : `https://cdn.simpleicons.org/${tech.icon}/${tech.color.replace('#', '')}`}
        alt={tech.name}
        // Icones menores: w-8 h-8 ao invés de w-16
        className="w-8 h-8 md:w-10 md:h-10 object-contain mb-3 transition-all duration-500 ease-out z-10"
        style={{
          // Se for o Micronaut (que tem o ID branco/preto do SVGL), aplicamos um brilho branco intenso no hover para não sumir
          filter: isHovered 
            ? `grayscale(0) brightness(1) drop-shadow(0 0 16px ${tech.color}90)` 
            : (tech.id === 'micronaut' 
                ? 'grayscale(1) brightness(0.6) drop-shadow(0 0 0px transparent)' 
                : 'grayscale(1) brightness(0.3) drop-shadow(0 0 0px transparent)')
        }}
      />
      
      {/* Nome da Tecnologia */}
      <span 
        // Fonte menor text-[10px]
        className="font-['Inter'] font-semibold text-[10px] md:text-xs tracking-wide text-center transition-colors duration-300 z-10"
        style={{ color: isHovered ? '#ffffff' : '#555555' }}
      >
        {tech.name}
      </span>

      {/* INTEGRAÇÃO WAKATIME: Mostra a porcentagem de uso se existir no JSON */}
      {stats && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          className="absolute top-2 right-2 text-[8px] md:text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-black/80 border border-white/10 text-white z-20 backdrop-blur-sm"
          style={{ color: tech.color }}
        >
          {stats.percent.toFixed(1)}%
        </motion.div>
      )}

      {/* Fundo leve que preenche a caixa no hover para dar contraste extra */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at center, ${tech.color}15 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0 
        }}
      />
    </motion.div>
  );
};

export default function TechSection() {
  const [wakaLanguages, setWakaLanguages] = useState([]);

  // Carrega os dados do WakaTime ao iniciar a seção
  useEffect(() => {
    getWakatimeData().then(data => {
      if (data && data.languages) {
        setWakaLanguages(data.languages);
      }
    });
  }, []);

  return (
    <section 
      id="tech" 
      className="relative w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center py-32 px-6 pointer-events-auto"
    >
      <div className="max-w-6xl w-full">
        
        {/* CABEÇALHO */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-[14vw] md:text-[8vw] font-['Anton'] leading-none text-white tracking-tighter uppercase mb-6">
            THE ARSENAL
          </h2>
          <p className="text-zinc-400 font-['Inter'] text-lg md:text-xl max-w-2xl leading-relaxed">
            As ferramentas, linguagens e frameworks que eu utilizo para transformar ideias complexas em experiências digitais escaláveis e premiadas.
          </p>
        </div>

        {/* BENTO GRID DE LOGOS MAIS COMPACTO E FUNCIONAL */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
          {technologies.map((tech) => (
            <TechCard key={tech.id} tech={tech} wakaData={wakaLanguages} />
          ))}
        </div>

      </div>
    </section>
  );
}
