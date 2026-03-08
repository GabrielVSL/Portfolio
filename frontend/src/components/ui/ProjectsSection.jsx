import { useState } from 'react';

export default function ProjectsSection({ section }) {
  const sections = ['home', 'projetos', 'sobre', 'experiencias', 'contato'];
  const currentIndex = sections.indexOf(section);
  const myIndex = 1; 

  const [scrollProgress, setScrollProgress] = useState(0);

  let positionClass = 'translate-x-[100vw] opacity-0 pointer-events-none';
  if (currentIndex === myIndex) positionClass = 'translate-x-0 opacity-100 pointer-events-auto';
  else if (currentIndex > myIndex) positionClass = '-translate-x-[100vw] opacity-0 pointer-events-none';

  // O scrollProgress SÓ AUMENTA para garantir que os projetos não voltem a ficar transparentes
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll <= 0) return;
    
    const progress = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 110));
    setScrollProgress(prev => Math.max(prev, progress)); 
  };

  const projectsData = [
    {
      id: 'orderly',
      tag: "FULLSTACK",
      title: "Orderly - Sistema de Pedidos",
      tech: ["Node.js", "Express", "React", "PostgreSQL"],
      gif: "/orderly.gif",
      trigger: 0,
      fullDescription: "Uma aplicação Fullstack robusta construída com arquitetura de componentes reutilizáveis. O backend em Node/Express gerencia as rotas e a persistência de dados no PostgreSQL via Sequelize. No frontend, a Context API do React atua como a única fonte da verdade para o estado do carrinho, garantindo uma sincronização perfeita entre os componentes.",
      linkSite: "https://orderly-online.vercel.app/",
      linkGithub: "https://github.com/GabrielVSL/Orderly"
    },
    {
      id: 'bhflix',
      tag: "FRONTEND AVANÇADO",
      title: "BHFlix",
      tech: ["React", "Vite", "Tailwind", "TMDB API"],
      gif: "/bhflix.gif",
      trigger: 30,
      fullDescription: "Catálogo de mídia com interface Dark Mode Premium. Implementa chamadas assíncronas avançadas usando um Backend For Frontend (BFF) na Vercel para mascarar chaves de API. Inclui um sistema de 'Minha Lista' utilizando o localStorage do navegador para persistência de dados sem necessidade de banco de dados, além de uma busca inteligente com técnica de Debounce.",
      linkSite: "https://bhflix.vercel.app/",
      linkGithub: "https://github.com/GabrielVSL/BHFlix"
    },
    {
      id: 'cspc',
      tag: "DESENVOLVIMENTO WEB",
      title: "Portal CSPC",
      tech: ["React", "Tailwind CSS", "JSON"],
      gif: "/cspc.gif",
      trigger: 60,
      fullDescription: "Um portal interativo focado na usabilidade de estudantes. O projeto substitui o hardcoding tradicional por uma arquitetura flexível baseada na leitura de arquivos JSON, permitindo que a equipe pedagógica adicione novos jogos e ferramentas educacionais sem precisar alterar o código-fonte da aplicação principal.",
      linkSite: "https://jogos-cspc.vercel.app/",
      linkGithub: "https://github.com/GabrielVSL/InformaticaCSPC"
    },
    {
      id: 'clearpath',
      tag: "DESENVOLVIMENTO MOBILE",
      title: "ClearPath & Swift Core",
      tech: ["Swift", "iOS", "Node-RED", "REST API"],
      gif: "/clearpath.gif",
      trigger: 90,
      isMobile: true,
      fullDescription: "Um combo demonstrando proficiência no ecossistema Apple. Desenvolvido no HackaTruck, o ClearPath é um app nativo iOS focado em gamificação para ajudar fumantes, com backend em Node-RED. Adicionalmente, apresento meu repositório core de Swift, que contém algoritmos avançados, comprovando domínio não apenas em frameworks, mas na base da tecnologia.",
      linkSite: "#",
      linkGithub: "https://github.com/GabrielVSL/ClearPath", 
      linkGithub2: "https://github.com/GabrielVSL/CodigosSwift"
    }
  ];

  return (
    <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${positionClass}`}>
      
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[12vw] font-black text-white/[0.02] tracking-[0.4em] whitespace-nowrap">PROJETOS</h2>
      </div>

      <div className="relative z-10 w-full h-full overflow-y-auto pb-32 scroll-smooth custom-scrollbar" onScroll={handleScroll}>
        <div className="h-[15vh] w-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-8 mb-16">
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.3em] text-white uppercase border-l-2 border-[#0077ff] pl-6">
            Meus Projetos
          </h2>
          <p className="mt-4 text-zinc-500 tracking-[0.2em] text-xs md:text-sm font-light uppercase pl-6">
            Fullstack • Mobile • Frontend • Infra
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-8 relative">
          
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-zinc-800/60 z-0"></div>
          
          <div 
            className="absolute left-6 top-0 w-[2px] bg-[#0077ff] shadow-[0_0_12px_#0077ff] transition-all duration-300 ease-out z-0"
            style={{ height: `${scrollProgress}%` }}
          ></div>

          <div className="space-y-20 relative z-10 pb-12">
            {projectsData.map((proj) => {
              const isActive = scrollProgress >= proj.trigger;

              return (
                <div key={proj.id} className="relative pl-12 group">
                  
                  <div className={`absolute left-[15px] top-10 h-3 w-3 rounded-full transition-all duration-500 z-20 ${
                    isActive ? 'bg-[#0077ff] shadow-[0_0_15px_#0077ff] scale-125' : 'bg-zinc-800 border-2 border-zinc-700'
                  }`}></div>
                  
                  <div className={`p-6 md:p-8 rounded-2xl border backdrop-blur-md transition-all duration-700 ease-in-out ${
                    isActive 
                      ? 'bg-[#050505]/80 border-[#0077ff]/30 shadow-2xl translate-x-0 opacity-100' 
                      : 'bg-[#050505]/40 border-white/5 translate-x-4 opacity-50 pointer-events-none'
                  }`}>
                    
                    {/* AQUI ESTÁ A CORREÇÃO MÁGICA: xl:items-center em vez de xl:items-stretch */}
                    <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 xl:items-center">
                      
                      {/* LADO ESQUERDO: Imagem / GIF (Proporções perfeitamente respeitadas) */}
                      <div className={`relative rounded-xl overflow-hidden border transition-all duration-700 flex-shrink-0 ${
                        isActive ? 'border-[#0077ff]/40 shadow-[0_0_20px_rgba(0,119,255,0.1)]' : 'border-white/5'
                      } ${
                        proj.isMobile 
                          ? 'w-1/2 md:w-1/3 xl:w-[28%] aspect-[9/16] mx-auto xl:mx-0 bg-black' 
                          : 'w-full xl:w-1/2 aspect-video bg-zinc-950'
                      }`}>
                        <img 
                          src={proj.gif} 
                          alt={proj.title} 
                          className={`w-full h-full transition-opacity duration-500 opacity-80 group-hover:opacity-100 ${proj.isMobile ? 'object-contain' : 'object-cover'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 pointer-events-none"></div>
                      </div>

                      {/* LADO DIREITO: Tudo integrado */}
                      <div className="flex-1 text-white flex flex-col justify-center py-2">
                        
                        <div>
                          <span className="text-[#0077ff] text-xs tracking-[0.2em] font-bold mb-2 block">
                            {proj.tag}
                          </span>
                          <h3 className="text-2xl md:text-3xl tracking-[0.2em] font-light uppercase text-white mb-6">
                            {proj.title}
                          </h3>
                          <p className="text-zinc-400 font-light tracking-wide text-sm leading-relaxed text-justify mb-8">
                            {proj.fullDescription}
                          </p>
                        </div>
                        
                        <div className="mt-auto border-t border-white/5 pt-6 flex flex-col gap-6">
                          
                          <div className="flex flex-wrap gap-2">
                            {proj.tech.map((item, i) => (
                              <span key={i} className="bg-white/5 border border-white/10 text-zinc-300 px-3.5 py-1.5 rounded-md text-[10px] md:text-xs tracking-widest uppercase font-medium">
                                {item}
                              </span>
                            ))}
                          </div>

                          <div className="flex flex-wrap sm:flex-nowrap gap-4">
                            
                            {proj.linkSite && proj.linkSite !== "#" && (
                              <a href={proj.linkSite} target="_blank" rel="noreferrer" className="bg-[#0077ff] hover:bg-blue-600 text-white text-[10px] md:text-xs tracking-widest uppercase px-6 py-3.5 rounded-lg transition-colors text-center font-bold flex-1">
                                <i className="fas fa-external-link-alt mr-2"></i> Testar App
                              </a>
                            )}
                            
                            <a href={proj.linkGithub} target="_blank" rel="noreferrer" className="bg-transparent hover:bg-white/5 border border-white/20 text-white text-[10px] md:text-xs tracking-widest uppercase px-6 py-3.5 rounded-lg transition-colors text-center flex-1 whitespace-nowrap">
                              <i className="fab fa-github mr-2"></i> {proj.linkGithub2 ? 'App GitHub' : 'Ver Código'}
                            </a>

                            {proj.linkGithub2 && (
                              <a href={proj.linkGithub2} target="_blank" rel="noreferrer" className="bg-transparent hover:bg-white/5 border border-white/20 text-white text-[10px] md:text-xs tracking-widest uppercase px-6 py-3.5 rounded-lg transition-colors text-center flex-1 whitespace-nowrap">
                                <i className="fab fa-swift mr-2 text-orange-500"></i> Swift Repo
                              </a>
                            )}
                            
                          </div>
                        </div>

                      </div>
                    </div>
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