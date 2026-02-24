import Spline from '@splinetool/react-spline';

export default function LandingPage() {
  return (
    // Container principal: ocupa a tela toda (h-screen) e esconde barras de rolagem
    <div className="relative w-full h-screen bg-zinc-950 overflow-hidden">
      
      {/* CAMADA 1: O Fundo 3D (Z-index 0) */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/hqxAp80WxOGMJquO/scene.splinecode" />
      </div>

      {/* CAMADA 2: Sua Interface HTML (Z-index 10) */}
      {/* pointer-events-none faz o mouse "atravessar" a div para você conseguir girar o 3D no fundo */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center text-white">
        
        {/* Caixinha de apresentação com efeito de vidro (backdrop-blur) */}
        {/* pointer-events-auto permite que os botões aqui dentro sejam clicáveis */}
        <div className="bg-black/40 p-10 rounded-3xl backdrop-blur-md text-center pointer-events-auto border border-white/10 shadow-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            Olá, sou [Seu Nome]
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 mb-8 font-light">
            Estudante de Engenharia de Software & Desenvolvedor
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-black hover:bg-zinc-200 rounded-full font-semibold transition-all duration-300 hover:scale-105">
              Meus Projetos
            </button>
            <button className="px-8 py-3 bg-transparent border border-white/30 hover:bg-white/10 rounded-full font-semibold transition-all duration-300">
              Entrar em Contato
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}