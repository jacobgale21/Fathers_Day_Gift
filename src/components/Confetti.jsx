import { useEffect } from "react";
import confetti from "canvas-confetti";

const DURATION_MS = 5000;
const INTERVAL_MS = 120;
const COLORS = [
  "#c9a227",
  "#f59e0b",
  "#1e293b",
  "#fbbf24",
  "#fcd34d",
  "#ea580c",
];

export default function Confetti() {
  useEffect(() => {
    const interval = setInterval(() => {
      confetti({
        particleCount: 4,
        angle: 270,
        spread: 80,
        startVelocity: 20,
        gravity: 1.1,
        origin: { x: Math.random(), y: 0 },
        colors: COLORS,
        ticks: 250,
        zIndex: 100,
      });
    }, INTERVAL_MS);

    const timeout = setTimeout(() => clearInterval(interval), DURATION_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
