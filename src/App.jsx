function App() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 px-6 py-12">
      <header className="relative text-center mb-8">
        <span
          className="absolute -top-2 -left-8 text-3xl select-none"
          aria-hidden="true"
        >
          🎉
        </span>
        <span
          className="absolute -top-2 -right-8 text-3xl select-none"
          aria-hidden="true"
        >
          ❤️
        </span>

        <p className="text-amber-600 font-medium tracking-widest uppercase text-sm mb-3">
          June 2026
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 tracking-tight drop-shadow-sm">
          Happy Father&apos;s Day
        </h1>
        <p className="mt-4 text-xl text-amber-700 italic">
          To the best dad in the world
        </p>
      </header>

      <main className="max-w-lg w-full bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-amber-400 shadow-xl shadow-amber-200/50 p-8 text-center">
        <p className="text-lg text-slate-700 leading-relaxed">
          Thank you for everything you do — your love, guidance, and laughter
          mean more than words can say.
        </p>
      </main>

      <footer className="mt-10 text-center text-slate-800">
        <p className="text-base">With love,</p>
        <p className="text-xl font-semibold mt-1">Your family</p>
      </footer>
    </div>
  );
}

export default App;
