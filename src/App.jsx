import Confetti from "./components/Confetti";
import Envelope from "./components/Envelope";
import Present from "./components/Present";

function App() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center bg-[#782F40] px-6 py-12">
      <Confetti />
      <header className="relative text-center mb-10">
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

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight drop-shadow-sm text-[#CEB888]">
          Happy Father&apos;s Day
        </h1>
        <p className="mt-4 text-xl text-[#CEB888] italic">
          To the best dad in the world
        </p>
      </header>

      <div className="flex flex-col items-center gap-16 w-full">
        <Envelope>
          <p className="text-lg text-slate-700 leading-relaxed text-left">
            Thank you for everything you do — your love, guidance, and laughter
            mean more than words can say.
          </p>
          <p className="text-lg text-slate-800 mt-6 text-left">With love,</p>
          <p className="text-xl font-semibold text-left mt-1">Your family</p>
        </Envelope>

        <Present>
          <p className="text-lg text-slate-700 leading-relaxed text-left">
            Here&apos;s to all the adventures we&apos;ve shared and the many
            more still to come. You make every day brighter.
          </p>
          <p className="text-lg text-slate-800 mt-6 text-left">With love,</p>
          <p className="text-xl font-semibold text-left mt-1">Your family</p>
        </Present>
      </div>
    </div>
  );
}

export default App;
