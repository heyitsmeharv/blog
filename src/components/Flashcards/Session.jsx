import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";
import confetti from "canvas-confetti";

import { Analytics } from "../../helpers/analytics";

const TYPE_LABELS = {
  definition: "Definition",
  comparison: "Comparison",
  scenario: "Scenario",
  cloze: "Fill in the blank",
};

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const ExitButton = styled.button.attrs({ type: "button" })`
  background: none;
  border: none;
  font-family: inherit;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.mutedText};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

const Counter = styled.span`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.mutedText};
`;

const Track = styled.div`
  height: 0.5rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.secondary}33;
  margin-bottom: 2.4rem;
  overflow: hidden;
`;

const Fill = styled.div`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ theme }) => theme.link};
  transition: width 0.3s ease;
`;

const CardShell = styled(motion.div)`
  min-height: 26rem;
  padding: 2.6rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.secondary}55;
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
`;

const CardType = styled.span`
  align-self: flex-start;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.mutedText};
  margin-bottom: 1.4rem;
`;

const Front = styled.p`
  font-size: 1.9rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.secondary}55;
  margin: 1.8rem 0;
`;

const Back = styled.p`
  font-size: 1.7rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const Ref = styled.span`
  margin-top: auto;
  padding-top: 1.6rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.mutedText};
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.8rem;
`;

const ControlButton = styled.button.attrs({ type: "button" })`
  flex: 1;
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1.2rem;
  border-radius: 0.6rem;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s,
    transform 0.1s,
    box-shadow 0.15s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.focus};
    outline-offset: 3px;
  }
`;

const Hint = styled.p`
  margin: 1rem 0 0;
  font-size: 1.2rem;
  text-align: center;
  color: ${({ theme }) => theme.mutedText};

  kbd {
    font-family: inherit;
    font-size: 1.1rem;
    padding: 0.1rem 0.5rem;
    margin: 0 0.2rem;
    border: 1px solid ${({ theme }) => theme.secondary};
    border-radius: 0.4rem;
  }
`;

const RevealButton = styled(ControlButton)`
  background: ${({ theme }) => theme.buttonColour};
  color: ${({ theme }) => theme.buttonText};
  border: 2px solid ${({ theme }) => theme.buttonColour};

  &:hover {
    background: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.primary};
  }
`;

const MissButton = styled(ControlButton)`
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.secondary};

  &:hover {
    background: ${({ theme }) => theme.secondary}33;
    border-color: ${({ theme }) => theme.text};
  }
`;

const GotButton = styled(ControlButton)`
  background: ${({ theme }) => theme.link};
  color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.link};

  &:hover {
    filter: brightness(0.9);
  }
`;

const Done = styled.div`
  text-align: center;
  padding: 4rem 1rem;
`;

const DoneTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin: 0 0 1rem;
`;

const DoneText = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.mutedText};
  margin: 0 0 2.4rem;
`;

const DoneButton = styled.button.attrs({ type: "button" })`
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1rem 2.4rem;
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.buttonColour};
  color: ${({ theme }) => theme.buttonText};
  border: 2px solid ${({ theme }) => theme.buttonColour};
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s,
    transform 0.1s;

  &:hover {
    background: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.focus};
    outline-offset: 3px;
  }
`;

export default function Session({
  mode,
  queue: initialQueue,
  onGrade,
  onExit,
}) {
  const [queue, setQueue] = useState(initialQueue);
  const [revealed, setRevealed] = useState(false);
  const [tally, setTally] = useState({ cleared: 0, again: 0 });

  const current = queue[0];
  const done = !current;
  const pct = Math.round(
    (tally.cleared / (tally.cleared + queue.length || 1)) * 100,
  );

  const answer = useCallback(
    (gotIt) => {
      setQueue((q) => {
        const [card, ...rest] = q;
        if (!card) return q;
        onGrade(card.id, gotIt);
        return gotIt ? rest : [...rest, card];
      });
      setTally((t) =>
        gotIt ? { ...t, cleared: t.cleared + 1 } : { ...t, again: t.again + 1 },
      );
      setRevealed(false);
    },
    [onGrade],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (done) return;
      if (!revealed && (e.code === "Space" || e.code === "Enter")) {
        e.preventDefault();
        setRevealed(true);
      } else if (revealed && e.key === "1") {
        answer(false);
      } else if (revealed && e.key === "2") {
        answer(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed, done, answer]);

  useEffect(() => {
    if (done) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      Analytics.track("flashcards_session_completed", { mode, ...tally });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  if (done) {
    return (
      <Done>
        <DoneTitle>Session complete</DoneTitle>
        <DoneText>
          {tally.cleared} card{tally.cleared === 1 ? "" : "s"} cleared
          {tally.again > 0 && `, ${tally.again} needed another look`}.
        </DoneText>
        <DoneButton onClick={onExit}>Back to decks</DoneButton>
      </Done>
    );
  }

  return (
    <div>
      <TopBar>
        <ExitButton onClick={onExit}>Exit</ExitButton>
        <Counter>
          {mode === "cram" ? "Cram · " : ""}
          {tally.cleared} done · {queue.length} left
        </Counter>
      </TopBar>

      <Track aria-hidden="true">
        <Fill $pct={pct} />
      </Track>

      <AnimatePresence mode="wait">
        <CardShell
          key={`${current.id}-${revealed}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.18 }}
        >
          <CardType>{TYPE_LABELS[current.type] ?? current.type}</CardType>
          <Front>{current.front}</Front>
          {revealed && (
            <>
              <Divider />
              <Back>{current.back}</Back>
              {current.ref && <Ref>From: {current.ref}</Ref>}
            </>
          )}
        </CardShell>
      </AnimatePresence>

      {revealed ? (
        <>
          <Controls>
            <MissButton onClick={() => answer(false)}>Missed it</MissButton>
            <GotButton onClick={() => answer(true)}>Got it</GotButton>
          </Controls>
          <Hint>
            <kbd>1</kbd> missed · <kbd>2</kbd> got it
          </Hint>
        </>
      ) : (
        <>
          <Controls>
            <RevealButton onClick={() => setRevealed(true)}>
              Show answer
            </RevealButton>
          </Controls>
          <Hint>
            <kbd>space</kbd> to show answer
          </Hint>
        </>
      )}
    </div>
  );
}
