import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export default function ContactSection() {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("gabrieelvictor26@gmail.com"); // Troque pelo seu email real
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const t = {
    pt: {
      title: "Conexão",
      subtitle: "ESTABELECER TRANSMISSÃO",
      desc: "Interessado em colaborar ou apenas quer trocar uma ideia sobre engenharia?",
      cvBtn: "Baixar Currículo (PDF)",
      copyBtn: "Copiar Email",
      copied: "Copiado!",
      location: "Belo Horizonte, MG",
      status: "Engenharia de Software • PUC Minas"
    },
    en: {
      title: "Connection",
      subtitle: "ESTABLISH TRANSMISSION",
      desc: "Interested in collaborating or just want to chat about engineering?",
      cvBtn: "Download Resume (PDF)",
      copyBtn: "Copy Email",
      copied: "Copied!",
      location: "Belo Horizonte, Brazil",
      status: "Software Engineering • PUC Minas"
    }
  };

  const content = t[lang];

  return (
    <section id="contato" className="relative w-full min-h-screen py-32 flex items-center justify-center px-8">
      <div className="max-w-4xl w-full">
        
        {/* CARD BENTO DE CONTATO (ESTILO HUD) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#050505]/70 border border-white/10 rounded-[2.5rem] p-8 md:p-16 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
        >
          {/* Efeito de luz neon no topo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#0077ff] to-transparent shadow-[0_0_20px_#0077ff]"></div>

          <div className="text-center space-y-6">
            <span className="text-[#0077ff] text-[10px] tracking-[0.5em] font-bold uppercase">
              {content.subtitle}
            </span>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter text-white uppercase">
              {content.title}
            </h2>
            <p className="max-w-md mx-auto text-zinc-400 font-light text-sm md:text-base leading-relaxed tracking-widest">
              {content.desc}
            </p>
          </div>

          {/* GRID DE AÇÕES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
            
            {/* Botão de Currículo (O seu pedido) */}
            <a 
              href="/seu-curriculo.pdf" // Caminho para o seu PDF na pasta public
              download="Gabriel_Souza_CV.pdf"
              className="group relative p-6 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between hover:border-[#0077ff]/50 transition-all duration-500"
            >
              <div className="flex flex-col gap-1">
                <span className="text-white text-xs font-bold tracking-widest uppercase">{content.cvBtn}</span>
                <span className="text-zinc-500 text-[9px] uppercase tracking-tighter">PDF • 1.2 MB</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#0077ff]/10 flex items-center justify-center group-hover:bg-[#0077ff] transition-colors duration-500">
                <svg className="w-4 h-4 text-[#00e5ff] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </a>

            {/* Botão de Copiar Email */}
            <button 
              onClick={copyEmail}
              className="group relative p-6 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between hover:border-[#00e5ff]/50 transition-all duration-500"
            >
              <div className="flex flex-col gap-1 text-left">
                <span className="text-white text-xs font-bold tracking-widest uppercase">
                  {copied ? content.copied : content.copyBtn}
                </span>
                <span className="text-zinc-500 text-[9px] uppercase tracking-tighter">gabrieelvictor26@gmail.com</span>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${copied ? 'bg-green-500' : 'bg-white/5 group-hover:bg-white/10'}`}>
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {copied ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                  )}
                </svg>
              </div>
            </button>

          </div>

          {/* FOOTER DO CARD: Dados do Sistema */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-zinc-600 text-[8px] tracking-[0.3em] uppercase font-bold">Location</span>
                <span className="text-zinc-400 text-[10px] tracking-widest uppercase">{content.location}</span>
              </div>
              <div className="w-[1px] h-6 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-zinc-600 text-[8px] tracking-[0.3em] uppercase font-bold">Status</span>
                <span className="text-zinc-400 text-[10px] tracking-widest uppercase">{content.status}</span>
              </div>
            </div>

            {/* Links de Redes Sociais */}
            <div className="flex gap-6">
              <a href="#" className="text-zinc-500 hover:text-[#0077ff] text-[10px] tracking-[0.3em] uppercase transition-colors">LinkedIn</a>
              <a href="#" className="text-zinc-500 hover:text-[#0077ff] text-[10px] tracking-[0.3em] uppercase transition-colors">GitHub</a>
              <a href="#" className="text-zinc-500 hover:text-[#0077ff] text-[10px] tracking-[0.3em] uppercase transition-colors">Instagram</a>
            </div>
          </div>

        </motion.div>

        {/* Assinatura Final de Copyright */}
        <div className="mt-12 text-center">
          <p className="text-zinc-800 text-[9px] tracking-[1em] uppercase">
            © 2026 Gabriel Souza • Designed to Scale
          </p>
        </div>

      </div>
    </section>
  );
}