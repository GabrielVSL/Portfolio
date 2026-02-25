export default function ProjectsSection({ section }) {
  const sections = ['home', 'projetos', 'sobre', 'experiencias', 'contato'];
  const currentIndex = sections.indexOf(section);
  const myIndex = 1; 

  let positionClass = 'translate-x-[100vw] opacity-0 pointer-events-none';
  if (currentIndex === myIndex) positionClass = 'translate-x-0 opacity-100 pointer-events-auto';
  else if (currentIndex > myIndex) positionClass = '-translate-x-[100vw] opacity-0 pointer-events-none';

  return (
    <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${positionClass}`}>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[12vw] font-black text-white/[0.02] tracking-[0.4em] whitespace-nowrap">PROJETOS</h2>
      </div>

      <div className="relative z-10 w-full h-full overflow-y-auto pb-32">
        <div className="h-[25vh] w-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-8 mb-16">
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.3em] text-white uppercase border-l-2 border-[#00e5ff] pl-6">
            Meus Projetos
          </h2>
          <p className="mt-4 text-zinc-500 tracking-[0.2em] text-xs md:text-sm font-light uppercase pl-6">
            Desenvolvimento Web • Infraestrutura • Algoritmos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="w-full flex flex-col group cursor-pointer">
            <div className="w-full aspect-video bg-zinc-900/40 border border-white/5 rounded-sm overflow-hidden relative backdrop-blur-sm transition-transform duration-700 group-hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <div className="w-full h-full flex items-center justify-center text-zinc-600 font-light tracking-[0.2em] text-xs uppercase">[ GIF Portal Educacional ]</div>
            </div>
            <div className="mt-6 z-20 text-left">
              <h3 className="text-white text-xl tracking-[0.2em] font-light uppercase mb-2 group-hover:text-[#00e5ff] transition-colors duration-500">Portal Educacional CSPC</h3>
              <p className="text-zinc-500 tracking-[0.15em] text-xs font-light uppercase">React • Tailwind CSS • JSON</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-full flex flex-col group cursor-pointer">
            <div className="w-full aspect-video bg-zinc-900/40 border border-white/5 rounded-sm overflow-hidden relative backdrop-blur-sm transition-transform duration-700 group-hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <div className="w-full h-full flex items-center justify-center text-zinc-600 font-light tracking-[0.2em] text-xs uppercase">[ GIF Infraestrutura ]</div>
            </div>
            <div className="mt-6 z-20 text-left">
              <h3 className="text-white text-xl tracking-[0.2em] font-light uppercase mb-2 group-hover:text-[#00e5ff] transition-colors duration-500">Infra & Automação</h3>
              <p className="text-zinc-500 tracking-[0.15em] text-xs font-light uppercase">Ubuntu Server • CasaOS • PowerShell</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-full flex flex-col group cursor-pointer">
            <div className="w-full aspect-video bg-zinc-900/40 border border-white/5 rounded-sm overflow-hidden relative backdrop-blur-sm transition-transform duration-700 group-hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <div className="w-full h-full flex items-center justify-center text-zinc-600 font-light tracking-[0.2em] text-xs uppercase">[ GIF AEDS II ]</div>
            </div>
            <div className="mt-6 z-20 text-left">
              <h3 className="text-white text-xl tracking-[0.2em] font-light uppercase mb-2 group-hover:text-[#00e5ff] transition-colors duration-500">Estruturas de Dados</h3>
              <p className="text-zinc-500 tracking-[0.15em] text-xs font-light uppercase">C / C++ • Árvores Binárias • Sort</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}