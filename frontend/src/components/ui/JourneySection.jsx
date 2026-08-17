import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const journeyData = [
  {
    id: 1,
    year: "JUL. 2026 - ATUALMENTE",
    role: "ANALISTA DE SISTEMAS",
    company: "COLÉGIO SÃO PAULO DA CRUZ",
    description: "Responsável pela modernização da infraestrutura de TI e desenvolvimento de soluções internas do colégio. Criação de aplicações e automação de fluxos com n8n. Administração de servidores (Ubuntu, Docker), Active Directory e bancos de dados (PostgreSQL, MySQL, SQLite).",
    tech: ["Docker", "Linux", "n8n", "PostgreSQL", "React", "Node.js"]
  },
  {
    id: 2,
    year: "FEV. 2025 - JUN. 2026",
    role: "TÉCNICO DE INFORMÁTICA",
    company: "COLÉGIO SÃO PAULO DA CRUZ",
    description: "Atuação no suporte técnico a usuários na resolução de problemas de hardware, software e redes. Responsável pela instalação, configuração e manutenção de sistemas, gestão de chamados e garantia da eficiência do parque tecnológico.",
    tech: ["Windows Server", "Redes", "Hardware", "Suporte"]
  },
  {
    id: 3,
    year: "JUL. 2025 - DEZ. 2025",
    role: "MONITOR DE INTERFACES WEB",
    company: "PUC MINAS",
    description: "Responsável por auxiliar e sanar dúvidas dos alunos na disciplina de Desenvolvimento de Interfaces Web, fortalecendo as bases de Front-End e arquitetura de interfaces.",
    tech: ["HTML", "CSS", "JavaScript", "Mentoria"]
  },
  {
    id: 4,
    year: "JUN. 2024 - PREVISÃO 2028",
    role: "ENG. DE SOFTWARE",
    company: "PUC MINAS",
    description: "Bacharelado em andamento. Foco na interseção entre análise de sistemas e engenharia de software, desenvolvendo forte base em arquitetura de interfaces escaláveis, construção de APIs REST e bancos de dados relacionais.",
    tech: ["Java", "Spring Boot", "React", "Angular"]
  }
];

export default function JourneySection() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <section id="experiencias" className="relative w-full min-h-screen bg-transparent py-32 flex flex-col pointer-events-auto">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-12 relative z-10">
        
        {/* CABEÇALHO */}
        <div className="mb-24">
          <h2 className="text-[14vw] md:text-[8vw] font-['Anton'] leading-none text-white tracking-tighter uppercase mb-6">
            THE JOURNEY
          </h2>
          <p className="text-zinc-400 font-['Inter'] text-lg md:text-xl max-w-2xl leading-relaxed">
            A história por trás do código. Uma linha do tempo das minhas experiências profissionais, evolução técnica e impacto real nos projetos em que estive envolvido.
          </p>
        </div>

        {/* ACORDEÃO MONOLÍTICO */}
        <div className="flex flex-col border-b border-white/10">
          {journeyData.map((item, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={item.id}
                onClick={() => toggleExpand(index)}
                className="group border-t border-white/10 overflow-hidden cursor-pointer bg-black/10 hover:bg-black/40 transition-colors duration-500"
              >
                <div className="py-8 md:py-16 px-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <h3
                    className={`font-['Anton'] leading-none uppercase transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isExpanded 
                        ? 'text-4xl md:text-5xl text-[#F0592A]' 
                        : 'text-5xl md:text-6xl lg:text-7xl text-white group-hover:text-zinc-500'
                    }`}
                  >
                    {item.role}
                  </h3>
                  
                  <span 
                    className={`font-['Inter'] shrink-0 text-right whitespace-nowrap tracking-widest text-xs md:text-sm font-semibold transition-colors duration-500 ${
                      isExpanded ? 'text-[#F0592A]' : 'text-zinc-600 group-hover:text-white'
                    }`}
                  >
                    {item.year}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.3, ease: "linear", delay: isExpanded ? 0.2 : 0 }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-12 md:pb-16">
                        <div className="max-w-4xl border-l-2 border-[#F0592A] pl-6 md:pl-10">
                        <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide uppercase">
                          {item.company}
                        </h4>
                        <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8 font-['Inter']">
                          {item.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-3">
                          {item.tech.map(t => (
                            <span 
                              key={t} 
                              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-xs font-semibold text-zinc-300 tracking-widest uppercase hover:bg-white/10 hover:border-[#F0592A]/50 transition-colors"
                            >
                              {t}
                            </span>
                          ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
