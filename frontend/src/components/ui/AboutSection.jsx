import { useState } from 'react';

export default function AboutSection({ section }) {
  const sections = ['home', 'projetos', 'sobre', 'experiencias', 'contato'];
  const currentIndex = sections.indexOf(section);
  const myIndex = 2; 

  // Estados
  const [lang, setLang] = useState('pt');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFading, setIsFading] = useState(false); // NOVO: Controla a animação de troca

  // Função para trocar idioma com animação holográfica
  const handleLangChange = (newLang) => {
    if (newLang === lang) return; // Não faz nada se já estiver no idioma
    
    // 1. Inicia o desfoque e fade-out
    setIsFading(true); 
    
    // 2. Espera a animação terminar (400ms) para trocar o texto e trazer de volta
    setTimeout(() => {
      setLang(newLang);
      setIsFading(false);
    }, 400);
  };

  // Função do Scroll da Infraestrutura
  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    if (scrollTop > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  let positionClass = 'translate-x-[100vw] opacity-0 pointer-events-none';
  if (currentIndex === myIndex) positionClass = 'translate-x-0 opacity-100 pointer-events-auto';
  else if (currentIndex > myIndex) positionClass = '-translate-x-[100vw] opacity-0 pointer-events-none';

  // Textos
  const content = {
    pt: {
      title: "Quem Sou Eu",
      subtitle: "Desenvolvedor • Analista de Infra • Tech Entusiasta",
      p1: <>Sou estudante de <strong className="text-white font-normal">Engenharia de Software na PUC Minas</strong> e atualmente atuo na área de Suporte de TI e Desenvolvimento. Minha trajetória é marcada por uma paixão dupla: entender como as máquinas funcionam no baixo nível e construir soluções modernas na web.</>,
      p2: <>No dia a dia, gerencio infraestruturas de servidores e automatizo processos complexos. Ao mesmo tempo, dou vida a aplicações completas, fluindo entre o front-end com <span className="text-[#0077ff] font-medium">React e Tailwind CSS</span> e a robustez do back-end utilizando <span className="text-[#0077ff] font-medium">C# e .NET</span>.</>,
      p3: "Fora do terminal e das IDEs, sou um aficionado por montagem e otimização de hardware (PC Building) e dedico meu tempo livre a jogos competitivos e de sobrevivência. Acredito que a tecnologia deve ser tanto performática quanto visualmente impactante.",
      stackTitle: "Stack Principal",
      infraTitle: "Infra & Tools"
    },
    en: {
      title: "About Me",
      subtitle: "Developer • Infra Analyst • Tech Enthusiast",
      p1: <>I am a <strong className="text-white font-normal">Software Engineering student at PUC Minas</strong>, currently working in IT Support and Development. My journey is driven by a dual passion: understanding how machines work at a low level and building modern web solutions.</>,
      p2: <>On a daily basis, I manage server infrastructures and automate complex processes. At the same time, I bring full applications to life, flowing between the front-end with <span className="text-[#0077ff] font-medium">React and Tailwind CSS</span> and the robustness of the back-end using <span className="text-[#0077ff] font-medium">C# and .NET</span>.</>,
      p3: "Outside the terminal and IDEs, I'm an aficionado for hardware assembly and optimization (PC Building), and I spend my free time on competitive and survival games. I believe technology should be both performant and visually impactful.",
      stackTitle: "Main Stack",
      infraTitle: "Infra & Tools"
    }
  };

  const t = content[lang];

  // Classe dinâmica que aplica a animação holográfica no texto
  const fadeClass = `transition-all duration-400 ease-in-out ${
    isFading ? 'opacity-0 translate-y-4 blur-sm scale-[0.99]' : 'opacity-100 translate-y-0 blur-0 scale-100'
  }`;

  return (
    <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${positionClass}`}>
      
      {/* Título de Fundo Gigante (Mantido estático e fora da animação) */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[12vw] font-black text-white/[0.02] tracking-[0.4em] whitespace-nowrap">SOBRE MIM</h2>
      </div>

      <div 
        className="relative z-10 w-full h-full overflow-y-auto pb-32 scroll-smooth"
        onScroll={handleScroll}
      >
        <div className="h-[15vh] w-full pointer-events-none"></div>

        {/* HEADER: Título e Botões de Idioma */}
        <div className="max-w-6xl mx-auto px-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className={fadeClass}>
            <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.3em] text-white uppercase border-l-2 border-[#0077ff] pl-6 transition-all duration-500">
              {t.title}
            </h2>
            <p className="mt-4 text-zinc-500 tracking-[0.2em] text-xs md:text-sm font-light uppercase pl-6 transition-all duration-500">
              {t.subtitle}
            </p>
          </div>
          
          {/* Seletor de Idioma */}
          <div className="flex items-center gap-4 text-xs tracking-[0.3em] font-light pl-6 md:pl-0 z-20">
            <button 
              onClick={() => handleLangChange('pt')} 
              className={`transition-all duration-300 ${lang === 'pt' ? 'text-[#0077ff] font-bold drop-shadow-[0_0_8px_rgba(0,119,255,0.6)]' : 'text-zinc-500 hover:text-white'}`}
            >
              PT
            </button>
            <span className="text-zinc-700">/</span>
            <button 
              onClick={() => handleLangChange('en')} 
              className={`transition-all duration-300 ${lang === 'en' ? 'text-[#0077ff] font-bold drop-shadow-[0_0_8px_rgba(0,119,255,0.6)]' : 'text-zinc-500 hover:text-white'}`}
            >
              EN
            </button>
          </div>
        </div>

        {/* GRID DE CONTEÚDO (Envolvido na animação de fade) */}
        <div className={`max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 ${fadeClass}`}>
          
          {/* COLUNA ESQUERDA: Texto */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-8 md:p-10 rounded-2xl bg-[#050505]/60 backdrop-blur-md border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] group hover:border-[#0077ff]/30 transition-colors duration-500">
              <p className="text-zinc-400 font-light tracking-widest text-sm md:text-base leading-relaxed text-justify mb-6">
                {t.p1}
              </p>
              <p className="text-zinc-400 font-light tracking-widest text-sm md:text-base leading-relaxed text-justify mb-6">
                {t.p2}
              </p>
              <p className="text-zinc-400 font-light tracking-widest text-sm md:text-base leading-relaxed text-justify">
                {t.p3}
              </p>
            </div>
          </div>

          {/* COLUNA DIREITA: Skills */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="p-8 rounded-2xl bg-[#050505]/40 backdrop-blur-md border border-white/5 group hover:border-[#0077ff]/20 transition-colors duration-500">
              <h3 className="text-white text-sm tracking-[0.3em] font-medium uppercase mb-6 flex items-center gap-3">
                <span className="w-2 h-2 bg-[#0077ff] rounded-full shadow-[0_0_8px_#0077ff]"></span>
                {t.stackTitle}
              </h3>
              <div className="flex flex-wrap gap-3">
                {['React', 'Tailwind CSS', 'C#', '.NET', 'JavaScript', 'HTML/CSS', 'SQL', 'C / C++'].map((skill, i) => (
                  <span key={i} className="px-4 py-2 text-xs font-light tracking-widest text-zinc-400 uppercase border border-zinc-800 rounded-full hover:border-[#0077ff] hover:text-[#0077ff] hover:shadow-[0_0_15px_rgba(0,119,255,0.2)] transition-all duration-300 cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className={`p-8 rounded-2xl bg-[#050505]/40 backdrop-blur-md transition-all duration-700 ${isScrolled ? 'border border-[#0077ff]/30 shadow-[0_0_20px_rgba(0,119,255,0.05)]' : 'border border-white/5'}`}>
              <h3 className="text-white text-sm tracking-[0.3em] font-medium uppercase mb-6 flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full transition-all duration-700 ${isScrolled ? 'bg-[#0077ff] shadow-[0_0_8px_#0077ff]' : 'bg-zinc-600'}`}></span>
                {t.infraTitle}
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Ubuntu Server', 'CasaOS', 'PowerShell', 'Microsoft 365', 'Git', 'Hardware Setup'].map((tool, i) => (
                  <span key={i} className={`px-4 py-2 text-xs font-light tracking-widest uppercase border rounded-full transition-all duration-700 cursor-default ${
                    isScrolled 
                      ? 'border-zinc-800 text-zinc-400 hover:border-[#0077ff] hover:text-[#0077ff] hover:shadow-[0_0_15px_rgba(0,119,255,0.2)]'
                      : 'border-zinc-800/50 text-zinc-500 hover:border-zinc-500 hover:text-white'
                  }`}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}