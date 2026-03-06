import { useState, useEffect } from 'react';
import { getWakatimeData } from '../../services/wakatimeService';

// --- DICIONÁRIO DE TRADUÇÃO ---
// Movido para fora do componente para evitar recriação a cada render
const TRANSLATIONS = {
  pt: {
    title: "Quem Sou Eu",
    subtitle: "Desenvolvedor • Analista de Infra • Tech Entusiasta",
    p1: <>Sou estudante de <strong className="text-white font-normal">Engenharia de Software na PUC Minas</strong> e atualmente atuo na área de Suporte de TI e Desenvolvimento. Minha trajetória é marcada por uma paixão dupla: entender como as máquinas funcionam no baixo nível e construir soluções modernas na web.</>,
    p2: <>No dia a dia, gerencio infraestruturas de servidores e automatizo processos complexos. Ao mesmo tempo, dou vida a aplicações completas, fluindo entre o front-end com <span className="text-[#0077ff] font-medium">React e Tailwind CSS</span> e a robustez do back-end utilizando <span className="text-[#0077ff] font-medium">C# e .NET</span>.</>,
    p3: "Fora do terminal e das IDEs, sou um aficionado por montagem e otimização de hardware (PC Building) e dedico meu tempo livre a jogos competitivos e de sobrevivência. Acredito que a tecnologia deve ser tanto performática quanto visualmente impactante.",
    stackTitle: "Stack Principal",
    infraTitle: "Infra & Tools",
    statsBtn: "STATS",
    minimizeBtn: "MINIMIZAR",
    devAnalytics: "Dev Analytics",
    stackDist: "Distribuição de Stack",
    workspace: "Workspace",
    catTitle: "Categorias",
    sysTitle: "Sistemas",
    editorsTitle: "Editores",
    loading: "Carregando dados do WakaTime...",
    error: "Não foi possível carregar as métricas no momento.",
    prod: "Produtividade",
    totalTime: "Tempo Total Monitorado",
    avgTime: "Média de Código / Dia",
    hrs: "hrs",
    h: "h",
    m: "m"
  },
  en: {
    title: "About Me",
    subtitle: "Developer • Infra Analyst • Tech Enthusiast",
    p1: <>I am a <strong className="text-white font-normal">Software Engineering student at PUC Minas</strong>, currently working in IT Support and Development. My journey is driven by a dual passion: understanding how machines work at a low level and building modern web solutions.</>,
    p2: <>On a daily basis, I manage server infrastructures and automate complex processes. At the same time, I bring full applications to life, flowing between the front-end with <span className="text-[#0077ff] font-medium">React and Tailwind CSS</span> and the robustness of the back-end using <span className="text-[#0077ff] font-medium">C# and .NET</span>.</>,
    p3: "Outside the terminal and IDEs, I'm an aficionado for hardware assembly and optimization (PC Building), and I spend my free time on competitive and survival games. I believe technology should be both performant and visually impactful.",
    stackTitle: "Main Stack",
    infraTitle: "Infra & Tools",
    statsBtn: "STATS",
    minimizeBtn: "MINIMIZE",
    devAnalytics: "Dev Analytics",
    stackDist: "Stack Distribution",
    workspace: "Workspace",
    catTitle: "Categories",
    sysTitle: "Systems",
    editorsTitle: "Editors",
    loading: "Loading WakaTime data...",
    error: "Could not load metrics at this time.",
    prod: "Productivity",
    totalTime: "Total Tracked Time",
    avgTime: "Avg Coding / Day",
    hrs: "hrs",
    h: "h",
    m: "m"
  }
};

