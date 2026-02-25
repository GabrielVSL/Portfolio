export default function Navbar({ section, setSection }) {
  const isHome = section === 'home';

  return (
    <div 
      className={`absolute z-50 transition-all duration-1000 ease-in-out flex text-xs md:text-sm tracking-[0.2em] pointer-events-auto uppercase font-light text-zinc-500
        ${isHome 
          ? 'bottom-12 w-full justify-center gap-x-8 md:gap-x-16 left-0' 
          : 'top-10 left-10 flex-col md:flex-row w-auto gap-y-4 md:gap-x-8' // Alterado para left-10
        }`}
    >
      <button 
        onClick={() => setSection('home')}
        className={`transition-colors duration-300 ${section === 'home' ? 'text-white' : 'hover:text-white'}`}
      >
        Home
      </button>
      <button 
        onClick={() => setSection('projetos')}
        className={`transition-colors duration-300 ${section === 'projetos' ? 'text-white' : 'hover:text-white'}`}
      >
        Projetos
      </button>

      <button 
        onClick={() => setSection('sobre')}
        className={`transition-colors duration-300 ${section === 'sobre' ? 'text-white' : 'hover:text-white'}`}
      >
        Sobre
      </button>

      <button 
        onClick={() => setSection('experiencias')}
        className={`transition-colors duration-300 ${section === 'experiencias' ? 'text-white' : 'hover:text-white'}`}
      >
        Experiências
      </button>

      <button 
        onClick={() => setSection('contato')}
        className={`transition-colors duration-300 ${section === 'contato' ? 'text-white' : 'hover:text-white'}`}
      >
        Contato
      </button>
    </div>
   );
}