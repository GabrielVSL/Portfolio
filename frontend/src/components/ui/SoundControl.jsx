import { useState, useRef, useEffect } from 'react';

export default function SoundControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); 
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/music.mp3');
    audioRef.current.loop = true; 
    audioRef.current.volume = volume; 
    
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          
          setIsPlaying(true);
        })
        .catch((error) => {
          
          console.log("Autoplay bloqueado pelo navegador. O usuário precisa interagir primeiro.");
          setIsPlaying(false);
        });
    }
  }, []);

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

  const glowStyle = "drop-shadow-[0_0_8px_rgba(0,119,255,0.6)]";
  
  // Variáveis para controlar a animação do ícone
  const isMuted = !isPlaying || volume === 0;
  const showLowWave = isPlaying && volume > 0;
  const showHighWave = isPlaying && volume > 0.5;

  return (
    <div className="absolute top-4 right-10 z-50 flex items-center gap-3 group pointer-events-auto">
      
      {/* Menu de Volume (Invisível, só aparece o slider no hover) */}
      <div className="flex items-center gap-2 opacity-0 w-0 overflow-hidden group-hover:w-24 group-hover:opacity-100 transition-all duration-300 ease-out">
        {/* Mantivemos o texto VOL como você pediu */}
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

      {/* Ícone de Som SVG */}
      <button 
        onClick={toggleSound}
        className={`flex items-center justify-center cursor-pointer p-2 transition-all duration-300 ${
          !isMuted 
            ? `text-[#0077ff] ${glowStyle}` 
            : `text-zinc-500 group-hover:text-[#0077ff] group-hover:${glowStyle}`
        }`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Base do alto-falante (sempre visível) */}
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          
          {/* Ondas Sonoras (Aparecem animadas se estiver tocando) */}
          {!isMuted && (
            <>
              {/* Onda Interna (Aparece em qualquer volume > 0) */}
              {showLowWave && (
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" className="animate-pulse" />
              )}
              {/* Onda Externa (Só aparece se o volume for maior que 50%) */}
              {showHighWave && (
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" className="animate-[pulse_1s_infinite_0.3s]" />
              )}
            </>
          )}

          {/* X de Mudo (Aparece quando pausado ou volume zero) */}
          {isMuted && (
            <>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </>
          )}
        </svg>
      </button>

    </div>
  );
}