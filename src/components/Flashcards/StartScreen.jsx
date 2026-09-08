import { useState } from "react";
import styled from "styled-components";

import { cardsForDecks } from "./decks";

const Header = styled.header`
  margin-bottom: 2.4rem;
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
  gap: 1.2rem;
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

const DeckTitle = styled.span`
  flex: 1;
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const DeckMeta = styled.span`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.mutedText};
  white-space: nowrap;
`;

const MASTERED_COLOUR = "#4c9a6b";

const stateColour = ($state, theme) => {
  if ($state === "mastered") return MASTERED_COLOUR;
  if ($state === "learning") return theme.link;
  return theme.secondary; // new / unseen
};

const Bar = styled.div`
  display: flex;
  height: 1rem;
  border-radius: 999px;
  overflow: hidden;
  background: ${({ theme }) => theme.secondary}33;
  margin: 1.2rem 0 1rem;
`;

const Segment = styled.div`
  height: 100%;
  flex-grow: ${({ $count }) => $count};
  flex-basis: 0;
  background: ${({ $state, theme }) => stateColour($state, theme)};
`;

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

const Swatch = styled.span`
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  border-radius: 0.3rem;
  background: ${({ $state, theme }) => stateColour($state, theme)};
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

  const learning = stats.boxes.slice(0, 4).reduce((sum, n) => sum + n, 0);

  return (
    <div>
      <Header>
        <Code>{exam.code}</Code>
        <Name>{exam.name}</Name>
      </Header>

      <SectionLabel>Decks</SectionLabel>
      <DeckList>
        {exam.decks.map((deck) => {
          const deckStats = statsFor(deck.cards);
          return (
            <DeckRow key={deck.id} onClick={() => toggle(deck.id)}>
              <Checkbox
                checked={selected.has(deck.id)}
                onChange={() => toggle(deck.id)}
                onClick={(e) => e.stopPropagation()}
                aria-label={deck.title}
              />
              <DeckTitle>{deck.title}</DeckTitle>
              <DeckMeta>
                {deckStats.total} cards · {deckStats.due} due ·{" "}
                {deckStats.unseen} new
              </DeckMeta>
            </DeckRow>
          );
        })}
      </DeckList>

      <SectionLabel>
        Progress {hasSelection ? "" : "(select a deck)"}
      </SectionLabel>
      <Legend>
        {stats.total} cards · {stats.due} due now
      </Legend>
      <Bar aria-hidden="true">
        <Segment $state="mastered" $count={stats.mastered} />
        <Segment $state="learning" $count={learning} />
        <Segment $state="new" $count={stats.unseen} />
      </Bar>
      <Key>
        <KeyItem>
          <Swatch $state="mastered" aria-hidden="true" />
          {stats.mastered} mastered
        </KeyItem>
        <KeyItem>
          <Swatch $state="learning" aria-hidden="true" />
          {learning} learning
        </KeyItem>
        <KeyItem>
          <Swatch $state="new" aria-hidden="true" />
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
          Nothing due and nothing new in these decks - you're caught up. Use{" "}
          <strong>Cram all</strong> to run through them anyway.
        </CaughtUp>
      )}

      <ResetButton onClick={onReset}>Reset progress</ResetButton>
    </div>
  );
}
