import { saaC03 } from "./saa-c03";

/**
 * Flashcards data: Exam → Deck → Card.
 *
 *   Exam  { id, code, name, blurb, decks[] }   - one localStorage key per exam
 *   Deck  { id, title, postSlug, cards[] }     - id matches `?decks=` and a blog post
 *   Card  { id, type, front, back, ref }       - id is stable and unique within the exam
 *                                               (cardsForDecks also attaches `deckId`)
 *
 * `type` is one of: "definition" | "scenario" | "comparison" | "cloze".
 * `ref` names the section of the source blog post the card came from, so each
 * card can be checked against the post.
 *
 * Add a new exam: create ./<exam-id>/, export its manifest, list it here.
 */
export const exams = [saaC03];

export const getExam = (examId) => exams.find((exam) => exam.id === examId);

/**
 * Flatten the cards for a set of decks within an exam.
 * `deckIds` omitted → every deck in the exam.
 */
export function cardsForDecks(exam, deckIds) {
  if (!exam) return [];
  return exam.decks
    .filter((deck) => !deckIds || deckIds.includes(deck.id))
    .flatMap((deck) =>
      deck.cards.map((card) => ({ ...card, deckId: deck.id })),
    );
}