export default function AboutSection({ section }) {
  // --- NAVEGAÇÃO E SCROLL ---
  const sections = ['home', 'projetos', 'sobre', 'experiencias', 'contato'];
  const currentIndex = sections.indexOf(section);
  const myIndex = 2; 

  let positionClass = 'translate-x-[100vw] opacity-0 pointer-events-none';
  if (currentIndex === myIndex) positionClass = 'translate-x-0 opacity-100 pointer-events-auto';
  else if (currentIndex > myIndex) positionClass = '-translate-x-[100vw] opacity-0 pointer-events-none';

  // --- ESTADOS ---
  const [lang, setLang] = useState('pt');
  const [isFading, setIsFading] = useState(false); 
  const [showWakatime, setShowWakatime] = useState(false);
  
  const [wakaData, setWakaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

// --- EFEITOS (API FETCH) ---
  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      setIsLoading(true);
      setHasError(false);
      
      const data = await getWakatimeData();
      
      if (isMounted) {
        if (data) {
// 1. Processamento das Estatísticas de Tempo (Activity)
          let totalSeconds = 0;
          let avgSeconds = 0;

          // Cenário A: O WakaTime retornou um Array (lista de dias)
          if (Array.isArray(data.activity)) {
            data.activity.forEach(day => {
              totalSeconds += day?.grand_total?.total_seconds || day?.total_seconds || 0;
            });
            const daysCount = data.activity.length > 0 ? data.activity.length : 1;
            avgSeconds = totalSeconds / daysCount;
          } 
          // Cenário B: O JSON consolidado que você enviou (All Time)
          else if (data.activity?.grand_total) {
            // Pegamos os valores exatos calculados pelo WakaTime
            totalSeconds = data.activity.grand_total.total_seconds || 0;
            avgSeconds = data.activity.grand_total.daily_average || 0;
          }

          const stats = {
            // Isso vai resultar nos seus "191 hrs"
            totalHours: Math.floor(totalSeconds / 3600),
            // Isso vai resultar em "1 hr 50 mins" (baseado nos 6641s da média)
            avgH: Math.floor(avgSeconds / 3600),
            avgM: Math.floor((avgSeconds % 3600) / 60)
          };

          // 2. Setando os dados no Estado
          setWakaData({
            languages: Array.isArray(data.languages) ? data.languages.slice(0, 5) : [],
            os: Array.isArray(data.os) ? data.os.slice(0, 3) : [], 
            categories: Array.isArray(data.categories) ? data.categories.slice(0, 3) : [],
            stats: stats 
          });
        } else {
          setHasError(true);
        }
        setIsLoading(false);
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  // --- FUNÇÕES ---
  const handleLangChange = (newLang) => {
    if (newLang === lang) return; 
    setIsFading(true); 
    setTimeout(() => {
      setLang(newLang);
      setIsFading(false);
    }, 400);
  };

  const t = TRANSLATIONS[lang];
  const fadeClass = `transition-all duration-400 ease-in-out ${isFading ? 'opacity-0 translate-y-4 blur-sm scale-[0.99]' : 'opacity-100 translate-y-0 blur-0 scale-100'}`;

  // --- RENDERIZAÇÃO ---
  return (
    <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${positionClass}`}>
      
      {/* TÍTULO GIGANTE DE FUNDO */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[12vw] font-black text-white/[0.02] tracking-[0.4em] whitespace-nowrap">SOBRE MIM</h2>
      </div>

      <div className="relative z-10 w-full h-full overflow-y-auto pb-32 scroll-smooth">
        <div className="h-[15vh] w-full pointer-events-none"></div>

        {/* --- HEADER (TÍTULO E IDIOMAS) --- */}
        <div className="max-w-6xl mx-auto px-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-20">
          <div className={fadeClass}>
            <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.3em] text-white uppercase border-l-2 border-[#0077ff] pl-6 transition-all duration-500">
              {t.title}
            </h2>
            <p className="mt-4 text-zinc-500 tracking-[0.2em] text-xs md:text-sm font-light uppercase pl-6 transition-all duration-500">
              {t.subtitle}
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-xs tracking-[0.3em] font-light pl-6 md:pl-0">
            <button onClick={() => handleLangChange('pt')} className={`transition-all duration-300 ${lang === 'pt' ? 'text-[#0077ff] font-bold drop-shadow-[0_0_8px_rgba(0,119,255,0.6)]' : 'text-zinc-500 hover:text-white'}`}>PT</button>
            <span className="text-zinc-700">/</span>
            <button onClick={() => handleLangChange('en')} className={`transition-all duration-300 ${lang === 'en' ? 'text-[#0077ff] font-bold drop-shadow-[0_0_8px_rgba(0,119,255,0.6)]' : 'text-zinc-500 hover:text-white'}`}>EN</button>
          </div>
        </div>

        {/* --- CORPO PRINCIPAL (TEXTO + CARDS) --- */}
        <div className={`max-w-6xl mx-auto px-8 relative z-20 flex flex-col lg:flex-row gap-8 lg:gap-12 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${fadeClass}`}>
          
          {/* COLUNA ESQUERDA: Biografia */}
          <div className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-left flex-shrink-0 ${showWakatime ? 'w-0 lg:w-0 opacity-0 overflow-hidden m-0 p-0 border-0' : 'w-full lg:w-[58%] opacity-100'}`}>
            <div className="w-full lg:w-[600px] p-8 md:p-10 rounded-2xl bg-[#050505]/60 backdrop-blur-md border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <p className="text-zinc-400 font-light tracking-widest text-sm md:text-base leading-relaxed text-justify mb-6">{t.p1}</p>
              <p className="text-zinc-400 font-light tracking-widest text-sm md:text-base leading-relaxed text-justify mb-6">{t.p2}</p>
              <p className="text-zinc-400 font-light tracking-widest text-sm md:text-base leading-relaxed text-justify">{t.p3}</p>
            </div>
          </div>

          {/* COLUNA DIREITA: Interatividade (Stack e Infra) */}
          <div className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col flex-grow ${showWakatime ? 'w-full lg:w-full gap-0' : 'w-full lg:w-[42%] gap-8'}`}>
            
            {/* CARD 1: STACK / DASHBOARD WAKATIME */}
            <div className={`relative flex-shrink-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] rounded-2xl overflow-hidden ${
              showWakatime 
                ? 'h-[850px] lg:h-[500px] bg-[#050505]/95 backdrop-blur-2xl border border-[#0077ff]/40 shadow-[0_0_80px_rgba(0,119,255,0.2)]' 
                : 'h-[250px] bg-[#050505]/80 backdrop-blur-xl border border-white/5'
            }`}>
              
              {/* --- MODO: COMPACTO (Visão Inicial) --- */}
              <div className={`absolute inset-0 p-8 flex flex-col transition-all duration-500 ease-in-out ${showWakatime ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto delay-300'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white text-sm tracking-[0.3em] font-medium uppercase flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#0077ff] rounded-full shadow-[0_0_8px_#0077ff]"></span>
                    {t.stackTitle}
                  </h3>
                  
                  <button 
                    onClick={() => setShowWakatime(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs tracking-[0.3em] font-light uppercase text-zinc-500 hover:text-white hover:border-white transition-all duration-300 group"
                  >
                    {t.statsBtn}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-500 group-hover:text-white transition-colors">
                      <rect x="3" y="12" width="4" height="8">
                        <animate attributeName="y" values="12;4;12" dur="1s" repeatCount="indefinite" />
                        <animate attributeName="height" values="8;16;8" dur="1s" repeatCount="indefinite" />
                      </rect>
                      <rect x="10" y="6" width="4" height="14">
                        <animate attributeName="y" values="6;14;6" dur="0.8s" repeatCount="indefinite" />
                        <animate attributeName="height" values="14;6;14" dur="0.8s" repeatCount="indefinite" />
                      </rect>
                      <rect x="17" y="10" width="4" height="10">
                        <animate attributeName="y" values="10;2;10" dur="1.2s" repeatCount="indefinite" />
                        <animate attributeName="height" values="10;18;10" dur="1.2s" repeatCount="indefinite" />
                      </rect>
                    </svg>
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {['React', 'Tailwind CSS', 'C#', '.NET', 'JavaScript', 'HTML/CSS', 'SQL', 'C / C++'].map((skill, i) => (
                    <span key={i} className="px-4 py-2 text-xs font-light tracking-widest text-zinc-400 uppercase border border-zinc-800 rounded-full cursor-default hover:text-[#00e5ff] hover:border-[#00e5ff] transition-all">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* --- MODO: DASHBOARD EXPANDIDO --- */}
              <div className={`absolute inset-0 pt-8 md: p-12 flex flex-col transition-all duration-500 ease-in-out overflow-hidden ${showWakatime ? 'opacity-100 scale-100 pointer-events-auto delay-[400ms]' : 'opacity-0 scale-105 pointer-events-none'}`}>
                
                {/* Header do Dashboard */}
                <div className="flex flex-col md:flex-row justify-between md:items-start border-b border-[#0077ff]/20 pb-5 mb-6 gap-4">
                  <div className="flex items-start gap-4">
                    <span className="w-3 h-3 bg-[#0077ff] rounded-full animate-pulse shadow-[0_0_12px_#0077ff] mt-1.5"></span>
                    <div>
                      <h2 className="text-white tracking-[0.4em] uppercase text-sm md:text-lg font-light">{t.devAnalytics}</h2>
                      <p className="font-mono text-[#00e5ff] text-[10px] md:text-xs tracking-widest mt-2 flex items-center opacity-80">
                      </p>
                    </div>
                  </div>
                  
                <button 
                  onClick={() => setShowWakatime(false)}
                  // Adicionei mt-1.5 para dar um leve empurrão
                  className="text-zinc-500 hover:text-white text-[15px] tracking-[0.2em] uppercase transition-colors mt-1"
                >
                  [ {t.minimizeBtn} ]
                </button>
                </div>

                {/* Grid Interno do Dashboard */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-10">
                  
                  {isLoading ? (
                    <div className="lg:col-span-3 flex items-center justify-center h-full text-zinc-500 text-xs tracking-widest animate-pulse">
                      {t.loading}
                    </div>
                  ) : hasError ? (
                    <div className="lg:col-span-3 flex items-center justify-center h-full text-red-400/80 text-xs tracking-widest">
                      {t.error}
                    </div>
                  ) : (
                    <>
                  {/* Bloco 1: Linguagens + Sistemas Operacionais (Esquerda) */}
                  <div className="lg:col-span-2 flex flex-col justify-between h-full">
                    
                    {/* Topo: Linguagens */}
                    <div className="flex-1">
                      <h3 className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mb-4">{t.stackDist}</h3>
                      <div className="flex flex-col gap-3"> {/* Mudei de gap-4 para gap-3 aqui */}
                        {wakaData.languages.map((lang, idx) => (
                          <div key={idx} className="flex flex-col gap-1.5 w-full">
                            <div className="flex justify-between items-end w-full">
                              <span className="text-xs tracking-widest uppercase font-medium" style={{ color: lang.color, textShadow: `0 0 10px ${lang.color}80` }}>
                                {lang.name}
                              </span>
                              <span className="text-white text-xs font-light">{lang.percent}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-[1500ms] ease-out"
                                   style={{ width: showWakatime ? `${lang.percent}%` : '0%', backgroundColor: lang.color, boxShadow: `0 0 15px ${lang.color}` }}>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fundo: Sistemas Operacionais */}
                    <div className="mt-4 pt-4 border-t border-white/5"> {/* Reduzi o mt e pt aqui */}
                      <h3 className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mb-3">{t.sysTitle}</h3>
                      <div className="flex flex-col md:flex-row gap-4 w-full">
                        {wakaData.os.map((sys, idx) => (
                          <div key={idx} className="flex-1 bg-white/[0.02] border border-white/5 rounded-lg p-3">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] tracking-widest text-zinc-300 uppercase">{sys.name}</span>
                              <span className="text-[10px] font-light" style={{ color: sys.color }}>{sys.percent}%</span>
                            </div>
                            <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-[1500ms] ease-out"
                                   style={{ width: showWakatime ? `${sys.percent}%` : '0%', backgroundColor: sys.color, boxShadow: `0 0 10px ${sys.color}` }}>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Bloco 2: Produtividade e Categorias (Direita) */}
                  <div className="lg:col-span-1 flex flex-col justify-start h-full">
                    
                    {/* Horas Totais e Média Diária */}
                    {wakaData.stats && (
                      <div className="mb-8">
                        <h3 className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mb-4">{t.prod}</h3>
                        <div className="bg-[#0077ff]/5 border border-[#0077ff]/20 rounded-xl p-4 relative overflow-hidden mb-4">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-[#0077ff] blur-[40px] opacity-20"></div>
                          <span className="text-zinc-400 text-[9px] tracking-[0.2em] uppercase block mb-1">{t.totalTime}</span>
                          <span className="text-white text-xl font-light tracking-wider">
                            {wakaData.stats.totalHours}<span className="text-[#0077ff] text-xs ml-1">{t.hrs}</span>
                          </span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                          <span className="text-zinc-400 text-[9px] tracking-[0.2em] uppercase block mb-1">{t.avgTime}</span>
                          <span className="text-white text-lg font-light tracking-wider">
                            {wakaData.stats.avgH}<span className="text-zinc-500 text-[10px] ml-1 mr-2">{t.h}</span>
                            {wakaData.stats.avgM}<span className="text-zinc-500 text-[10px] ml-1">{t.m}</span>
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Categorias (Workspace) */}
                    <div>
                      <h3 className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mb-4">{t.workspace}</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <span className="text-[9px] text-zinc-600 uppercase tracking-widest block mb-1">{t.catTitle}</span>
                          {wakaData.categories.map((cat, i) => (
                            <div key={i} className="flex justify-between items-center text-[10px] tracking-widest">
                              <span className="text-zinc-300">{cat.name}</span>
                              <span style={{ color: cat.color }}>{cat.percent}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                  </div>
                    </>
                  )}
                </div>

              </div>
            </div>

            {/* CARD 2: INFRA & TOOLS */}
            <div className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform origin-top overflow-hidden rounded-2xl bg-[#050505]/80 backdrop-blur-xl border-white/5 ${
              showWakatime ? 'h-0 opacity-0 scale-95 border-transparent p-0' : 'h-[220px] opacity-100 scale-100 p-8 border'
            }`}>
              <h3 className="text-white text-sm tracking-[0.3em] font-medium uppercase mb-6 flex items-center gap-3">
                <span className="w-2 h-2 bg-[#0077ff] rounded-full shadow-[0_0_8px_#0077ff]"></span>
                {t.infraTitle}
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Ubuntu Server', 'CasaOS', 'PowerShell', 'Microsoft 365', 'Git', 'Hardware Setup'].map((tool, i) => (
                  <span key={i} className="px-4 py-2 text-xs font-light tracking-widest uppercase border border-zinc-800/50 text-zinc-500 rounded-full cursor-default hover:border-[#0077ff] hover:text-white transition-all duration-300">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}