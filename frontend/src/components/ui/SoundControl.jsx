import { useState, useRef, useEffect } from 'react';

export default function SoundControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // Estado para controlar o volume
  const audioRef = useRef(null);

  // Prepara o áudio assim que o site carrega
  useEffect(() => {
    audioRef.current = new Audio('/music.mp3');
    audioRef.current.loop = true; 
    audioRef.current.volume = volume; 
  }, []);

  // Atualiza o volume sempre que o slider for arrastado
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

  return (
    // O 'group' agora engloba o controle de volume e o botão
    <div className="absolute top-10 right-10 z-50 flex items-center gap-3 group pointer-events-auto">
      
      {/* Menu de Volume (Aparece suavemente ao passar o mouse) */}
      <div className="flex items-center gap-2 opacity-0 w-0 overflow-hidden group-hover:w-24 group-hover:opacity-100 transition-all duration-300 ease-out">
        <span className="text-[9px] text-zinc-500 uppercase tracking-widest">Vol</span>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-16 h-[2px] bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#00e5ff]"
        />
      </div>

      {/* Botão Principal */}
      <button 
        onClick={toggleSound}
        className="flex items-center gap-2 cursor-pointer"
      >
        {/* Ícone Dinâmico: Alterna entre Linha Reta e Ondas Sonoras */}
        <div className="flex items-end gap-[2px] h-3 w-4 justify-center">
          {isPlaying ? (
            // ESTADO ON: 3 Barrinhas pulando (Cor Ciano)
            <>
              <div className="w-[2px] h-full bg-[#00e5ff] animate-[bounce_0.8s_infinite]"></div>
              <div className="w-[2px] h-full bg-[#00e5ff] animate-[bounce_1s_infinite]"></div>
              <div className="w-[2px] h-full bg-[#00e5ff] animate-[bounce_0.7s_infinite]"></div>
            </>
          ) : (
            // ESTADO OFF: Linha reta lisa ("Flatline")
            <div className="w-full h-[2px] bg-zinc-500 group-hover:bg-[#00e5ff] transition-colors"></div>
          )}
        </div>
        
        {/* Texto Elegante */}
        <span className={`text-xs tracking-[0.3em] font-light uppercase transition-colors duration-300 ${isPlaying ? 'text-[#00e5ff]' : 'text-zinc-500 group-hover:text-white'}`}>
          Sound [{isPlaying ? 'ON' : 'OFF'}]
        </span>
      </button>

    </div>
  );
}