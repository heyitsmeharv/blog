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
    expect(iamOnly).toEqual(cardsForDecks(exam)); // only one deck so far
    expect(cardsForDecks(exam, ["does-not-exist"])).toHaveLength(0);
  });
});
