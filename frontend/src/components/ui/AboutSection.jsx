export default function AboutSection({ section }) {
  const sections = ['home', 'projetos', 'sobre', 'experiencias', 'contato'];
  const currentIndex = sections.indexOf(section);
  const myIndex = 2; 

  let positionClass = 'translate-x-[100vw] opacity-0 pointer-events-none';
  if (currentIndex === myIndex) positionClass = 'translate-x-0 opacity-100 pointer-events-auto';
  else if (currentIndex > myIndex) positionClass = '-translate-x-[100vw] opacity-0 pointer-events-none';

  return (
    <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${positionClass}`}>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[12vw] font-black text-white/[0.02] tracking-[0.4em] whitespace-nowrap">SOBRE</h2>
      </div>

      <div className="relative z-10 w-full h-full overflow-y-auto pb-32">
        <div className="h-[25vh] w-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-1/2 text-left z-20">
            <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.3em] text-white uppercase border-l-2 border-[#ff007f] pl-6 mb-8">Quem Sou Eu</h2>
            <div className="space-y-6 text-zinc-400 font-light tracking-widest text-sm leading-relaxed pl-6 text-justify md:text-left">
              <p>Sou estudante de <span className="text-white font-normal">Engenharia de Software na PUC Minas</span> e atuo na área de Suporte de TI e Desenvolvimento no Colégio São Paulo da Cruz.</p>
              <p>Minha paixão por tecnologia vai da infraestrutura à arquitetura de código. No desenvolvimento, transito entre a criação de interfaces imersivas e fluidas com <span className="text-white font-normal">React e Tailwind CSS</span>, e a construção de back-ends robustos utilizando <span className="text-white font-normal">C# e .NET</span>.</p>
              <p>Além do código e da gestão de servidores e laboratórios, sou um entusiasta de hardware de PCs. Quando não estou programando, meu tempo é dedicado à minha família, a cuidar dos meus locs e a umas boas partidas de <span className="text-white font-normal">Valorant, Escape from Tarkov ou Minecraft</span>.</p>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center mt-12 md:mt-0 z-20">
            <div className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
              <h3 className="text-white text-lg tracking-[0.3em] font-light uppercase mb-6 border-b border-white/10 pb-4">Stack & Ferramentas</h3>
              <div className="flex flex-wrap gap-3">
                {['React', 'Tailwind CSS', 'JavaScript', 'C#', '.NET', 'HTML/CSS', 'Ubuntu Server', 'PowerShell', 'Git'].map((skill) => (
                  <span key={skill} className="text-xs font-light tracking-[0.1em] text-zinc-300 bg-zinc-900/50 border border-white/10 px-4 py-2 uppercase hover:border-[#ff007f] hover:text-white transition-colors cursor-default">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}