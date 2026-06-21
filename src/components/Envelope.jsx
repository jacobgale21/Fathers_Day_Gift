import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Envelope.css";

export const envelopeStates = {
  CLOSED: "closed",
  OPENING: "opening",
  EMERGING: "emerging",
  FADING: "fading",
  DONE: "done",
  CLOSING: "closing",
};

export default function Envelope({
  children,
  fromFamily,
  index,
  entryDelay = 0,
  canOpen,
  isSelected,
  shouldClose,
  onOpen,
  onEmergingComplete,
  onCloseComplete,
  hideLetter = false,
}) {
  const [state, setState] = useState(envelopeStates.CLOSED);
  const [hasEntered, setHasEntered] = useState(false);

  const isFlapOpen =
    state === envelopeStates.OPENING ||
    state === envelopeStates.EMERGING ||
    state === envelopeStates.FADING ||
    state === envelopeStates.DONE;

  const envelopeFading =
    state === envelopeStates.FADING || state === envelopeStates.DONE;

  const showLetterInEnvelope = state === envelopeStates.EMERGING && !hideLetter;

  useEffect(() => {
    if (shouldClose && state === envelopeStates.DONE) {
      setState(envelopeStates.CLOSING);
    }
  }, [shouldClose, state]);

  const setPhase = (next) => {
    setState(next);
    if (next === envelopeStates.DONE) return;
    if (next === envelopeStates.FADING) {
      setTimeout(() => setState(envelopeStates.DONE), 1200);
    }
  };

  const handleClick = () => {
    if (!canOpen || state !== envelopeStates.CLOSED) return;
    setPhase(envelopeStates.OPENING);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      className="envelope-slot"
      initial={hasEntered ? false : { x: "110vw", opacity: 0 }}
      animate={{ x: 0, opacity: envelopeFading ? 0 : 1 }}
      transition={{
        x: {
          delay: hasEntered ? 0 : entryDelay,
          duration: 0.85,
          ease: "easeOut",
        },
        opacity: { duration: 1.2, ease: "easeOut" },
      }}
      onAnimationComplete={() => {
        if (!hasEntered) setHasEntered(true);
      }}
    >
      {" "}
      <div className="envelope-wrapper envelope-wrapper--compact">
        <motion.div
          className="envelope-stage envelope-stage--compact"
          animate={{ opacity: envelopeFading ? 0 : 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ pointerEvents: envelopeFading ? "none" : "auto" }}
        >
          <div
            className="envelope envelope--compact"
            role="button"
            tabIndex={canOpen && state === envelopeStates.CLOSED ? 0 : -1}
            aria-label={
              state === envelopeStates.CLOSED
                ? "Open envelope"
                : "Envelope opened"
            }
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          >
            <div className="envelope-back" />
            <div className="envelope-front" />
            <motion.div
              className="envelope-flap"
              initial={{ rotateX: 0 }}
              animate={{ rotateX: isFlapOpen ? -180 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ transformPerspective: 800 }}
              onAnimationComplete={() => {
                if (state === envelopeStates.OPENING) {
                  setPhase(envelopeStates.EMERGING);
                  onOpen?.(index);
                }
                if (state === envelopeStates.CLOSING) {
                  setState(envelopeStates.CLOSED);
                  onCloseComplete?.();
                }
              }}
            />{" "}
          </div>
        </motion.div>

        {showLetterInEnvelope && (
          <motion.div
            className="envelope-letter envelope-letter--compact"
            initial={{ top: 20, left: 12, y: 0, opacity: 0.25 }}
            animate={{
              top: 20,
              left: 12,
              y: -90,
              opacity: 1,
            }}
            transition={{
              y: { delay: 0.35, duration: 0.65, ease: "easeOut" },
              opacity: { delay: 0.35, duration: 0.5 },
            }}
            onAnimationComplete={() => {
              if (state === envelopeStates.EMERGING) {
                onEmergingComplete?.();
                setPhase(envelopeStates.FADING);
              }
            }}
          >
            {children}
          </motion.div>
        )}

        {canOpen && state === envelopeStates.CLOSED && (
          <p className="envelope-hint">From {fromFamily}</p>
        )}
      </div>
    </motion.div>
  );
}
