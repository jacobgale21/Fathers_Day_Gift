import { useState } from "react";
import { motion } from "framer-motion";
import Envelope from "./Envelope";
import "./Envelope.css";

const ENVELOPES = [
  {
    id: 0,
    content: (
      <>
        <p className="text-lg text-slate-700 leading-relaxed text-left">
          Thank you for everything you do — your love, guidance, and laughter
          mean more than words can say.
        </p>
        <p className="text-lg text-slate-800 mt-6 text-left">With love,</p>
        <p className="text-xl font-semibold text-left mt-1">Your family</p>
      </>
    ),
  },
  {
    id: 1,
    content: (
      <>
        <p className="text-lg text-slate-700 leading-relaxed text-left">
          You&apos;ve taught us strength, kindness, and how to laugh through
          every challenge. We&apos;re grateful for you every day.
        </p>
        <p className="text-lg text-slate-800 mt-6 text-left">With love,</p>
        <p className="text-xl font-semibold text-left mt-1">Your family</p>
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        <p className="text-lg text-slate-700 leading-relaxed text-left">
          Here&apos;s to the memories we&apos;ve made and the adventures still
          ahead. No one does it better than you, Dad.
        </p>
        <p className="text-lg text-slate-800 mt-6 text-left">With love,</p>
        <p className="text-xl font-semibold text-left mt-1">Your family</p>
      </>
    ),
  },
];
const FROM_FAMILY = ["Mackenzie", "Jacob", "Taylor"];

export default function EnvelopeGroup({ present }) {
  const [openedIndex, setOpenedIndex] = useState(null);
  const [showMainLetter, setShowMainLetter] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldCloseEnvelope, setShouldCloseEnvelope] = useState(false);

  const handleOpen = (index) => {
    setOpenedIndex(index);
  };

  const handleEmergingComplete = () => {
    setShowMainLetter(true);
  };

  const handleReturnToEnvelope = () => {
    if (isClosing || openedIndex === null) return;
    setIsClosing(true);
  };

  const handleLetterCloseAnimationComplete = () => {
    setShowMainLetter(false);
    setShouldCloseEnvelope(true);
  };

  const handleEnvelopeCloseComplete = () => {
    setOpenedIndex(null);
    setIsClosing(false);
    setShouldCloseEnvelope(false);
  };

  const isEnvelopeHidden = (index) =>
    openedIndex === index && !shouldCloseEnvelope;

  return (
    <div className="envelope-group">
      <motion.div
        className={`envelope-row${openedIndex !== null && !shouldCloseEnvelope ? " envelope-row--two" : ""}`}
        layout
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {ENVELOPES.map((envelope, index) => (
          <motion.div
            key={envelope.id}
            className="envelope-row-item"
            layout
            animate={{
              flex: isEnvelopeHidden(index) ? "0 0 0px" : "1 1 0px",
              opacity: isEnvelopeHidden(index) ? 0 : 1,
              scale: isEnvelopeHidden(index) ? 0.85 : 1,
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{
              overflow: isEnvelopeHidden(index) ? "hidden" : "visible",
              pointerEvents: isEnvelopeHidden(index) ? "none" : "auto",
            }}
          >
            <Envelope
              fromFamily={FROM_FAMILY[index]}
              index={index}
              entryDelay={index * 0.18}
              canOpen={openedIndex === null && !isClosing}
              isSelected={openedIndex === index}
              shouldClose={shouldCloseEnvelope && openedIndex === index}
              onOpen={handleOpen}
              onEmergingComplete={handleEmergingComplete}
              onCloseComplete={handleEnvelopeCloseComplete}
              hideLetter={showMainLetter && openedIndex === index}
            >
              {envelope.content}
            </Envelope>
          </motion.div>
        ))}
      </motion.div>

      <div className="envelope-group__below">
        {openedIndex !== null && showMainLetter && (
          <motion.div
            className="envelope-letter-stage"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.div
              className="envelope-letter envelope-letter--settled envelope-letter--main"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: isClosing ? 0 : 1, y: isClosing ? 16 : 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              onAnimationComplete={() => {
                if (isClosing) {
                  handleLetterCloseAnimationComplete();
                }
              }}
            >
              {ENVELOPES[openedIndex].content}
              <button
                type="button"
                className="envelope-letter-return"
                onClick={handleReturnToEnvelope}
                disabled={isClosing}
              >
                Return to envelope
              </button>
            </motion.div>
          </motion.div>
        )}

        {present && (
          <motion.div
            layout
            className="present-slot"
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {present}
          </motion.div>
        )}
      </div>
    </div>
  );
}
