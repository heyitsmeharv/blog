import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronForward } from "@styled-icons/ionicons-solid/ChevronForward";

import { cardsForDecks } from "./decks";
import { DeckIcon } from "./deckIcons";

const Header = styled.header`
  margin-bottom: 1.6rem;
`;

const Chevron = styled(ChevronForward)`
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
  color: ${({ theme }) => theme.mutedText};
  transform: rotate(${({ $open }) => ($open ? "90deg" : "0deg")});
  transition: transform 0.25s ease;
`;

const Panel = styled.div`
  margin-bottom: 2.4rem;
  border: 1px solid ${({ theme }) => theme.secondary}44;
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.surface};
  overflow: hidden;
`;

const Trigger = styled.button.attrs({ type: "button" })`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.4rem;
  font-family: inherit;
  font-size: 1.4rem;
  font-weight: 700;
  text-align: left;
  color: ${({ theme }) => theme.text};
  background: none;
  border: none;
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.focus};
    outline-offset: -3px;
  }
`;

const HowBody = styled.div`
  padding: 1.2rem 1.4rem 1.6rem;
  border-top: 1px solid ${({ theme }) => theme.secondary}44;
  font-size: 1.4rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.mutedText};

  p {
    margin: 0 0 1rem;
  }

  p:last-child {
    margin-bottom: 0;
  }

  ul {
    margin: 0 0 1rem;
    padding-left: 1.8rem;
  }

  li {
    margin: 0.3rem 0;
  }

  strong {
    color: ${({ theme }) => theme.text};
  }

  a {
    color: ${({ theme }) => theme.link};
    font-weight: 700;
  }
`;

const Code = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.mutedText};
`;

const Name = styled.h1`
  font-size: clamp(2.2rem, 3.5vw, 3rem);
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin: 0.4rem 0 0;
`;

const SectionLabel = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.mutedText};
  margin: 2.8rem 0 1.2rem;
`;

const DeckList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const DeckRow = styled.li`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem 1.2rem;
  padding: 1.2rem 1.4rem;
  margin-bottom: 0.8rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.secondary}44;
  border-radius: 0.8rem;
  cursor: pointer;
  transition:
    background 0.15s,
    border-color 0.15s;

  &:hover {
    background: ${({ theme }) => theme.background};
    border-color: ${({ theme }) => theme.secondary};
  }

  &:focus-within {
    outline: 3px solid ${({ theme }) => theme.focus};
    outline-offset: 2px;
  }
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 1.8rem;
  height: 1.8rem;
  flex-shrink: 0;
  accent-color: ${({ theme }) => theme.link};
  cursor: pointer;
`;

const DeckRowIcon = styled(DeckIcon)`
  flex-shrink: 0;
  display: flex;

  svg {
    width: 2.8rem;
    height: 2.8rem;
    margin: 0;
  }
`;

const DeckTitle = styled.span`
  flex: 1;
  min-width: 8rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const DeckMeta = styled.span`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.mutedText};
  white-space: nowrap;
`;

const SummaryLink = styled(Link)`
  flex-shrink: 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.link};
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

const DeckBarRow = styled.div`
  flex-basis: 100%;
  margin-top: 0.2rem;
`;

/* Boxes ripen red -> amber -> green as a card gets more mastered. */
const BOX_COLOURS = ["#e05a4d", "#e8883c", "#e0b13c", "#8bc34a", "#3f9d5a"];
const NEW_COLOUR = "#8b93a1"; // unseen - neutral, theme-independent

const DAY_MS = 24 * 60 * 60 * 1000;

/** "today" | "tomorrow" | "in 3 days" | "in ~2 weeks" for a future timestamp. */
function dueLabel(ts, now = Date.now()) {
  const days = Math.ceil((ts - now) / DAY_MS);
  if (days <= 0) return "today";
  if (days === 1) return "tomorrow";
  if (days < 7) return `in ${days} days`;
  const weeks = Math.round(days / 7);
  return weeks <= 1 ? "in ~1 week" : `in ~${weeks} weeks`;
}

