import { useState } from 'react';

export default function ExperiencesSection({ section }) {
  const sections = ['home', 'projetos', 'sobre', 'experiencias', 'contato'];
  const currentIndex = sections.indexOf(section);
  const myIndex = 3; 

  // Estados: Idioma, Animação de Troca e Scroll da Timeline
  const [lang, setLang] = useState('pt');
  const [isFading, setIsFading] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Função do Scroll corrigida (O scrollProgress SÓ AUMENTA)
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll <= 0) return;
    
    // Calcula a porcentagem do scroll e mantém sempre o maior valor
    const progress = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 120));
    setScrollProgress(prev => Math.max(prev, progress));
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

  // Dicionário de Textos atualizado com as novas experiências e datas
  const content = {
    pt: {
      title: "Trajetória",
      exp1: {
        title: "Técnico em Informática / Dev",
        subtitle: "Colégio São Paulo da Cruz",
        date: "Fev 2025 - Atual",
        desc: <>Gerenciamento completo da infraestrutura de laboratórios, servidores e suporte técnico aos usuários. Atuação forte em automação de processos utilizando <span className="text-[#0077ff] font-medium">PowerShell</span> para administração no Microsoft 365 e manutenção de servidores Linux. Além da infraestrutura, atuo no desenvolvimento de soluções Web, como portais educacionais utilizando <span className="text-[#0077ff] font-medium">React, HTML e integrações JSON</span>.</>
      },
      exp2: {
        title: "Monitor de Desenvolvimento Web",
        subtitle: "PUC Minas",
        date: "Ago 2025 - Dez 2025 (6 meses)",
        desc: <>Atuação como monitor da disciplina de Desenvolvimento de Interfaces Web (Semestre 2/2025). Auxílio direto aos alunos na compreensão e aplicação prática de tecnologias fundamentais e frameworks modernos. Foco em mentoria técnica, revisão de código e apoio na construção de interfaces responsivas, acessíveis e componentizadas.</>
      }
    },
    en: {
      title: "Journey",
      exp1: {
        title: "IT Support / Dev Intern",
        subtitle: "Colégio São Paulo da Cruz",
        date: "Feb 2025 - Present",
        desc: <>Complete management of laboratory infrastructure, servers, and technical support. Strong focus on process automation using <span className="text-[#0077ff] font-medium">PowerShell</span> for Microsoft 365 administration and Linux server maintenance. Besides infrastructure, I work on Web development solutions, such as educational portals using <span className="text-[#0077ff] font-medium">React, HTML, and JSON integrations</span>.</>
      },
      exp2: {
        title: "Web Development Teaching Assistant",
        subtitle: "PUC Minas",
        date: "Aug 2025 - Dec 2025 (6 months)",
        desc: <>Acted as a Teaching Assistant for the Web Interfaces Development course. Provided direct support to students in understanding and applying fundamental technologies and modern frameworks. Focused on technical mentoring, code review, and support in building responsive, accessible, and componentized interfaces.</>
      }
    }
  };

  const t = content[lang];

  // Configuração das Experiências (Ajustei os triggers para caberem 4 itens)
  const experiencesData = [
    { ...t.exp1, trigger: 0 },   
    { ...t.exp2, trigger: 25 }   
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
        className="relative z-10 w-full h-full overflow-y-auto pb-32 scroll-smooth custom-scrollbar"
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
                      : 'bg-[#050505]/40 border border-white/5 opacity-50'
                  }`}>
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                      <h3 className={`text-xl md:text-2xl tracking-[0.2em] font-light uppercase transition-colors duration-500 ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                        {exp.title}
                      </h3>
                    </div>
                    
                    {/* AQUI ESTÁ A DATA E O LOCAL */}
                    <h4 className={`text-[10px] md:text-xs tracking-[0.2em] font-light uppercase mb-6 transition-colors duration-500 ${isActive ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      {exp.subtitle} <span className="text-[#0077ff]/50 mx-2">|</span> <span className={isActive ? "text-[#0077ff]" : ""}>{exp.date}</span>
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
        
        <div className="h-[20vh] w-full pointer-events-none"></div>
      </div>
    </div>
  );
}