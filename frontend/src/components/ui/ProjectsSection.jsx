import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  { id: 1, title: 'PLANTEI', description: 'Plataforma interativa para monitoramento inteligente e *análise* do ciclo de vida botânico.', img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400&auto=format&fit=crop' },
  { id: 2, title: 'COVERTE', description: 'Motor de automação educacional que processa e unifica relatórios PEI em um *único* padrão.', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop' },
  { id: 3, title: 'RENTCARS', description: 'Sistema digital de ponta para *locação* e gerenciamento virtual de frotas de veículos.', img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=400&auto=format&fit=crop' },
  { id: 4, title: 'COLÉGIO', description: 'Dashboard institucional rápido e intuitivo para o *acesso* aos terminais de informática.', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400&auto=format&fit=crop' },
  { id: 5, title: 'BHFLIX', description: 'Catálogo cinematográfico projetado para a *descoberta* ágil de metadados e informações.', img: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=400&auto=format&fit=crop' },
  { id: 6, title: 'CLEARPATH', description: 'Aplicativo mobile nativo estruturado em *Swift* com foco absoluto em performance iOS.', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&auto=format&fit=crop' },
];

// Componente que faz a animação de onda das letras (Skiper Text Effect)
const AnimatedText = ({ text, isProject }) => {
  const letters = text.split('');
  const centerIndex = Math.floor(letters.length / 2);

  return (
    // Caixa invisível que serve como "máscara" (h-[22vw] é a altura exata da fonte esticada)
    // Tiramos a margem de cima (mt-4) para colar mais ainda nas fotos
    <div className="relative w-full h-[22vw] flex justify-center items-end overflow-hidden pointer-events-none">
      <AnimatePresence>
        <motion.div 
          key={text} 
          className="absolute flex justify-center items-center whitespace-nowrap"
          style={{
            transform: 'scaleY(1.5)', 
            transformOrigin: 'bottom',
            letterSpacing: '-0.04em',
            // Troca a cor para Laranja (Hero) se for um projeto, senão fica branco
            color: isProject ? '#F0592A' : '#ffffff',
            // TRUQUE PARA DEIXAR EXTRA BOLD: Adicionamos uma "borda" da mesma cor da letra para deixá-la muito mais gorda!
            WebkitTextStroke: '6px currentColor',
          }}
        >
          {letters.map((char, i) => {
            // Calcula a distância do centro
            const dist = Math.abs(i - centerIndex);
            const maxDist = centerIndex;
            
            // Entrando: do centro para as bordas (mais rápido)
            const inDelay = dist * 0.025;
            // Saindo: das bordas para o centro (mais rápido)
            const outDelay = (maxDist - dist) * 0.025;

            return (
              <motion.span
                key={i}
                // Fonte bem maior (13vw)
                className="inline-block text-[13vw] font-['Anton'] leading-none text-center"
                // Se for projeto (laranja), vem de baixo (150% pra garantir que sai da tela). Se for branco, vem de cima (-150%)
                initial={{ y: isProject ? '150%' : '-150%' }} 
                animate={{ 
                  y: 0, 
                  transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: inDelay } 
                }}
                exit={{ 
                  // Vai embora para 150% para não sobrar nenhuma rebarba invisível
                  y: isProject ? '150%' : '-150%', 
                  transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: outDelay } 
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Componente de Descrição (Skeleton Pill Reveal - Exato)
// Vamos mudar isso aqui para parecer um console, onde alguem está escrevendo a descrição pode ser?
// Imitar erro de escrita para apagar e escrever certo, mas nada que vá atrapalhar muito o usuario
const AnimatedDescription = ({ text }) => {
  const words = text.split(' ');

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-6 text-center h-[80px] z-10 px-4 flex justify-center">
      <AnimatePresence>
        {/* Aqui é onde controlamos o "espaço" entre as palavras usando o gap-x */}
        <motion.div key={text} className="absolute flex flex-wrap justify-center gap-x-1 gap-y-2 w-full">
          {words.map((w, i) => {
            // Checa se a palavra está entre * para ser laranja (Ex: *interação*)
            const isHighlighted = w.startsWith('*') && w.endsWith('*');
            const cleanWord = isHighlighted ? w.slice(1, -1) : w;
            const finalColor = isHighlighted ? '#F0592A' : '#f3f4f6'; // Laranja ou Branco

            return (
              <motion.span
                key={i}
                className="text-lg md:text-2xl font-['Inter'] font-extrabold tracking-tight px-1"
                initial={{ 
                  color: 'rgba(255,255,255,0)', 
                  backgroundColor: 'rgba(75,85,99,0)', // Começa 100% invisível (fundo do site)
                  borderRadius: '999px'
                }}
                animate={{ 
                  // Animação em 3 estágios usando Arrays (Keyframes)
                  color:           ['rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)', finalColor],
                  backgroundColor: ['rgba(75,85,99,0)',    '#4b5563',             '#4b5563',             'rgba(75,85,99,0)'],
                  borderRadius:    ['999px',               '999px',               '999px',               '4px']
                }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ 
                  duration: 1.0, // Aumentei a duração para dar tempo de ver os 3 estágios
                  times: [0, 0.15, 0.6, 1], // 0% Invisível -> 15% Pílula Cinza -> 60% Pílula Cinza (Pausa) -> 100% Texto
                  delay: i * 0.05, // Efeito gradativo cascata palavra por palavra
                  ease: 'easeInOut'
                }}
              >
                {cleanWord}
              </motion.span>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function ProjectsSection() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeText, setActiveText] = useState('PROJETOS');
  const [activeDesc, setActiveDesc] = useState('selecione um *projeto* para ver o site e seus detalhes.');

  // Rastreia o mouse apenas quando estiver dentro da seção
  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      id="work" 
      className="relative w-full min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      
      {/* Círculo Laranja (Custom Cursor) - Cor sólida do hero */}
      <motion.div 
        className="fixed top-0 left-0 w-24 h-24 bg-[#F0592A] rounded-full pointer-events-none z-50 flex items-center justify-center"
        animate={{
          x: cursorPos.x + 16, // Desloca para a direita do mouse
          y: cursorPos.y + 16, // Desloca para baixo do mouse, assim nunca tampa a imagem inteira
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 1 : 0
        }}
        transition={{
          type: 'tween',
          ease: 'backOut',
          duration: 0.15
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </motion.div>

      {/* Row de Imagens Pequenas (Thumbnails) */}
      <div 
        // Adicionamos items-end e fixamos a altura do container (h-28) para que as imagens cresçam para cima e empurrem umas às outras sem desalinhar
        className="flex items-end justify-center gap-4 mb-0 z-10 mt-8 h-20 md:h-28"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setActiveText('PROJETOS');
          setActiveDesc('Uma seleção de *projetos* excepcionais focados em estética, performance e interações de alto nível.');
        }}
      >
        {projects.map((p) => (
          <motion.div 
            key={p.id}
            onMouseEnter={() => {
              setActiveText(p.title);
              setActiveDesc(p.description);
            }}
            // Trocamos o 'scale' problemático por mudança REAL de largura e altura.
            // Assim, quando a imagem crescer, ela "empurra" as imagens do lado gentilmente (efeito Mac OS Dock)
            className="w-12 h-12 md:w-16 md:h-16 hover:w-20 hover:h-20 md:hover:w-28 md:hover:h-28 rounded-xl overflow-hidden hover:z-20 hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <img src={p.img} alt={`Project ${p.id}`} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Tipografia Gigante Animada - Passamos a prop isProject se não for PROJETOS */}
      <AnimatedText text={activeText} isProject={activeText !== 'PROJETOS'} />

      {/* Descrição Animada (Efeito Skeleton/Pill Reveal) */}
      <AnimatedDescription text={activeDesc} />

    </section>
  );
}
