export default function HomeSection({ section }) {
  return (
    <div className={`absolute flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${section === 'home' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
      <div className="text-center mix-blend-difference text-white">
        <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.3em] mb-4 uppercase">
          Gabriel Victor Souza
        </h1>
        <p className="text-xs md:text-sm tracking-[0.5em] text-zinc-300 font-light uppercase">
          Engenharia de Software | Dev Full Stack
        </p>
      </div>
    </div>
  );
}