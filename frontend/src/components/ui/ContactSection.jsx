import { useState } from 'react';

export default function ContactSection({ section }) {
  const sections = ['home', 'projetos', 'sobre', 'experiencias', 'contato'];
  const currentIndex = sections.indexOf(section);
  const myIndex = 4;

  const [lang, setLang] = useState('pt');
  const [isFading, setIsFading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleLangChange = (newLang) => {
    if (newLang === lang) return;
    setIsFading(true); 
    setTimeout(() => {
      setLang(newLang);
      setIsFading(false);
    }, 400);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "d5a04544-fff6-4c80-b7e6-9aa689749976",
          ...formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  let positionClass = 'translate-x-[100vw] opacity-0 pointer-events-none';
  if (currentIndex === myIndex) positionClass = 'translate-x-0 opacity-100 pointer-events-auto';
  else if (currentIndex > myIndex) positionClass = '-translate-x-[100vw] opacity-0 pointer-events-none';

  const content = {
    pt: {
      title: "Contato",
      subtitle: "Vamos construir algo juntos?",
      talk: "Fale Comigo",
      desc: "Estou sempre aberto a novas oportunidades, projetos desafiadores ou apenas um bom bate-papo sobre tecnologia e hardware.",
      nameLabel: "Seu Nome",
      emailLabel: "Seu E-mail",
      messageLabel: "Sua Mensagem",
      btnIdle: "ENVIAR MENSAGEM",
      btnLoading: "ENVIANDO DADOS...",
      btnError: "ERRO AO ENVIAR.",
      successTitle: "SINAL RECEBIDO",
      successDesc: "Sua mensagem foi entregue com sucesso. Retornarei o mais breve possível!",
    },
    en: {
      title: "Contact",
      subtitle: "Let's build something together?",
      talk: "Get in Touch",
      desc: "I'm always open to new opportunities, challenging projects, or just a good chat about technology and hardware.",
      nameLabel: "Your Name",
      emailLabel: "Your Email",
      messageLabel: "Your Message",
      btnIdle: "SEND MESSAGE",
      btnLoading: "TRANSMITTING...",
      btnError: "ERROR SENDING.",
      successTitle: "SIGNAL RECEIVED",
      successDesc: "Your message has been successfully delivered. I will get back to you shortly!",
    }
  };

  const t = content[lang];
  const fadeClass = `transition-all duration-400 ease-in-out ${
    isFading ? 'opacity-0 translate-y-4 blur-sm scale-[0.99]' : 'opacity-100 translate-y-0 blur-0 scale-100'
  }`;

  return (
    <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${positionClass}`}>
      
      {/* Título de Fundo Gigante */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[12vw] font-black text-white/[0.02] tracking-[0.4em] whitespace-nowrap">CONTATO</h2>
      </div>

      <div className="relative z-10 w-full h-full overflow-y-auto pb-32 scroll-smooth">
        <div className="h-[12vh] w-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-8">
          
          {/* BARRA SUPERIOR: Seletor de Idioma alinhado à direita */}
          <div className="flex justify-end mt-3 mb-6 md:mb-5">
            <div className="flex items-center gap-4 text-xs tracking-[0.3em] font-light z-20">
              <button onClick={() => handleLangChange('pt')} className={`transition-all duration-300 ${lang === 'pt' ? 'text-[#0077ff] font-bold drop-shadow-[0_0_8px_rgba(0,119,255,0.6)]' : 'text-zinc-500 hover:text-white'}`}>PT</button>
              <span className="text-zinc-700">/</span>
              <button onClick={() => handleLangChange('en')} className={`transition-all duration-300 ${lang === 'en' ? 'text-[#0077ff] font-bold drop-shadow-[0_0_8px_rgba(0,119,255,0.6)]' : 'text-zinc-500 hover:text-white'}`}>EN</button>
            </div>
          </div>

          {/* GRID PRINCIPAL: 2 Colunas */}
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 ${fadeClass}`}>
            
            {/* COLUNA ESQUERDA: Títulos e Redes Sociais */}
            <div className="lg:col-span-6 flex flex-col gap-12 lg:gap-16">
              
              <div>
                <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.3em] text-white uppercase border-l-2 border-[#0077ff] pl-6 transition-all duration-500">
                  {t.title}
                </h2>
                <p className="mt-4 text-zinc-500 tracking-[0.2em] text-xs md:text-sm font-light uppercase pl-6 transition-all duration-500">
                  {t.subtitle}
                </p>
              </div>

              {/* Informações de Contato */}
              <div className="space-y-8 pl-1 md:pl-6">
                <h3 className="text-white text-xl md:text-2xl tracking-[0.2em] font-light uppercase flex items-center gap-4">
                  <span className="w-2 h-2 bg-[#0077ff] rounded-full shadow-[0_0_8px_#0077ff]"></span>
                  {t.talk}
                </h3>
                <p className="text-zinc-400 font-light tracking-widest text-sm leading-relaxed text-justify">
                  {t.desc}
                </p>

                <div className="pt-8 space-y-6 border-t border-white/5">
                  <a href="mailto:gabrieelvictor26@gmail.com" className="flex items-center gap-4 group cursor-pointer w-fit">
                    <div className="w-10 h-10 rounded-full bg-[#050505]/60 border border-white/10 flex items-center justify-center group-hover:border-[#0077ff] transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-[#0077ff] transition-colors"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <span className="text-zinc-400 font-light tracking-widest text-sm group-hover:text-white transition-colors duration-300">gabrieelvictor26@gmail.com</span>
                  </a>

                  <a href="https://www.linkedin.com/in/gabrielvictorsouza/" target="_blank" rel="noreferrer" className="flex items-center gap-4 group cursor-pointer w-fit">
                    <div className="w-10 h-10 rounded-full bg-[#050505]/60 border border-white/10 flex items-center justify-center group-hover:border-[#0077ff] transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-[#0077ff] transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    </div>
                    <span className="text-zinc-400 font-light tracking-widest text-sm group-hover:text-white transition-colors duration-300">LinkedIn</span>
                  </a>

                  <a href="https://github.com/GabrielVSL" target="_blank" rel="noreferrer" className="flex items-center gap-4 group cursor-pointer w-fit">
                    <div className="w-10 h-10 rounded-full bg-[#050505]/60 border border-white/10 flex items-center justify-center group-hover:border-[#0077ff] transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-[#0077ff] transition-colors"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    </div>
                    <span className="text-zinc-400 font-light tracking-widest text-sm group-hover:text-white transition-colors duration-300">GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA: Formulário */}
            <div className="lg:col-span-6">
              <div className="relative p-8 md:p-10 rounded-2xl bg-[#050505]/60 backdrop-blur-md border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
                
                {status === 'success' && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505]/95 backdrop-blur-xl animate-[pulse_1.5s_ease-in-out_1]">
                    <div className="w-20 h-20 mb-6 rounded-full border border-[#0077ff] flex items-center justify-center bg-[#0077ff]/10 shadow-[0_0_30px_rgba(0,119,255,0.3)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0077ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <h3 className="text-white text-lg tracking-[0.3em] font-light uppercase mb-3 text-center drop-shadow-[0_0_8px_rgba(0,119,255,0.8)]">
                      {t.successTitle}
                    </h3>
                    <p className="text-zinc-400 font-light tracking-widest text-xs md:text-sm text-center px-8 leading-relaxed">
                      {t.successDesc}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-[0.2em] font-light text-zinc-500 uppercase ml-2">{t.nameLabel}</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#050505]/40 border border-white/10 rounded-lg p-4 text-zinc-300 font-light tracking-wider focus:outline-none focus:border-[#0077ff] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-[0.2em] font-light text-zinc-500 uppercase ml-2">{t.emailLabel}</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#050505]/40 border border-white/10 rounded-lg p-4 text-zinc-300 font-light tracking-wider focus:outline-none focus:border-[#0077ff] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-[0.2em] font-light text-zinc-500 uppercase ml-2">{t.messageLabel}</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full bg-[#050505]/40 border border-white/10 rounded-lg p-4 text-zinc-300 font-light tracking-wider focus:outline-none focus:border-[#0077ff] transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className={`mt-4 w-full p-4 rounded-lg tracking-[0.3em] font-medium text-xs md:text-sm uppercase transition-all duration-300 border
                      ${status === 'idle' ? 'bg-[#0077ff]/10 border-[#0077ff]/50 text-[#0077ff] hover:bg-[#0077ff] hover:text-white hover:shadow-[0_0_20px_rgba(0,119,255,0.4)]' : ''}
                      ${status === 'loading' ? 'bg-zinc-800 border-zinc-700 text-zinc-400 animate-pulse' : ''}
                      ${status === 'error' ? 'bg-red-500/20 border-red-500 text-red-500' : ''}
                    `}
                  >
                    {status === 'idle' && t.btnIdle}
                    {status === 'loading' && t.btnLoading}
                    {status === 'error' && t.btnError}
                  </button>

                </form>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}