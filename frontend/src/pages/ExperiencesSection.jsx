import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ExperiencesSection() {
  // --- ESTADOS E REFERÊNCIAS ---
  const [lang, setLang] = useState('pt');
  const [isFading, setIsFading] = useState(false);
  
  // Referência para medir a altura total da linha do tempo
  const timelineRef = useRef(null);

  // O motor mágico do Framer Motion que lê o progresso da página
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"] // A linha começa a preencher quando o topo bate no centro do ecrã
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // --- FUNÇÕES ---
  const handleLangChange = (newLang) => {
    if (newLang === lang) return;
    setIsFading(true);
    setTimeout(() => {
      setLang(newLang);
      setIsFading(false);
    }, 400);
  };

  // --- DADOS REFINADOS PARA "BENTO CARDS" ---
  const content = {
    pt: {
      title: "Trajetória",
      subtitle: "A MINHA EVOLUÇÃO TÉCNICA",
      desc: "De infraestruturas de baixo nível ao desenvolvimento de interfaces imersivas, esta é a linha do tempo da minha carreira.",
      eduTitle: "Educação",
      degree: "Engenharia de Software",
      uni: "PUC Minas • 2024 - 2027",
      experiences: [
        {
          id: 'agencia-puc',
          title: "Desenvolvedor Mobile (Flutter)",
          company: "Agência Experimental - PUC Minas",
          date: "Fev 2026 - Atual",
          status: "Ativo",
          highlights: ["Flutter", "Dart", "Firebase", "Mobile UX"],
          description: "Desenvolvimento de um aplicativo nativa focado no apadrinhamento de alunos calouros. Implementação de fluxos de integração acadêmica e sistemas de mentoria em tempo real, utilizando Flutter para garantir uma performance fluida em multiplataforma."
        },
        {
          id: 'cspc',
          title: "Técnico em Informática / Dev",
          company: "Colégio São Paulo da Cruz",
          date: "Fev 2025 - Atual",
          status: "Ativo",
          highlights: ["PowerShell", "Microsoft 365", "React", "Linux"],
          description: "Gerenciamento de infraestrutura de laboratórios e servidores. Forte atuação em automação de processos via PowerShell no M365 e manutenção Linux. Paralelamente, atuo no desenvolvimento de soluções web educacionais escaláveis utilizando React e integrações JSON dinâmicas."
        },
        {
          id: 'puc',
          title: "Monitor de Desenvolvimento Web",
          company: "PUC Minas",
          date: "Ago 2025 - Dez 2025",
          status: "Concluído",
          highlights: ["Mentoria", "Code Review", "UI/UX", "Acessibilidade"],
          description: "Auxílio direto aos alunos na disciplina de Desenvolvimento de Interfaces Web. Foco em mentoria técnica, revisão de código e apoio prático na construção de interfaces modernas, acessíveis e baseadas em componentização avançada."
        }
      ]
    },
    en: {
      title: "Journey",
      subtitle: "MY TECHNICAL EVOLUTION",
      desc: "From low-level infrastructures to the development of immersive interfaces, this is the timeline of my career.",
      eduTitle: "Education",
      degree: "Software Engineering",
      uni: "PUC Minas • 2024 - 2027",
      experiences: [
        {
          id: 'agencia-puc',
          title: "Mobile Developer (Flutter)",
          company: "Experimental Agency - PUC Minas",
          date: "Feb 2026 - Present",
          status: "Active",
          highlights: ["Flutter", "Dart", "Firebase", "Mobile UX"],
          description: "Development of a native application focused on mentoring new students. Implementation of academic integration flows and real-time mentoring systems, using Flutter to ensure fluid multiplatform performance."
        },
        {
          id: 'cspc',
          title: "IT Support / Dev Intern",
          company: "Colégio São Paulo da Cruz",
          date: "Feb 2025 - Present",
          status: "Active",
          highlights: ["PowerShell", "Microsoft 365", "React", "Linux"],
          description: "Management of laboratory infrastructure and servers. Strong focus on process automation via PowerShell in M365 and Linux maintenance. Concurrently developing scalable educational web solutions using React and dynamic JSON integrations."
        },
        {
          id: 'puc',
          title: "Web Development TA",
          company: "PUC Minas",
          date: "Aug 2025 - Dec 2025",
          status: "Completed",
          highlights: ["Mentorship", "Code Review", "UI/UX", "Accessibility"],
          description: "Provided direct support to students in the Web Interfaces Development course. Focused on technical mentoring, code review, and practical support in building modern, accessible, and component-based interfaces."
        }
      ]
    }
  };

  const t = content[lang];
  const fadeClass = `transition-all duration-400 ease-in-out ${isFading ? 'opacity-0 translate-y-4 blur-sm scale-[0.99]' : 'opacity-100 translate-y-0 blur-0 scale-100'}`;

  return (
    // Removido o absolute inset-0 e overflow-y-auto antigos
    <section id="experiencias" className="relative w-full min-h-screen py-32 z-10">
      
      {/* Título de Fundo Gigante (Fixo) */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[10vw] md:text-[12vw] font-black text-white/[0.02] tracking-[0.4em] whitespace-nowrap">
          EXPERIÊNCIA
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* ================================================================= */}
        {/* LADO ESQUERDO: STICKY SIDEBAR (Acompanha o Scroll)                */}
        {/* ================================================================= */}
        <div className="lg:w-1/3 relative">
          <div className="lg:sticky lg:top-40 flex flex-col gap-8">
            
            <div className={fadeClass}>
              {/* Bento Card de Identidade e Metadados para garantir a legibilidade */}
              <div className="p-8 md:p-10 bg-[#050505]/70 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
                {/* Efeito sutil de luz neon no fundo */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#0077ff]/10 blur-[50px] group-hover:bg-[#0077ff]/20 transition-colors duration-700"></div>

                <div className="relative z-10 pl-6 md:pl-8">
                  {/* Pílula HUD com posição absoluta: não empurra o texto, apenas flutua à esquerda */}
                  <div className="absolute left-0 top-1.5 w-1.5 h-8 bg-[#0077ff] rounded-full shadow-[0_0_12px_#0077ff]"></div>
                  
                  {/* Título com fonte levemente menor (text-3xl/4xl) para respirar melhor na caixa */}
                  <h2 className="text-3xl md:text-4xl font-extralight tracking-[0.2em] text-white uppercase mb-6">
                    {t.title}
                  </h2>
                  
                  {/* Subtítulo e Metadados agora alinham perfeitamente pelo "pl-6" do contêiner pai */}
                  <span className="block text-[#0077ff] text-[10px] tracking-[0.4em] font-bold uppercase mb-8">
                    {t.subtitle}
                  </span>
                  
                  <div className="space-y-4 pt-8 border-t border-white/5">
                     <div className="flex items-center justify-between text-[10px] tracking-[0.3em] uppercase">
                        <span className="text-zinc-500">Status Atual</span>
                        <span className="text-[#00e5ff] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full animate-pulse shadow-[0_0_8px_#00e5ff]"></span>
                          Dev & Infra
                        </span>
                     </div>
                     <div className="flex items-center justify-between text-[10px] tracking-[0.3em] uppercase">
                        <span className="text-zinc-500">Localização</span>
                        <span className="text-white">Belo Horizonte, MG</span>
                     </div>
                     <div className="flex items-center justify-between text-[10px] tracking-[0.3em] uppercase">
                        <span className="text-zinc-500">Foco Atual</span>
                        <span className="text-white">Flutter & Swift</span>
                     </div>
                  </div>
                </div>
              </div>

              {/* Card de Vidro de Educação para preencher o vácuo vertical à esquerda */}
              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-6 mt-6 backdrop-blur-md">
                <div className="w-12 h-12 rounded-full bg-[#0077ff]/10 border border-[#0077ff]/30 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_15px_#0077ff] transition-shadow duration-500">
                  <span className="text-[#0077ff] font-bold text-xl">P</span>
                </div>
                <div>
                  <h4 className="text-white text-sm tracking-widest uppercase font-medium">{t.eduTitle}: {t.degree}</h4>
                  <p className="text-zinc-500 text-xs tracking-wider mt-1 uppercase">{t.uni}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ================================================================= */}
        {/* LADO DIREITO: TIMELINE DINÂMICA (Move-se com o Scroll)            */}
        {/* ================================================================= */}
        <div className={`lg:w-2/3 relative py-10 ${fadeClass}`} ref={timelineRef}>
          
          {/* Linha de Fundo (Apagada) */}
          <div className="absolute left-4 md:left-[39px] top-0 bottom-0 w-[2px] bg-zinc-800/40"></div>

          {/* Linha Preenchida Animada (Azul Neon) */}
          <motion.div
            className="absolute left-4 md:left-[39px] top-0 w-[2px] bg-[#0077ff] shadow-[0_0_15px_#0077ff] origin-top"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-24 relative z-10">
            {t.experiences.map((exp, index) => (
              
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative pl-14 md:pl-24 group"
              >
                {/* Ponto da Linha do Tempo (Acende no hover e scroll) */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="absolute left-[11px] md:left-[30px] top-8 h-5 w-5 rounded-full bg-[#050505] border-2 border-[#0077ff] flex items-center justify-center group-hover:shadow-[0_0_20px_#0077ff] transition-shadow duration-500"
                >
                  <div className="w-1.5 h-1.5 bg-[#0077ff] rounded-full animate-pulse"></div>
                </motion.div>

                {/* BENTO CARD DA EXPERIÊNCIA COM CONTRASTE REFORÇADO */}
                <div className="p-8 md:p-10 rounded-3xl bg-[#050505]/70 backdrop-blur-xl border border-white/5 hover:border-[#0077ff]/30 shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  
                  {/* Cabeçalho do Card */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-light tracking-tighter text-white uppercase group-hover:text-[#00e5ff] transition-colors duration-500">
                        {exp.title}
                      </h3>
                      <h4 className="text-zinc-400 text-xs md:text-sm tracking-[0.2em] uppercase mt-2 font-medium">
                        {exp.company}
                      </h4>
                    </div>
                    
                    <div className="flex flex-col md:items-end gap-1 flex-shrink-0">
                      <span className={`text-[9px] tracking-widest uppercase font-bold px-3 py-1 rounded-full w-fit ${exp.status === 'Ativo' || exp.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.3)]' : 'bg-white/5 text-zinc-500 border border-white/10'}`}>
                        {exp.status}
                      </span>
                      <span className="text-zinc-500 text-[10px] tracking-widest uppercase">
                        {exp.date}
                      </span>
                    </div>
                  </div>

                  {/* Descrição COM CONTRASTE REFORÇADO */}
                  <p className="text-zinc-300 font-light text-sm md:text-base leading-relaxed text-justify mb-8 group-hover:text-white transition-colors">
                    {exp.description}
                  </p>

                  {/* Pílulas de Engenharia (Destaques) COM CONTRASTE REFORÇADO */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                    {exp.highlights.map((highlight, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-[#0077ff]/5 border border-[#0077ff]/20 text-[#00e5ff] rounded-md text-[9px] md:text-[10px] tracking-widest uppercase font-mono group-hover:bg-[#0077ff]/10 group-hover:shadow-[0_0_10px_#0077ff] transition-all duration-300">
                        {highlight}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}