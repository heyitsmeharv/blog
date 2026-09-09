import { describe, it, expect } from "vitest";

import { exams, getExam, cardsForDecks } from "./decks";

const CARD_TYPES = ["definition", "scenario", "comparison", "cloze"];

describe("flashcards data", () => {
  it("every exam has an id, code, name and at least one deck", () => {
    for (const exam of exams) {
      expect(exam.id).toBeTruthy();
      expect(exam.code).toBeTruthy();
      expect(exam.name).toBeTruthy();
      expect(exam.decks.length).toBeGreaterThan(0);
    }
  });

  it("card ids are unique within an exam", () => {
    for (const exam of exams) {
      const ids = cardsForDecks(exam).map((card) => card.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("every card has front, back and a known type", () => {
    for (const exam of exams) {
      for (const card of cardsForDecks(exam)) {
        expect(card.front, card.id).toBeTruthy();
        expect(card.back, card.id).toBeTruthy();
        expect(CARD_TYPES, card.id).toContain(card.type);
      }
    }
  });

  it("getExam looks an exam up by id", () => {
    expect(getExam("saa-c03")?.code).toBe("SAA-C03");
    expect(getExam("nope")).toBeUndefined();
  });

  it("cardsForDecks filters by deck id and defaults to all decks", () => {
    const exam = getExam("saa-c03");
    const iamOnly = cardsForDecks(exam, ["iam"]);
    expect(iamOnly.length).toBeGreaterThan(0);
    expect(iamOnly.length).toBeLessThan(cardsForDecks(exam).length);
    expect(iamOnly.every((card) => card.deckId === "iam")).toBe(true);
    expect(cardsForDecks(exam, ["does-not-exist"])).toHaveLength(0);
  });

  it("cardsForDecks attaches the deckId of the deck each card came from", () => {
    const exam = getExam("saa-c03");
    for (const card of cardsForDecks(exam)) {
      expect(
        exam.decks.some((deck) => deck.id === card.deckId),
        card.id,
      ).toBe(true);
    }
  });

  it("any `label` a card has is a non-empty string", () => {
    for (const exam of exams) {
      for (const card of cardsForDecks(exam)) {
        if (card.label !== undefined) {
          expect(typeof card.label, card.id).toBe("string");
          expect(card.label.trim().length, card.id).toBeGreaterThan(0);
        }
      }
    }
  });

  it("the s3 deck (summary-sheet worked example) labels every card", () => {
    const s3 = getExam("saa-c03").decks.find((deck) => deck.id === "s3");
    for (const card of s3.cards) {
      expect(card.label, card.id).toBeTruthy();
    }
  });
});