/** One-line status: what's the next thing to do in this selection/deck? */
function statusText(s) {
  if (s.due > 0) return `${s.due} due now`;
  if (s.nextDueAt != null) return `next review ${dueLabel(s.nextDueAt)}`;
  if (s.unseen > 0) return `${s.unseen} ready to start`;
  return "all mastered";
}

const BoxBarTrack = styled.div`
  display: flex;
  width: 100%;
  height: ${({ $tall }) => ($tall ? "1rem" : "0.6rem")};
  margin: ${({ $tall }) => ($tall ? "1.2rem 0 1.2rem" : "0")};
  border-radius: 999px;
  overflow: hidden;
  background: ${({ theme }) => theme.secondary}22;
`;

const BoxSeg = styled.div`
  flex-grow: ${({ $count }) => $count};
  flex-basis: 0;
  background: ${({ $new, $colour }) => ($new ? NEW_COLOUR : $colour)};
`;

const BoxSwatch = styled.span`
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  border-radius: 0.3rem;
  background: ${({ $new, $colour }) => ($new ? NEW_COLOUR : $colour)};
`;

/** Proportional strip: box 1..5, then unseen. Hidden when nothing has counts. */
function BoxBar({ boxes, unseen, tall }) {
  const total = boxes.reduce((sum, n) => sum + n, 0) + unseen;
  if (total === 0) return null;

  const label = [
    ...boxes.map((n, i) => (i === 4 ? `Mastered: ${n}` : `Box ${i + 1}: ${n}`)),
    `New: ${unseen}`,
  ].join(" · ");

  return (
    <BoxBarTrack $tall={tall} title={label} aria-label={label}>
      {boxes.map((n, i) => (
        <BoxSeg key={i} $count={n} $colour={BOX_COLOURS[i]} />
      ))}
      <BoxSeg $count={unseen} $new />
    </BoxBarTrack>
  );
}

const Key = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.6rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const KeyItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.mutedText};
`;

const Legend = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.mutedText};
  margin: 0 0 0.4rem;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2.8rem;
`;

const Button = styled.button.attrs({ type: "button" })`
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.6rem;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s,
    transform 0.1s,
    box-shadow 0.15s,
    opacity 0.15s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.focus};
    outline-offset: 3px;
  }
`;

const PrimaryButton = styled(Button)`
  background: ${({ theme }) => theme.buttonColour};
  color: ${({ theme }) => theme.buttonText};
  border: 2px solid ${({ theme }) => theme.buttonColour};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.primary};
  }
`;

const GhostButton = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.secondary};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.secondary}33;
    border-color: ${({ theme }) => theme.text};
  }
`;

const ResetButton = styled.button.attrs({ type: "button" })`
  margin-top: 2rem;
  background: none;
  border: none;
  font-family: inherit;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.mutedText};
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

const CaughtUp = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.mutedText};
  margin: 1.6rem 0 0;
