import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, SiTypescript, SiJavascript, SiTailwindcss, SiSwift, SiApple, 
  SiNodedotjs, SiDotnet, SiPostgresql, SiLinux, SiDocker, 
  SiCplusplus, SiC, SiSpringboot, SiVercel, SiGit 
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { getWakatimeData } from '../services/wakatimeService.js';

const TRANSLATIONS = {
  pt: {
    heroTitle: "CRIANDO PRODUTOS.",
    heroSubtitle: "ESCALANDO INFRA.",
    bio: "Estudante de Engenharia de Software na PUC Minas. Fluo entre o desenvolvimento mobile nativo, front-ends imersivos e a arquitetura de servidores de baixo nível.",
    stackTitle: "Arsenal Técnico",
    statsTitle: "Métricas de Código",
    hoursLabel: "HORAS DE CÓDIGO",
    periodLabel: "HISTÓRICO TOTAL",
    topLanguages: "Top 5 Linguagens",
  },
  en: {
    heroTitle: "CRAFTING PRODUCTS.",
    heroSubtitle: "SCALING INFRA.",
    bio: "Software Engineering student at PUC Minas. I flow between native mobile development, immersive front-ends, and low-level server architecture.",
    stackTitle: "Technical Arsenal",
    statsTitle: "Coding Metrics",
    hoursLabel: "HOURS CODED",
    periodLabel: "ALL TIME",
    topLanguages: "Top 5 Languages",
  }
};

// 1. ÍCONES COLORIDOS POR PADRÃO: Passamos a cor diretamente para o style
const TechIcon = ({ Icon, name, color }) => (
  <div className="group relative flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
    <Icon 
      className="text-2xl md:text-3xl transition-all duration-500 group-hover:scale-110" 
      style={{ color: color, filter: `drop-shadow(0 0 8px ${color}40)` }} 
    />
    <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] tracking-widest text-zinc-400 uppercase whitespace-nowrap">
      {name}
    </span>
  </div>
);

export default function AboutSection() {
  const [lang, setLang] = useState('pt');
  const [wakaData, setWakaData] = useState(null);
  const t = TRANSLATIONS[lang];

  // 2. CORREÇÃO DO WAKATIME BASEADA NO SEU JSON REA
  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      const data = await getWakatimeData();
      if (data && isMounted) {
        
        // Acessamos o total de segundos diretamente do grand_total do JSON
        const totalSeconds = data.activity?.grand_total?.total_seconds || 0;
        
        setWakaData({
          // Converte os segundos para horas
          totalHours: Math.floor(totalSeconds / 3600),
          // Pega as top 5 linguagens
          languages: data.languages?.slice(0, 5) || [],
        });
      }
    };
    fetchStats();
    
    return () => { isMounted = false; };
  }, []);

  return (
    <div id="sobre" className="w-full">
      {/* --- TELA 1: QUEM SOU EU & STACK (BENTO BOX) --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-8 md:px-24">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Esquerda: Bio Minimalista */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
                {t.heroTitle}<br />
                <span className="text-[#0077ff]">{t.heroSubtitle}</span>
              </h2>
              <p className="mt-8 text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-md">
                {t.bio}
              </p>
            </motion.div>
          </div>

          {/* Direita: Bento Card de Tecnologia */}
          <div className="lg:col-span-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 bg-[#050505]/60 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl"
            >
              <h3 className="text-xs tracking-[0.3em] text-zinc-500 uppercase mb-8 flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#0077ff] rounded-full"></span>
                {t.stackTitle}
              </h3>
              <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
                <TechIcon Icon={SiReact} name="React" color="#61DAFB" />
                <TechIcon Icon={SiSwift} name="Swift" color="#F05138" />
                <TechIcon Icon={TbBrandCSharp} name="C#" color="#239120" />
                <TechIcon Icon={SiNodedotjs} name="Node" color="#339933" />
                <TechIcon Icon={SiTypescript} name="TS" color="#3178C6" />
                <TechIcon Icon={SiTailwindcss} name="Tailwind" color="#06B6D4" />
                <TechIcon Icon={SiLinux} name="Linux" color="#FCC624" />
                <TechIcon Icon={SiDocker} name="Docker" color="#2496ED" />
                <TechIcon Icon={SiCplusplus} name="C++" color="#00599C" />
                <TechIcon Icon={SiSpringboot} name="Spring" color="#6DB33F" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- TELA 2: WAKATIME (INFOGRÁFICO PREMIUM) --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-8 md:px-24 bg-gradient-to-b from-black to-[#050505]">
        <div className="max-w-5xl w-full">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-white tracking-[0.4em] uppercase text-xl font-light">{t.statsTitle}</h2>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Horas Totais */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col items-center justify-center text-center"
            >
              <span className="text-7xl md:text-8xl font-black text-white tracking-tighter mb-2">
                {wakaData ? wakaData.totalHours : '...'}
              </span>
              <span className="text-[#0077ff] text-xs tracking-[0.3em] font-bold uppercase">{t.hoursLabel}</span>
              <span className="text-zinc-600 text-[10px] mt-4 uppercase tracking-widest">{t.periodLabel}</span>
            </motion.div>

            {/* Card 2: Top Languages */}
            <div className="md:col-span-2 p-10 bg-white/[0.02] border border-white/5 rounded-3xl">
              <h3 className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mb-8">{t.topLanguages}</h3>
              <div className="space-y-6">
                {wakaData?.languages.map((lang, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between text-xs tracking-widest uppercase mb-2">
                      {/* O nome da linguagem */}
                      <span className="text-zinc-300 group-hover:text-white transition-colors">{lang.name}</span>
                      <span className="text-white font-mono">{lang.percent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                        className="h-full rounded-full"
                        // Aqui usamos a cor que vem direto da WakaTime API!
                        style={{ backgroundColor: lang.color, boxShadow: `0 0 15px ${lang.color}80` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}