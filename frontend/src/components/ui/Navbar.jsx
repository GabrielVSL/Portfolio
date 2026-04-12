import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// Importamos a sua nova Nuvem de Idiomas! Ajuste o caminho se necessário.
import { useLanguage } from '../../contexts/LanguageContext'; 

const navItems = [
  { id: 'home', pt: 'Home', en: 'Home' },
  { id: 'sobre', pt: 'Sobre', en: 'About' },
  { id: 'projetos', pt: 'Projetos', en: 'Work' },
  { id: 'experiencias', pt: 'Trajetória', en: 'Journey' },
  { id: 'contato', pt: 'Contato', en: 'Contact' }
];

export default function Navbar() {
  const { lang, toggleLang } = useLanguage(); // Puxando o estado global
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // --- LÓGICA DE ÁUDIO INTEGRADA (Do seu SoundControl.jsx) ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); 
  const audioRef = useRef(null);

  useEffect(() => {
    // Inicializa o áudio
    audioRef.current = new Audio('/music.mp3');
    audioRef.current.loop = true; 
    audioRef.current.volume = volume; 
    
    // Tenta o autoplay
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          console.log("Autoplay bloqueado. Aguardando interação do utilizador.");
          setIsPlaying(false);
        });
    }
    
    // Cleanup do áudio ao desmontar a Navbar (boa prática)
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Atualiza o volume em tempo real
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleSound = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const isMuted = !isPlaying || volume === 0;
  const showLowWave = isPlaying && volume > 0;
  const showHighWave = isPlaying && volume > 0.5;
  const glowStyle = "drop-shadow-[0_0_8px_rgba(0,119,255,0.6)]";
  // -------------------------------------------------------------

  // --- LÓGICA DO SCROLL SPY ---
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sectionIds = navItems.map(item => item.id);
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#050505]/70 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* LADO ESQUERDO: Logo */}
        <div onClick={() => scrollToSection('home')} className="cursor-pointer group flex items-center gap-3">
          <div className="w-2 h-2 bg-[#0077ff] rounded-full group-hover:shadow-[0_0_12px_#00e5ff] transition-shadow"></div>
          <span className="text-white font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs">G.LOPES</span>
        </div>

        {/* CENTRO: Links */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-white/[0.02] border border-white/5 rounded-full backdrop-blur-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-5 py-2 rounded-full text-[10px] tracking-widest uppercase transition-colors duration-300 ${
                  isActive ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[#0077ff]/10 border border-[#0077ff]/30 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{lang === 'pt' ? item.pt : item.en}</span>
              </button>
            );
          })}
        </div>

        {/* LADO DIREITO: HUD Integrado (Idioma + Controle de Som com Hover Expansível) */}
        <div className="flex items-center gap-4 group">
          
          <button 
            onClick={toggleLang}
            className="text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 border border-white/10 rounded-md hover:bg-white/5 hover:text-[#00e5ff] transition-all text-zinc-400"
          >
            {lang === 'pt' ? 'PT' : 'EN'}
          </button>

          <div className="w-[1px] h-4 bg-white/10"></div>

          {/* Controle de Som Oculto que expande no Hover */}
          <div className="flex items-center gap-2 opacity-0 w-0 overflow-hidden group-hover:w-24 group-hover:opacity-100 transition-all duration-300 ease-out">
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest">Vol</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 h-[2px] bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#0077ff]"
            />
          </div>

          {/* Ícone de Som Animado (Do seu código original) */}
          <button 
            onClick={toggleSound}
            className={`flex items-center justify-center cursor-pointer p-2 transition-all duration-300 ${
              !isMuted ? `text-[#00e5ff] ${glowStyle}` : `text-zinc-500 group-hover:text-[#0077ff] group-hover:${glowStyle}`
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              {!isMuted && (
                <>
                  {showLowWave && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" className="animate-pulse" />}
                  {showHighWave && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" className="animate-[pulse_1s_infinite_0.3s]" />}
                </>
              )}
              {isMuted && (
                <>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </>
              )}
            </svg>
          </button>
        </div>

      </div>
    </motion.nav>
  );
}