import { useState } from "react";
import { motion } from "framer-motion";
import "./Present.css";

const states = {
  CLOSED: "closed",
  OPENING: "opening",
  EMERGING: "emerging",
  SETTLING: "settling",
  DONE: "done",
};

export default function Present({ children }) {
  const [state, setState] = useState(states.CLOSED);

  const isOpening = state !== states.CLOSED && state !== states.DONE;
  const showReveal =
    state === states.EMERGING ||
    state === states.SETTLING ||
    state === states.DONE;
  const isSettled = state === states.SETTLING || state === states.DONE;
  const boxFading = state === states.SETTLING || state === states.DONE;

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
      className={`present-wrapper${isSettled ? " present-wrapper--expanded" : ""} space-y-6`}
    >
      <motion.div
        className="present-stage"
        animate={{ opacity: boxFading ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ pointerEvents: boxFading ? "none" : "auto" }}
      >
        <div
          className="gift-box"
          role="button"
          tabIndex={state === states.CLOSED ? 0 : -1}
          aria-label={
            state === states.CLOSED ? "Open gift box" : "Gift box opened"
          }
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <div className="gift-box-body">
            <div className="gift-box-ribbon-h" />
          </div>

          <motion.div
            className="gift-box-lid"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpening ? -110 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformPerspective: 800 }}
            onAnimationComplete={() => {
              if (state === states.OPENING) {
                setState(states.EMERGING);
              }
            }}
          >
            <div className="gift-box-ribbon-v" />
            <div className="gift-box-bow" aria-hidden="true">
              <span className="gift-box-bow-loop gift-box-bow-loop--left" />
              <span className="gift-box-bow-loop gift-box-bow-loop--right" />
              <span className="gift-box-bow-knot" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {showReveal && (
        <motion.div
          className={`present-reveal${isSettled ? " present-reveal--settled" : ""}`}
          initial={{
            top: 48,
            left: 20,
            y: 0,
            opacity: 0.25,
            width: "calc(100% - 40px)",
            minHeight: 120,
          }}
          animate={
            state === states.EMERGING
              ? {
                  top: 48,
                  left: 20,
                  y: -130,
                  opacity: 1,
                  width: "calc(100% - 40px)",
                  minHeight: 120,
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

      {state === states.CLOSED && <p className="present-hint">Click to open</p>}
    </div>
  );
}
