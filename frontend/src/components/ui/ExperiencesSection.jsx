export default function ExperiencesSection({ section }) {
  const isActive = section === 'experiencias';

  return (
    <div className={`absolute inset-0 w-full h-full transition-all duration-1000 delay-300 ease-in-out ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      
      {/* TÍTULO GIGANTE DE FUNDO */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[10vw] md:text-[12vw] font-black text-white/[0.02] tracking-[0.4em] whitespace-nowrap">
          EXPERIÊNCIA
        </h2>
      </div>

      <div className="relative z-10 w-full h-full overflow-y-auto pb-32">
        
        {/* Espaço no topo para a Navbar respirar */}
        <div className="h-[25vh] w-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-8">
          
          {/* Título da Seção (com detalhe em Verde Matrix) */}
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.3em] text-white uppercase border-l-2 border-[#00ff88] pl-6 mb-16">
            Trajetória
          </h2>

          {/* Container da Linha do Tempo */}
          <div className="relative border-l border-white/10 ml-6 pl-10 md:pl-16 space-y-16 w-full md:w-2/3">
            
            {/* ITEM 1: Colégio São Paulo da Cruz */}
            <div className="relative group">
              {/* Bolinha da Timeline */}
              <div className="absolute -left-[45px] md:-left-[69px] top-1 h-3 w-3 bg-[#00ff88] rounded-full shadow-[0_0_10px_#00ff88] group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                <h3 className="text-white text-xl md:text-2xl tracking-[0.2em] font-light uppercase group-hover:text-[#00ff88] transition-colors duration-300">
                  Estagiário de Suporte de TI / Dev
                </h3>
              </div>
              
              <h4 className="text-zinc-400 text-xs md:text-sm tracking-[0.2em] font-light uppercase mb-6">
                Colégio São Paulo da Cruz <span className="text-white/20 mx-2">|</span> Atual
              </h4>
              
              <p className="text-zinc-500 font-light tracking-widest text-xs md:text-sm leading-relaxed text-justify md:text-left">
                Gerenciamento completo da infraestrutura de laboratórios e servidores. Atuação forte em automação de processos utilizando <span className="text-zinc-300">PowerShell</span> para administração de contas e permissões no Microsoft 365. Configuração e manutenção de servidores Linux (<span className="text-zinc-300">Ubuntu Server, CasaOS</span>) para backup e serviços de mídia. Além da infraestrutura, atuo no desenvolvimento de soluções Web, como o portal educacional utilizando <span className="text-zinc-300">React, HTML e integrações via JSON</span>.
              </p>
            </div>

            {/* ITEM 2: PUC Minas */}
            <div className="relative group">
              {/* Bolinha da Timeline */}
              <div className="absolute -left-[45px] md:-left-[69px] top-1 h-3 w-3 bg-zinc-700 rounded-full group-hover:bg-[#00ff88] group-hover:scale-150 transition-all duration-500"></div>
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                <h3 className="text-white text-xl md:text-2xl tracking-[0.2em] font-light uppercase group-hover:text-[#00ff88] transition-colors duration-300">
                  Engenharia de Software
                </h3>
              </div>
              
              <h4 className="text-zinc-400 text-xs md:text-sm tracking-[0.2em] font-light uppercase mb-6">
                PUC Minas <span className="text-white/20 mx-2">|</span> Graduação em Andamento
              </h4>
              
              <p className="text-zinc-500 font-light tracking-widest text-xs md:text-sm leading-relaxed text-justify md:text-left">
                Desenvolvimento de base sólida em arquitetura de software e engenharia de requisitos. Foco aplicado em Algoritmos e Estruturas de Dados Avançadas (AEDS II), com implementações complexas utilizando linguagens de baixo nível, além de projetos Full Stack explorando o ecossistema <span className="text-zinc-300">C# / .NET</span>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}