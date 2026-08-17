import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';
import { AnimatedNumber } from './animated-number';

export default function BrutalistLoader() {
  const { progress } = useProgress();
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Se terminou o download
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setIsComplete(true);
      }, 1000); 
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div 
          exit={{ y: "-100%", opacity: 0.8 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-[#111111] flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
        >
          
          <div className="relative flex flex-col items-center justify-center mt-[-5vh]">
            <span className="text-zinc-600 font-['Inter'] tracking-[0.5em] text-sm md:text-xl font-bold uppercase mb-4 opacity-50">
              Iniciando Motor WebGL
            </span>
            
            {/* Número GIGANTE brutalista mais leve para a GPU */}
            <div className="font-['Anton'] text-[#F0592A] text-[22vw] md:text-[20vw] leading-none tracking-tighter flex items-end">
              <AnimatedNumber 
                value={progress} 
                precision={2} 
                mass={1} 
                stiffness={100} 
                damping={30} 
              />
              <span className="text-[12vw] md:text-[10vw] mb-[2vw] md:mb-[1vw]">%</span>
            </div>
          </div>

          {/* Barra de progresso crua estilo industrial no rodapé */}
          <div className="absolute bottom-0 left-0 right-0 h-[1vw] min-h-[8px] bg-zinc-900 overflow-hidden">
            <motion.div 
              className="h-full bg-[#F0592A]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
            />
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
