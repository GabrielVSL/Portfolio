import { motion } from 'framer-motion';

export default function HomeSection() {
  return (
    <section 
      id="home" 
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* 1. HUD SUPERIOR: Metadados do Sistema */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-32 w-full max-w-7xl px-8 flex justify-between items-start"
      >
        <div className="flex flex-col gap-2">
          <span className="text-[#0077ff] text-[10px] tracking-[0.4em] font-bold uppercase">System Status</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full animate-pulse shadow-[0_0_8px_#00e5ff]"></span>
            <span className="text-white text-[10px] tracking-[0.2em] uppercase font-light">Online / Ready</span>
          </div>
        </div>

        <div className="hidden md:flex flex-col gap-2 text-right">
          <span className="text-zinc-500 text-[10px] tracking-[0.4em] font-bold uppercase">Current Focus</span>
          <span className="text-white text-[10px] tracking-[0.2em] uppercase font-light">Software Engineering & UI Architecture</span>
        </div>
      </motion.div>

      {/* 2. CONTEÚDO CENTRAL: O Título Hero */}
      <div className="relative z-10 text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-8xl font-black tracking-[0.4em] text-white uppercase ml-[0.4em]">
            Gabriel <span className="font-thin text-zinc-500">Lopes</span>
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-[#0077ff] text-xs md:text-sm tracking-[0.6em] uppercase font-light"
        >
          Software Engineer & Fullstack Developer
        </motion.p>
      </div>

      {/* 3. RODAPÉ: O Mouse Animado (Scroll Indicator) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 flex flex-col items-center gap-4"
      >
        <span className="text-zinc-600 text-[9px] tracking-[0.5em] uppercase font-bold">Scroll to Explore</span>
        
        {/* Ícone do Mouse em SVG com Framer Motion */}
        <div className="w-[26px] h-[42px] border-2 border-zinc-800 rounded-full flex justify-center p-1.5">
          <motion.div 
            animate={{ 
              y: [0, 15, 0],
              opacity: [1, 0.2, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-1.5 h-1.5 bg-[#0077ff] rounded-full shadow-[0_0_8px_#0077ff]"
          />
        </div>
      </motion.div>

      {/* 4. ELEMENTOS DE DECORAÇÃO (HUD LATERAL) */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-24 items-center">
        <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent"></div>
        <span className="rotate-90 text-zinc-800 text-[10px] tracking-[1em] uppercase whitespace-nowrap">Portfolio V.2</span>
        <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent"></div>
      </div>
    </section>
  );
}