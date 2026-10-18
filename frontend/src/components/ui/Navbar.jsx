import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const navItems = [
  { id: 'home', pt: 'Início', en: 'Home' },
  { id: 'studio', pt: 'Sobre', en: 'About' },
  { id: 'work', pt: 'Projetos', en: 'Projects' },
  { id: 'tech', pt: 'Stack', en: 'Stack' },
  { id: 'experiencias', pt: 'Experiência', en: 'Experience' },
  { id: 'contato', pt: 'Contato', en: 'Contact' },
];

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // --- LÓGICA DO SCROLL SPY ---
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sectionIds = navItems.map((item) => item.id);
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0b0f]/75 backdrop-blur-xl border-b border-white/[0.06] py-3.5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* LADO ESQUERDO: Identidade Minimalista */}
        <div
          onClick={() => scrollToSection('home')}
          className="cursor-pointer group flex items-center gap-2.5"
        >
          <span className="font-['JetBrains_Mono'] text-xs text-[#749bff] transition-transform duration-300 group-hover:rotate-90">
            ✦
          </span>
          <span className="text-[#f8f9fc] font-medium tracking-tight text-sm md:text-base">
            Gabriel Lopes
          </span>
          <span className="hidden sm:inline-block font-['JetBrains_Mono'] text-[11px] text-[#6a6d78]">
            / fullstack
          </span>
        </div>

        {/* CENTRO: Links em Pílula Fluida (Estilo antigravity.google) */}
        <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#b7bfd9]/[0.06] border border-white/[0.06] backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-normal tracking-wide transition-colors duration-300 cursor-pointer ${
                  isActive ? 'text-white font-medium' : 'text-[#b2bbc5] hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="ag-light-pill"
                    className="absolute inset-0 bg-[#b7bfd9]/[0.14] rounded-full"
                    transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{lang === 'pt' ? item.pt : item.en}</span>
              </button>
            );
          })}
        </div>

        {/* LADO DIREITO: Links Rápidos + Idioma (Sem botão de áudio) */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://www.linkedin.com/in/gabrielvictorsouza/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden sm:flex items-center justify-center p-2 rounded-full bg-[#b7bfd9]/[0.07] border border-white/[0.06] hover:bg-[#b7bfd9]/[0.15] text-[#b2bbc5] hover:text-[#749bff] transition-all"
          >
            <FiLinkedin size={13} />
          </a>

          <a
            href="https://github.com/GabrielVSL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden sm:flex items-center justify-center p-2 rounded-full bg-[#b7bfd9]/[0.07] border border-white/[0.06] hover:bg-[#b7bfd9]/[0.15] text-[#b2bbc5] hover:text-white transition-all"
          >
            <FiGithub size={13} />
          </a>

          <button
            onClick={toggleLang}
            className="font-['JetBrains_Mono'] text-[11px] px-3 py-1.5 rounded-full bg-[#b7bfd9]/[0.07] border border-white/[0.06] hover:bg-[#b7bfd9]/[0.15] text-[#f8f9fc] transition-all cursor-pointer"
          >
            {lang === 'pt' ? 'PT' : 'EN'}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}