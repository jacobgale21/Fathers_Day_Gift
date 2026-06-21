import Confetti from "./components/Confetti";
import EnvelopeGroup from "./components/EnvelopeGroup";
import Present from "./components/Present";
import presentImage from "./images/IMG_6017.jpeg";

const CALENDAR_GIFT_URL =
  "https://calendar.google.com/calendar/u/0?cid=NjI3MzFlOGE2YTY4ZDdiZWNmMTIzNmRlZTg4MjlmOTRiOTQ1ZWFjYmQ4NWIxNmI0Y2Q3OWZiNzIzMmJmNTdiOUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t";

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

      <EnvelopeGroup
        present={
          <Present>
            <p className="text-lg text-slate-800 leading-relaxed text-left font-bold mb-4">
              Dear Dad,
            </p>
            <p className="text-lg text-slate-700 leading-relaxed text-left">
              We wanted to help with making dinner plans and all the hard work
              that you have been putting into your health recently! We are so
              proud of you and hope this makes your journey a little easier.
            </p>
            <img
              src={presentImage}
              alt="A special moment with Dad"
              className="w-full rounded-lg mt-6 object-cover max-h-150"
            />
            <p className="text-lg text-slate-800 font-semibold mt-6 text-left">
              Gifts
            </p>
            <p className="text-lg text-slate-700 leading-relaxed text-left mt-2">
              <a
                href={CALENDAR_GIFT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#782F40] underline underline-offset-2 font-medium hover:text-[#5a2330]"
              >
                View your dinner plans calendar
              </a>
            </p>
            <p className="text-lg text-slate-800 mt-8 text-left">With love,</p>
            <p className="text-xl font-semibold text-left mt-1">
              Mackenzie, Jacob &amp; Taylor
            </p>
          </Present>
        }
      />
    </div>
  );
}

export default App;
