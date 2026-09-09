import { Link } from "react-router-dom";
import styled from "styled-components";

import { Analytics } from "../../helpers/analytics";

const Wrap = styled.div`
  margin: 3rem 0 1rem;
  padding: 1.8rem 2rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.secondary}55;
  border-radius: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.6rem;
`;

const Text = styled.p`
  margin: 0;
  flex: 1;
  min-width: 20rem;
  font-size: 1.5rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.text};
`;

const Action = styled(Link)`
  flex-shrink: 0;
  font-size: 1.4rem;
  font-weight: 700;
  padding: 0.9rem 1.8rem;
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.buttonColour};
  color: ${({ theme }) => theme.buttonText};
  border: 2px solid ${({ theme }) => theme.buttonColour};
  text-decoration: none;
  white-space: nowrap;
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

/**
 * End-of-post prompt linking to the flashcard deck for this topic. The summary
 * sheet is reached from the flashcards start screen, not from here.
 * `deck` is the deck id (matches a deck in the exam manifest and `?decks=`).
 */
export default function ReviewTopicCTA({ examId = "saa-c03", deck, label }) {
  const name = label ?? "this topic";
  return (
    <Wrap>
      <Text>Review this {name} post with spaced-repetition flashcards.</Text>
      <Action
        to={`/flashcards/${examId}?decks=${deck}`}
        onClick={() =>
          Analytics.track("flashcards_review_topic_clicked", { examId, deck })
        }
      >
        Review {name}
      </Action>
    </Wrap>
  );
}
