import React, { useState, useEffect } from 'react';

export default function ContactSection() {
  const [time, setTime] = useState(new Date());

  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contato" className="relative w-full min-h-[90vh] bg-[#020202] pt-32 pb-8 px-4 md:px-12 flex flex-col justify-between pointer-events-auto overflow-hidden">
      
      {/* 
        A LINHA SVG CRUZA ESTA SEÇÃO TAMBÉM! 
        Como ela é z-10 globalmente, ela fica acima do bg mas abaixo do texto que coloquei como z-20 aqui.
      */}
      
      {/* MEIO DA TELA: CHAMADA PARA AÇÃO (CTA) */}
      <div className="flex-1 flex flex-col justify-center items-center text-center relative z-20 mt-12 md:mt-0">
        
        <h2 className="text-[13vw] md:text-[9vw] font-['Anton'] leading-[0.85] text-white tracking-tighter uppercase mb-12 hover:text-[#F0592A] transition-colors duration-500 cursor-default">
          EVOLUA <br/> A EXPERIENCIA <br/> DA SUA MARCA
        </h2>

        <a 
          href="mailto:gabrieelvictor26@gmail.com"
          className="group flex items-center justify-center gap-4 text-xl md:text-4xl lg:text-5xl font-['Inter'] font-bold text-zinc-500 hover:text-white transition-all duration-300"
        >
          {/* Bolinha Laranja que aparece no Hover para dar o toque premium */}
          <span className="w-0 h-0 group-hover:w-6 group-hover:h-6 md:group-hover:w-8 md:group-hover:h-8 bg-[#F0592A] rounded-full transition-all duration-500 ease-out flex-shrink-0" />
          <span className="tracking-widest">CONTATO@GABRIELVSL.COM</span>
        </a>

      </div>

      {/* FOOTER (RODAPÉ) */}
      <div className="w-full max-w-7xl mx-auto mt-32 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-20 font-['Inter'] text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest">
        
        {/* STATUS & RELÓGIO */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
            <span className="text-white font-semibold">ABERTO À TRABALHOS</span>
          </div>
          <div className="hidden md:block w-[1px] h-4 bg-white/20"></div>
          <div>
            LOCAL TIME: {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* REDES SOCIAIS 
          - ficou meio escondido, poderia colocar icones e achar um lugar melhor para colocar isso não?
        */}
        <div className="flex items-center gap-6 font-semibold">
          <a href="https://www.linkedin.com/in/gabrielvictorsouza/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F0592A] transition-colors duration-300">LINKEDIN</a>
          <a href="https://github.com/GabrielVSL" target="_blank" rel="noopener noreferrer" className="hover:text-[#F0592A] transition-colors duration-300">GITHUB</a>
        </div>

        {/* COPYRIGHT 
          - é dessa forma que a gente colocar copyright nas coisas?
          - faltou alguma coisa aqui? as vezes colocar o email tambem poderia ajudar, o botão contato@ nao me parece muito intuitivo
        */}
        <div className="text-zinc-600 font-semibold text-center md:text-right">
          © {new Date().getFullYear()} GABRIELVSL <br className="md:hidden" />
          <span className="hidden md:inline"> • </span> ALL RIGHTS RESERVED
        </div>
      </div>
      
    </section>
  );
}
