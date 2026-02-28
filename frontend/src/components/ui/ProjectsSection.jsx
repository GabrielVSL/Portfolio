import { useState } from 'react';

export default function ProjectsSection({ section }) {
  const sections = ['home', 'projetos', 'sobre', 'experiencias', 'contato'];
  const currentIndex = sections.indexOf(section);
  const myIndex = 1; 

  // Estado que guarda a porcentagem (0 a 100) da rolagem da tela
  const [scrollProgress, setScrollProgress] = useState(0);

  let positionClass = 'translate-x-[100vw] opacity-0 pointer-events-none';
  if (currentIndex === myIndex) positionClass = 'translate-x-0 opacity-100 pointer-events-auto';
  else if (currentIndex > myIndex) positionClass = '-translate-x-[100vw] opacity-0 pointer-events-none';

  // Função que calcula o scroll e preenche a linha
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll <= 0) return;
    
    // Multiplicamos por 110 para garantir que a linha complete um pouquinho antes do usuário chegar no fundo absoluto
    const progress = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 110));
    setScrollProgress(progress);
  };

  // Array de projetos para limpar o código. Cada um tem um "trigger" (% de scroll para acender)
  const projectsData = [
    {
      tag: "DESTAQUE",
      title: "Portal Educacional CSPC",
      desc: "Desenvolvimento de uma plataforma interativa para alunos, focada em centralizar o acesso a ferramentas educacionais e jogos lúdicos, consumindo dados dinamicamente.",
      tech: "React • Tailwind CSS • JSON",
      gif: "[ GIF Portal Educacional ]",
      trigger: 0 // Acende imediatamente no topo
    },
    {
      tag: "SISTEMAS & REDES",
      title: "Infra & Automação",
      desc: "Implantação de servidores Linux locais e criação de scripts de automação robustos para gerenciamento em massa de permissões e usuários em ambientes Microsoft 365.",
      tech: "Ubuntu Server • CasaOS • PowerShell",
      gif: "[ GIF Infraestrutura ]",
      trigger: 35 // Acende quando passar de 35%
    },
    {
      tag: "ALGORITMOS",
      title: "Estruturas de Dados",
      desc: "Implementações acadêmicas de alta complexidade focadas em performance, explorando ordenação de dados estruturados e manipulação de memória.",
      tech: "C / C++ • Árvores Binárias • Sort",
      gif: "[ GIF AEDS II ]",
      trigger: 75 // Acende quando passar de 75%
    }
  ];

  return (
    <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${positionClass}`}>
      
      {/* Título de Fundo Gigante (Marca D'água) */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[12vw] font-black text-white/[0.02] tracking-[0.4em] whitespace-nowrap">PROJETOS</h2>
      </div>

      {/* Adicionado onScroll aqui para escutar a rolagem! */}
      <div 
        className="relative z-10 w-full h-full overflow-y-auto pb-32 scroll-smooth"
        onScroll={handleScroll}
      >
        <div className="h-[15vh] w-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-8 mb-16">
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.3em] text-white uppercase border-l-2 border-[#0077ff] pl-6">
            Meus Projetos
          </h2>
          <p className="mt-4 text-zinc-500 tracking-[0.2em] text-xs md:text-sm font-light uppercase pl-6">
            Desenvolvimento Web • Infraestrutura • Algoritmos
          </p>
        </div>

        {/* CONTAINER DA TIMELINE */}
        <div className="max-w-6xl mx-auto px-8">
          
          <div className="relative pl-6 space-y-24 pb-12">
            
            {/* LINHA DE FUNDO (Apagada) */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-800/60"></div>
            
            {/* LINHA PREENCHIDA ANIMADA (Azul) */}
            <div 
              className="absolute left-0 top-0 w-[2px] bg-[#0077ff] shadow-[0_0_12px_#0077ff] transition-all duration-300 ease-out z-0"
              style={{ height: `${scrollProgress}%` }}
            ></div>

            {/* Mapeando os projetos dinamicamente */}
            {projectsData.map((proj, idx) => {
              // Verifica se a linha do tempo já bateu no trigger desse projeto
              const isActive = scrollProgress >= proj.trigger;

              return (
                <div key={idx} className="relative pl-6 md:pl-12 group cursor-pointer z-10">
                  
                  {/* PONTO DA TIMELINE (Alinhado exatamente sobre a linha) */}
                  <div className={`absolute -left-[29px] top-10 h-3 w-3 rounded-full transition-all duration-500 ${
                    isActive 
                      ? 'bg-[#0077ff] shadow-[0_0_15px_#0077ff] scale-125' 
                      : 'bg-zinc-800 border-2 border-zinc-700'
                  }`}></div>
                  
                  <div className="flex flex-col xl:flex-row gap-8 items-center xl:items-stretch">
                    
                    {/* Imagem / GIF */}
                    <div className={`w-full xl:w-1/2 aspect-video bg-zinc-900/40 rounded-xl overflow-hidden relative backdrop-blur-sm transition-all duration-700 ${
                      isActive 
                        ? 'border border-[#0077ff]/40 shadow-[0_0_20px_rgba(0,119,255,0.1)]' 
                        : 'border border-white/5'
                    }`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                      <div className="w-full h-full flex items-center justify-center text-zinc-600 font-light tracking-[0.2em] text-xs uppercase">
                        {proj.gif}
                      </div>
                    </div>

                    {/* TEXTOS (Agora com Fundo Escuro para Leitura Perfeita) */}
                    <div className={`w-full xl:w-1/2 p-6 md:p-8 rounded-xl backdrop-blur-md transition-all duration-700 ${
                      isActive 
                        ? 'bg-[#050505]/80 border border-[#0077ff]/30 shadow-lg' 
                        : 'bg-[#050505]/40 border border-white/5'
                    }`}>
                      <span className={`text-xs tracking-[0.2em] font-bold mb-2 block transition-colors duration-500 ${isActive ? 'text-[#0077ff]' : 'text-zinc-600'}`}>
                        {proj.tag}
                      </span>
                      <h3 className={`text-2xl tracking-[0.2em] font-light uppercase mb-4 transition-colors duration-500 ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                        {proj.title}
                      </h3>
                      <p className="text-zinc-400 font-light tracking-widest text-sm leading-relaxed text-justify mb-6">
                        {proj.desc}
                      </p>
                      <p className={`tracking-[0.15em] text-xs font-medium uppercase border-l-2 pl-4 transition-colors duration-500 ${isActive ? 'border-[#0077ff]/50 text-zinc-300' : 'border-zinc-800 text-zinc-600'}`}>
                        {proj.tech}
                      </p>
                    </div>

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