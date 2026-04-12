import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projectsData = [
  {
    id: 'orderly',
    tag: "FULLSTACK",
    title: "Orderly",
    tech: ["Node.js", "Express", "React", "PostgreSQL"],
    videoWebm: "URL_DO_VIDEO.webm",
    videoMp4: "URL_DO_VIDEO.mp4",
    engineering: "Arquitetura escalável com Context API agindo como única fonte de verdade.",
    fullDescription: "Sistema de gestão de pedidos com sincronização de estado global e persistência via Sequelize.",
    linkSite: "https://orderly-online.vercel.app/",
    linkGithub: "https://github.com/GabrielVSL/Orderly"
  },
  {
    id: 'plantei',
    tag: "FRONTEND AVANÇADO",
    title: "Plantei!",
    tech: ["React", "Tailwind", "Framer Motion"],
    videoWebm: "URL_DO_VIDEO.webm",
    videoMp4: "URL_DO_VIDEO.mp4",
    engineering: "Interface imersiva com motor de animações otimizado para renderização 60fps.",
    fullDescription: "Aplicação educacional com feedback visual dinâmico para acompanhamento botânico.",
    linkSite: "#",
    linkGithub: "#"
  },
  {
    id: 'samba-ad',
    tag: "INFRA & NETWORKS",
    title: "Samba AD",
    tech: ["CasaOS", "Docker", "Samba", "Linux"],
    videoWebm: "URL_DO_VIDEO.webm",
    videoMp4: "URL_DO_VIDEO.mp4",
    engineering: "Infraestrutura conteinerizada para gestão de domínios e credenciais acadêmicas.",
    fullDescription: "Implementação de Active Directory unificado utilizando Docker no ecossistema CasaOS.",
    linkSite: "#",
    linkGithub: "#"
  },
  {
    id: 'planing',
    tag: "MOBILE NATIVO",
    title: "Planing iOS",
    tech: ["Swift", "SwiftUI", "SwiftData", "MVVM"],
    videoWebm: "URL_DO_VIDEO.webm",
    videoMp4: "URL_DO_VIDEO.mp4",
    engineering: "Arquitetura MVVM nativa com integração profunda ao SwiftData para persistência.",
    fullDescription: "App iOS de alta performance seguindo rigorosamente os padrões de design da Apple.",
    linkSite: "#",
    linkGithub: "#"
  }
];

export default function ProjectsSection() {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"] 
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} id="projetos" className="relative h-[400vh] bg-transparent">
      
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        <motion.div 
          style={{ x }} 
          className="flex w-[400vw] will-change-transform"
        >
          {projectsData.map((proj) => (
            <div 
              key={proj.id} 
              className="w-screen h-screen flex items-center justify-center p-6 md:p-12 lg:p-24 flex-shrink-0"
            >
              
              <div className="relative w-full h-full max-h-[85vh] rounded-3xl overflow-hidden flex flex-col md:flex-row bg-[#050505] border border-white/10 shadow-2xl">
                
                {/* LADO ESQUERDO: Visual / Vídeo */}
                <div className="w-full md:w-3/5 h-1/2 md:h-full relative bg-zinc-950 flex-shrink-0">
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
                    <source src={proj.videoWebm} type="video/webm" />
                    <source src={proj.videoMp4} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#050505]/40 to-[#050505] pointer-events-none" />
                </div>

                {/* LADO DIREITO: Informações Técnicas (COMPACTADO) */}
                <div className="w-full md:w-2/5 h-1/2 md:h-full p-6 lg:p-10 flex flex-col justify-between bg-[#050505]">
                  
                  {/* Bloco Superior */}
                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="text-[#0077ff] text-[9px] md:text-[10px] tracking-[0.4em] font-bold uppercase block mb-1">{proj.tag}</span>
                      <h3 className="text-3xl md:text-4xl font-light tracking-tighter text-white uppercase">{proj.title}</h3>
                    </div>
                    
                    <div className="p-4 bg-[#0077ff]/5 border border-[#0077ff]/20 rounded-xl">
                      <h4 className="text-[8px] md:text-[9px] tracking-[0.3em] text-[#0077ff] uppercase mb-1.5 font-bold">Engenharia Aplicada</h4>
                      <p className="text-zinc-300 text-[11px] md:text-xs leading-relaxed">{proj.engineering}</p>
                    </div>
                    
                    {/* line-clamp-3 garante que o texto pare na 3ª linha e coloque "..." */}
                    <p className="text-zinc-500 text-[11px] md:text-xs leading-relaxed line-clamp-3">{proj.fullDescription}</p>
                  </div>

                  {/* Bloco Inferior (Stack e Botões) */}
                  <div className="flex flex-col gap-4 mt-auto pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tech.map((t, i) => (
                        <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[9px] md:text-[10px] text-zinc-400 tracking-widest uppercase">{t}</span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 border-t border-white/5 pt-4">
                      {proj.linkSite && proj.linkSite !== "#" && (
                        <a href={proj.linkSite} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-[#0077ff] hover:bg-blue-600 text-white text-center text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase rounded-xl transition-colors">
                          Live Deploy
                        </a>
                      )}
                      {proj.linkGithub && proj.linkGithub !== "#" && (
                        <a href={proj.linkGithub} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-center text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase rounded-xl transition-colors">
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}