`;

export default function StartScreen({
  exam,
  statsFor,
  initialDeckIds,
  onStart,
  onReset,
}) {
  const [selected, setSelected] = useState(() => new Set(initialDeckIds));
  const [howOpen, setHowOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const toggle = (deckId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(deckId)) next.delete(deckId);
      else next.add(deckId);
      return next;
    });
  };

  const selectedIds = exam.decks
    .map((d) => d.id)
    .filter((id) => selected.has(id));

  const stats = statsFor(cardsForDecks(exam, selectedIds));
  const hasSelection = selectedIds.length > 0;
  const reviewQueueEmpty = stats.due === 0 && stats.unseen === 0;

  return (
    <div>
      <Header>
        <Code>{exam.code}</Code>
        <Name>{exam.name}</Name>
      </Header>

      <Panel>
        <Trigger
          onClick={() => setHowOpen((o) => !o)}
          aria-expanded={howOpen}
          aria-controls="how-it-works-body"
        >
          How this works
          <Chevron $open={howOpen} aria-hidden="true" />
        </Trigger>
        <AnimatePresence initial={false}>
          {howOpen && (
            <motion.div
              id="how-it-works-body"
              key="how-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.25,
                ease: "easeInOut",
              }}
              style={{ overflow: "hidden" }}
            >
              <HowBody>
                <p>
                  These are spaced-repetition flashcards built on the{" "}
                  <strong>Leitner system</strong>. Every card sits in one of
                  five boxes:
                </p>
                <ul>
                  <li>New cards start in box 1 and are shown straight away.</li>
                  <li>
                    Answer <strong>Got it</strong> and the card moves up a box -
                    you won&apos;t see it again for a while, and the gap grows
                    each time (roughly 2, then 4, then 9, then 18 days).
                  </li>
                  <li>
                    Answer <strong>Missed it</strong> and it drops straight back
                    to box 1.
                  </li>
                  <li>
                    A card that reaches box 5 counts as{" "}
                    <strong>mastered</strong>.
                  </li>
                </ul>
                <p>
                  <strong>Start review</strong> shows the cards that are due
                  plus a few new ones; <strong>Cram all</strong> ignores the
                  schedule and runs through every card in the decks you&apos;ve
                  picked. Progress is saved in this browser only.
                </p>
                <p>
                  The idea came from Nicky Case&apos;s{" "}
                  <a
                    href="https://ncase.me/remember/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    How To Remember Anything Forever-ish
                  </a>
                  .
                </p>
              </HowBody>
            </motion.div>
          )}
        </AnimatePresence>
      </Panel>

      <SectionLabel>Decks</SectionLabel>
      <DeckList>
        {exam.decks.map((deck) => {
          const deckStats = statsFor(deck.cards);
          const started = deckStats.total - deckStats.unseen > 0;
          return (
            <DeckRow key={deck.id} onClick={() => toggle(deck.id)}>
              <Checkbox
                checked={selected.has(deck.id)}
                onChange={() => toggle(deck.id)}
                onClick={(e) => e.stopPropagation()}
                aria-label={deck.title}
              />
              <DeckRowIcon deckId={deck.id} />
              <DeckTitle>{deck.title}</DeckTitle>
              <DeckMeta>
                {deckStats.total} cards · {statusText(deckStats)}
              </DeckMeta>
              <SummaryLink
                to={`/flashcards/${exam.id}/${deck.id}/summary`}
                onClick={(e) => e.stopPropagation()}
              >
                Summary
              </SummaryLink>
              {started && (
                <DeckBarRow>
                  <BoxBar boxes={deckStats.boxes} unseen={deckStats.unseen} />
                </DeckBarRow>
              )}
            </DeckRow>
          );
        })}
      </DeckList>

      <SectionLabel>
        Progress {hasSelection ? "" : "(select a deck)"}
      </SectionLabel>
      <Legend>
        {stats.total} cards · {statusText(stats)}
      </Legend>
      <BoxBar boxes={stats.boxes} unseen={stats.unseen} tall />
      <Key>
        {stats.boxes.map((n, i) => (
          <KeyItem key={i}>
            <BoxSwatch $colour={BOX_COLOURS[i]} aria-hidden="true" />
            {i === 4 ? `${n} mastered` : `Box ${i + 1}: ${n}`}
          </KeyItem>
        ))}
        <KeyItem>
          <BoxSwatch $new aria-hidden="true" />
          {stats.unseen} new
        </KeyItem>
      </Key>

      <Actions>
        <PrimaryButton
          disabled={!hasSelection || reviewQueueEmpty}
          onClick={() => onStart({ deckIds: selectedIds, cram: false })}
        >
          Start review
        </PrimaryButton>
        <GhostButton
          disabled={!hasSelection}
          onClick={() => onStart({ deckIds: selectedIds, cram: true })}
        >
          Cram all
        </GhostButton>
      </Actions>

      {hasSelection && reviewQueueEmpty && (
        <CaughtUp>
          Nothing due and nothing new in these decks - you&apos;re caught up.
          Use <strong>Cram all</strong> to run through them anyway.
        </CaughtUp>
      )}

      <ResetButton onClick={onReset}>Reset progress</ResetButton>
    </div>
  );
}
