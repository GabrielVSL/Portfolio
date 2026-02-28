export default function Navbar({ section, setSection }) {
  const isHome = section === 'home';

  const activeStyle = "text-[#0077ff] font-bold drop-shadow-[0_0_8px_rgba(0,119,255,0.6)]";
  const inactiveStyle = "hover:text-white transition-colors duration-300";

  return (
    <>
      {/* 1. O PAINEL DE VIDRO FULL-WIDTH (Aparece só fora da Home) */}
      <div 
        className={`absolute top-0 left-0 w-full h-17 z-40 pointer-events-none
          /* Mágica do deslizamento do fundo: */
          transition-all duration-1000 ease-in-out
          ${isHome 
            // Na Home: Totalmente invisível e puxado para fora da tela (pra cima)
            ? 'opacity-0 -translate-y-full' 
            // Fora da Home: Desce suavemente, ativa o blur e a sombra e cobre o topo todo
            : 'opacity-100 translate-y-0 bg-[#050505]/70 backdrop-blur-md border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          }`}
      />

      {/* 2. OS LINKS DA NAVBAR */}
      <div 
        className={`absolute z-50 flex text-xs md:text-sm tracking-[0.2em] pointer-events-auto uppercase font-light text-zinc-400 items-center
          /* Mágica do deslizamento dos links: */
          transition-all duration-1000 ease-in-out
          ${isHome 
            // ESTADO HOME: Centralizado lá embaixo
            ? 'top-[calc(100%-6rem)] left-1/2 -translate-x-1/2 flex-row gap-x-6 md:gap-x-12' 
            // ESTADO OUTRAS TELAS: Alinhados no topo à esquerda (na mesma altura do Sound Control!)
            : 'top-6 left-10 translate-x-0 flex-row gap-x-6 md:gap-x-8'
          }`}
      >
        <button 
          onClick={() => setSection('home')}
          className={section === 'home' ? activeStyle : inactiveStyle}
        >
          Home
        </button>

        <button 
          onClick={() => setSection('projetos')}
          className={section === 'projetos' ? activeStyle : inactiveStyle}
        >
          Projetos
        </button>

        <button 
          onClick={() => setSection('sobre')}
          className={section === 'sobre' ? activeStyle : inactiveStyle}
        >
          Sobre
        </button>

        <button 
          onClick={() => setSection('experiencias')}
          className={section === 'experiencias' ? activeStyle : inactiveStyle}
        >
          Experiências
        </button>

        <button 
          onClick={() => setSection('contato')}
          className={section === 'contato' ? activeStyle : inactiveStyle}
        >
          Contato
        </button>
      </div>
    </>
  );
}