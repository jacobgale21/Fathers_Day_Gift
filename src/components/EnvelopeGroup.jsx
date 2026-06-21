import { useState } from "react";
import { motion } from "framer-motion";
import Envelope from "./Envelope";
import "./Envelope.css";

const ENVELOPES = [
  {
    id: 0,
    content: (
      <>
        <p className="text-lg text-slate-800 leading-relaxed text-left font-bold mb-4">
          Dear Dad,
        </p>
        <p className="text-lg text-slate-700 leading-relaxed text-left">
          Happy Father&apos;s Day! Thank you for being my rock and always
          knowing the right things to say. Thank you for always being in my
          corner whenever I need it most.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed text-left mt-4">
          I am forever grateful for the life that you have provided for us and
          support that you have gave us. I could not ask for a better dad and I
          hope you have the best day.
        </p>
        <p className="text-lg text-slate-800 mt-8 text-left">
          Love you always,
        </p>
        <p className="text-xl font-semibold text-left mt-1">Mackenzie</p>
      </>
    ),
  },
  {
    id: 1,
    content: (
      <>
        <p className="text-lg text-slate-800 leading-relaxed text-left font-bold mb-4">
          Dear Dad,
        </p>
        <p className="text-lg text-slate-700 leading-relaxed text-left">
          Thank you for being the best dad. Thank you for always being there for
          me when I need it most, especially these past few months. I do not
          know where I would be without your support.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed text-left mt-4">
          You have set an amazing example for Mackenzie, Taylor, and me that we
          all strive to follow each day. Thank you for working the long days to
          support us and give us the life that we dream of having.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed text-left mt-4">
          Thank you for being patient and understanding throughout these past
          couple of months, even when I have lashed out at you, even though
          you&apos;re always trying to support. I have enjoyed our long
          conversations throughout the last year, especially when it seemed like
          I had no one else to talk to.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed text-left mt-4">
          I want to give you the same support that you give me, and I hope that
          we can both continue to grow to be better men and achieve all our
          goals. Thank you again for everything that you have ever done for me.
          You have been the best dad that I could ask for.
        </p>
        <p className="text-lg text-slate-800 mt-8 text-left">From,</p>
        <p className="text-xl font-semibold text-left mt-1">Jacob</p>
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        <p className="text-lg text-slate-800 leading-relaxed text-left font-bold mb-4">
          Dear Dad,
        </p>
        <p className="text-lg text-slate-700 leading-relaxed text-left">
          Thank you for being my #1 supporter. I want to thank you 1 million
          times for always pushing me to be the best version of myself.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed text-left mt-4">
          I love you so much! Happy Father&apos;s Day 🐐🩷
        </p>
        <p className="text-lg text-slate-800 mt-8 text-left">From,</p>
        <p className="text-xl font-semibold text-left mt-1">Taylor</p>
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
