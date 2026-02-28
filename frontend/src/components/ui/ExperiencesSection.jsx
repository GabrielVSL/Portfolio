import { useState } from 'react';

export default function ExperiencesSection({ section }) {
  const sections = ['home', 'projetos', 'sobre', 'experiencias', 'contato'];
  const currentIndex = sections.indexOf(section);
  const myIndex = 3; 

  // Estados: Idioma, Animação de Troca e Scroll da Timeline
  const [lang, setLang] = useState('pt');
  const [isFading, setIsFading] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Função do Scroll para preencher a linha do tempo
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll <= 0) return;
    
    // Calcula a porcentagem do scroll
    const progress = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 120));
    setScrollProgress(progress);
  };

  // Função para trocar o idioma com animação holográfica
  const handleLangChange = (newLang) => {
    if (newLang === lang) return;
    setIsFading(true); 
    setTimeout(() => {
      setLang(newLang);
      setIsFading(false);
    }, 400);
  };

  let positionClass = 'translate-x-[100vw] opacity-0 pointer-events-none';
  if (currentIndex === myIndex) positionClass = 'translate-x-0 opacity-100 pointer-events-auto';
  else if (currentIndex > myIndex) positionClass = '-translate-x-[100vw] opacity-0 pointer-events-none';

  // Dicionário de Textos (Português / Inglês)
  const content = {
    pt: {
      title: "Trajetória",
      exp1: {
        title: "Técnico em Informática / Dev",
        subtitle: "Colégio São Paulo da Cruz",
        status: "Atual",
        desc: <>Gerenciamento completo da infraestrutura de laboratórios e servidores. Atuação forte em automação de processos utilizando <span className="text-[#0077ff] font-medium">PowerShell</span> para administração de contas e permissões no Microsoft 365. Configuração e manutenção de servidores Linux (<span className="text-[#0077ff] font-medium">Ubuntu Server, CasaOS</span>) para backup e serviços de mídia. Além da infraestrutura, atuo no desenvolvimento de soluções Web, como o portal educacional utilizando <span className="text-[#0077ff] font-medium">React, HTML e integrações via JSON</span>.</>
      },
      exp2: {
        title: "Engenharia de Software",
        subtitle: "PUC Minas",
        status: "Graduação em Andamento",
        desc: <>Desenvolvimento de base sólida em arquitetura de software e engenharia de requisitos. Foco aplicado em Algoritmos e Estruturas de Dados Avançadas (AEDS II), com implementações complexas utilizando linguagens de baixo nível, além de projetos Full Stack explorando o ecossistema <span className="text-[#0077ff] font-medium">C# / .NET</span>.</>
      }
    },
    en: {
      title: "Journey",
      exp1: {
        title: "IT Support / Dev Intern",
        subtitle: "Colégio São Paulo da Cruz",
        status: "Current",
        desc: <>Complete management of laboratory and server infrastructure. Strong focus on process automation using <span className="text-[#0077ff] font-medium">PowerShell</span> for account and permission administration in Microsoft 365. Configuration and maintenance of Linux servers (<span className="text-[#0077ff] font-medium">Ubuntu Server, CasaOS</span>) for backup and media services. Besides infrastructure, I work on Web development solutions, such as the educational portal using <span className="text-[#0077ff] font-medium">React, HTML, and JSON integrations</span>.</>
      },
      exp2: {
        title: "Software Engineering",
        subtitle: "PUC Minas",
        status: "Ongoing Degree",
        desc: <>Development of a solid foundation in software architecture and requirements engineering. Applied focus on Advanced Algorithms and Data Structures (AEDS II), with complex implementations using low-level languages, as well as Full Stack projects exploring the <span className="text-[#0077ff] font-medium">C# / .NET</span> ecosystem.</>
      }
    }
  };

  const t = content[lang];

  // Configuração das Experiências (Com o "trigger" de rolagem)
  const experiencesData = [
    { ...t.exp1, trigger: 0 },   // Acende imediatamente
    { ...t.exp2, trigger: 40 }   // Acende ao rolar 40% da tela
  ];

  // Classe dinâmica do holograma
  const fadeClass = `transition-all duration-400 ease-in-out ${
    isFading ? 'opacity-0 translate-y-4 blur-sm scale-[0.99]' : 'opacity-100 translate-y-0 blur-0 scale-100'
  }`;

  return (
    <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${positionClass}`}>
      
      {/* Título de Fundo Gigante */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[10vw] md:text-[12vw] font-black text-white/[0.02] tracking-[0.4em] whitespace-nowrap">EXPERIÊNCIA</h2>
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

        {/* TIMELINE DE EXPERIÊNCIAS */}
        <div className={`max-w-6xl mx-auto px-8 ${fadeClass}`}>
          <div className="relative pl-6 space-y-12 md:space-y-16 pb-12 w-full lg:w-3/4">
            
            {/* LINHA DE FUNDO (Apagada) */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-800/60"></div>
            
            {/* LINHA PREENCHIDA ANIMADA (Azul) */}
            <div 
              className="absolute left-0 top-0 w-[2px] bg-[#0077ff] shadow-[0_0_12px_#0077ff] transition-all duration-300 ease-out z-0"
              style={{ height: `${scrollProgress}%` }}
            ></div>

            {/* Mapeando os itens de experiência */}
            {experiencesData.map((exp, idx) => {
              const isActive = scrollProgress >= exp.trigger;

              return (
                <div key={idx} className="relative pl-8 md:pl-12 group cursor-pointer z-10">
                  
                  {/* PONTO DA TIMELINE */}
                  <div className={`absolute -left-[29px] top-8 h-3 w-3 rounded-full transition-all duration-500 ${
                    isActive 
                      ? 'bg-[#0077ff] shadow-[0_0_15px_#0077ff] scale-125' 
                      : 'bg-zinc-800 border-2 border-zinc-700'
                  }`}></div>
                  
                  {/* CARTÃO DE VIDRO */}
                  <div className={`p-6 md:p-8 rounded-xl backdrop-blur-md transition-all duration-700 ${
                    isActive 
                      ? 'bg-[#050505]/80 border border-[#0077ff]/30 shadow-lg' 
                      : 'bg-[#050505]/40 border border-white/5'
                  }`}>
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                      <h3 className={`text-xl md:text-2xl tracking-[0.2em] font-light uppercase transition-colors duration-500 ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                        {exp.title}
                      </h3>
                    </div>
                    
                    <h4 className={`text-xs md:text-sm tracking-[0.2em] font-light uppercase mb-6 transition-colors duration-500 ${isActive ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      {exp.subtitle} <span className="text-[#0077ff]/50 mx-2">|</span> <span className={isActive ? "text-[#0077ff]" : ""}>{exp.status}</span>
                    </h4>
                    
                    <p className="text-zinc-400 font-light tracking-widest text-sm md:text-base leading-relaxed text-justify md:text-left">
                      {exp.desc}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </div>
  );
}