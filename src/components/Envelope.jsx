import { useState } from "react";
import { motion } from "framer-motion";
import "./Envelope.css";

const states = {
  CLOSED: "closed",
  OPENING: "opening",
  EMERGING: "emerging",
  SETTLING: "settling",
  DONE: "done",
};

export default function Envelope({ children }) {
  const [state, setState] = useState(states.CLOSED);

  const isOpening = state !== states.CLOSED && state !== states.DONE;
  const showLetter =
    state === states.EMERGING ||
    state === states.SETTLING ||
    state === states.DONE;
  const isSettled = state === states.SETTLING || state === states.DONE;
  const envelopeFading = state === states.SETTLING || state === states.DONE;

  const handleClick = () => {
    if (state !== states.CLOSED) return;
    setState(states.OPENING);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`envelope-wrapper${isSettled ? " envelope-wrapper--expanded" : ""}`}
    >
      <motion.div
        className="envelope-stage"
        animate={{ opacity: envelopeFading ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ pointerEvents: envelopeFading ? "none" : "auto" }}
      >
        <div
          className="envelope"
          role="button"
          tabIndex={state === states.CLOSED ? 0 : -1}
          aria-label={
            state === states.CLOSED ? "Open envelope" : "Envelope opened"
          }
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <div className="envelope-back" />
          <div className="envelope-front" />

          <motion.div
            className="envelope-flap"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpening ? -180 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformPerspective: 800 }}
            onAnimationComplete={() => {
              if (state === states.OPENING) {
                setState(states.EMERGING);
              }
            }}
          />
        </div>
      </motion.div>

      {showLetter && (
        <motion.div
          className={`envelope-letter${isSettled ? " envelope-letter--settled" : ""}`}
          initial={{
            top: 24,
            left: 16,
            y: 0,
            opacity: 0.25,
            width: "calc(100% - 32px)",
            minHeight: 140,
          }}
          animate={
            state === states.EMERGING
              ? {
                  top: 24,
                  left: 16,
                  y: -120,
                  opacity: 1,
                  width: "calc(100% - 32px)",
                  minHeight: 140,
                }
              : {
                  top: 0,
                  left: 0,
                  y: 0,
                  opacity: 1,
                  width: "100%",
                  minHeight: 380,
                }
          }
          transition={
            state === states.EMERGING
              ? {
                  y: { delay: 0.35, duration: 0.65, ease: "easeOut" },
                  opacity: { delay: 0.35, duration: 0.5 },
                }
              : { duration: 0.7, ease: "easeInOut" }
          }
          onAnimationComplete={() => {
            if (state === states.EMERGING) {
              setState(states.SETTLING);
            } else if (state === states.SETTLING) {
              setState(states.DONE);
            }
          }}
        >
          {children}
        </motion.div>
      )}

      {state === states.CLOSED && (
        <p className="envelope-hint">Click to open</p>
      )}
    </div>
  );
}
