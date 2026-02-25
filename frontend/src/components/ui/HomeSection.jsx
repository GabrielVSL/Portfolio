export default function HomeSection({ section }) {
  // A Lógica do Deslizamento
  const sections = ['home', 'projetos', 'sobre', 'experiencias', 'contato'];
  const currentIndex = sections.indexOf(section);
  const myIndex = 0; // MUITO IMPORTANTE: Mude este número em cada arquivo (home=0, projetos=1...)

  let positionClass = 'translate-x-[100vw] opacity-0 pointer-events-none'; // Padrão: fica na DIREITA
  
  if (currentIndex === myIndex) {
    positionClass = 'translate-x-0 opacity-100 pointer-events-auto'; // ATUAL: Fica no CENTRO
  } else if (currentIndex > myIndex) {
    positionClass = '-translate-x-[100vw] opacity-0 pointer-events-none'; // PASSADO: Vai pra ESQUERDA
  }

  return (
    // Substituímos o className antigo por esta estrutura
    <div className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${positionClass}`}>
      
      <div className="text-center mix-blend-difference text-white">
        <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.3em] mb-4 uppercase">
          Gabriel Victor Souza
        </h1>
        <p className="text-xs md:text-sm tracking-[0.5em] text-zinc-300 font-light uppercase">
          Engenharia de Software | Dev Full Stack
        </p>
      </div>
      
    </div>
  );
}