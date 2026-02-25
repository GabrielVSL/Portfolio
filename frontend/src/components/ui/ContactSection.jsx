export default function ContactSection({ section }) {
  const sections = ['home', 'projetos', 'sobre', 'experiencias', 'contato'];
  const currentIndex = sections.indexOf(section);
  const myIndex = 4; 

  let positionClass = 'translate-x-[100vw] opacity-0 pointer-events-none';
  if (currentIndex === myIndex) positionClass = 'translate-x-0 opacity-100 pointer-events-auto';
  else if (currentIndex > myIndex) positionClass = '-translate-x-[100vw] opacity-0 pointer-events-none';

  return (
    <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${positionClass}`}>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[12vw] font-black text-white/[0.02] tracking-[0.4em] whitespace-nowrap">CONTATO</h2>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 max-w-6xl mx-auto pb-20 md:pb-0">
        <div className="h-[15vh] md:h-0 w-full pointer-events-none"></div>

        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.3em] text-white uppercase border-l-2 border-[#ffaa00] pl-6 mb-8">Vamos Conversar</h2>
          <p className="text-zinc-400 font-light tracking-widest text-sm leading-relaxed pl-6 mb-12 text-justify md:text-left">Tem uma ideia de projeto, precisa de ajuda com infraestrutura ou quer bater um papo sobre Engenharia de Software e Desenvolvimento Web? Sinta-se à vontade para me mandar uma mensagem.</p>

          <div className="flex flex-col gap-8 pl-6">
            <a href="mailto:gabrieelvictor26@gmail.com" className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-8 w-fit">
              <span className="text-xs font-light tracking-[0.3em] text-zinc-600 uppercase group-hover:text-[#ffaa00] transition-colors w-24">E-mail</span>
              <span className="text-white tracking-widest font-light text-sm md:text-base group-hover:text-[#ffaa00] transition-colors">gabrieelvictor26@gmail.com</span>
            </a>

            <a href="https://www.linkedin.com/in/gabrielvictorsouza/" target="_blank" rel="noreferrer" className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-8 w-fit">
              <span className="text-xs font-light tracking-[0.3em] text-zinc-600 uppercase group-hover:text-[#ffaa00] transition-colors w-24">LinkedIn</span>
              <span className="text-white tracking-widest font-light text-sm md:text-base group-hover:text-[#ffaa00] transition-colors">/in/gabrielvictorsouza</span>
            </a>

            <a href="https://github.com/GabrielVSL" target="_blank" rel="noreferrer" className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-8 w-fit">
              <span className="text-xs font-light tracking-[0.3em] text-zinc-600 uppercase group-hover:text-[#ffaa00] transition-colors w-24">GitHub</span>
              <span className="text-white tracking-widest font-light text-sm md:text-base group-hover:text-[#ffaa00] transition-colors">github.com/GabrielVSL</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}