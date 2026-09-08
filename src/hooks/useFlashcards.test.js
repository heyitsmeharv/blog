import { describe, it, expect } from "vitest";

import { newEntry, isDue, review, pickQueue, summarise } from "./useFlashcards";

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.UTC(2026, 0, 1, 12, 0, 0);

const cards = (...ids) => ids.map((id) => ({ id }));

describe("newEntry", () => {
  it("is box 1, due now, nothing reviewed", () => {
    expect(newEntry(NOW)).toEqual({
      box: 1,
      dueAt: NOW,
      lastReviewedAt: null,
      reps: 0,
      lapses: 0,
    });
  });
});

describe("isDue", () => {
  it("is false when the card has never been studied", () => {
    expect(isDue(undefined, NOW)).toBe(false);
  });

  it("is true once dueAt has passed", () => {
    expect(isDue({ dueAt: NOW }, NOW)).toBe(true);
    expect(isDue({ dueAt: NOW - 1 }, NOW)).toBe(true);
    expect(isDue({ dueAt: NOW + 1 }, NOW)).toBe(false);
  });
});

describe("review", () => {
  it("moves a new card to box 2, due 2 days later, and counts the rep", () => {
    expect(review(undefined, true, NOW)).toEqual({
      box: 2,
      dueAt: NOW + 2 * DAY,
      lastReviewedAt: NOW,
      reps: 1,
      lapses: 0,
    });
  });

  it("promotes one box on a correct answer", () => {
    const entry = {
      box: 3,
      dueAt: NOW,
      lastReviewedAt: NOW,
      reps: 4,
      lapses: 1,
    };
    expect(review(entry, true, NOW)).toMatchObject({
      box: 4,
      dueAt: NOW + 9 * DAY,
      reps: 5,
      lapses: 1,
    });
  });

  it("never goes past the top box", () => {
    const entry = {
      box: 5,
      dueAt: NOW,
      lastReviewedAt: NOW,
      reps: 9,
      lapses: 0,
    };
    expect(review(entry, true, NOW)).toMatchObject({
      box: 5,
      dueAt: NOW + 18 * DAY,
    });
  });

  it("drops to box 1, stays due, and counts a lapse on a wrong answer", () => {
    const entry = {
      box: 4,
      dueAt: NOW,
      lastReviewedAt: NOW,
      reps: 6,
      lapses: 2,
    };
    const next = review(entry, false, NOW);
    expect(next).toEqual({
      box: 1,
      dueAt: NOW,
      lastReviewedAt: NOW,
      reps: 7,
      lapses: 3,
    });
    expect(isDue(next, NOW)).toBe(true);
  });

  it("does not mutate the input entry", () => {
    const entry = newEntry(NOW);
    const snapshot = { ...entry };
    review(entry, true, NOW);
    expect(entry).toEqual(snapshot);
  });
});

describe("pickQueue", () => {
  const deck = cards("due1", "due2", "new1", "new2", "new3", "later");
  const progress = {
    due1: { box: 2, dueAt: NOW - DAY },
    due2: { box: 1, dueAt: NOW },
    later: { box: 3, dueAt: NOW + 5 * DAY },
  };

  it("returns due cards first, then caps new cards", () => {
    const queue = pickQueue(deck, progress, { newLimit: 2, at: NOW });
    expect(queue.map((c) => c.id)).toEqual(["due1", "due2", "new1", "new2"]);
  });

  it("skips cards that are seen but not due yet", () => {
    const queue = pickQueue(deck, progress, { newLimit: 0, at: NOW });
    expect(queue.map((c) => c.id)).toEqual(["due1", "due2"]);
  });

  it("cram mode returns every card, schedule ignored", () => {
    const queue = pickQueue(deck, progress, { cram: true, at: NOW });
    expect(queue).toHaveLength(deck.length);
  });
});

describe("summarise", () => {
  it("counts unseen, due, mastered, lapses and the box distribution", () => {
    const deck = cards("a", "b", "c", "d", "e");
    const progress = {
      a: { box: 1, dueAt: NOW - DAY, lapses: 3 }, // due
      b: { box: 3, dueAt: NOW + DAY, lapses: 1 }, // waiting
      c: { box: 5, dueAt: NOW + DAY, lapses: 0 }, // mastered
      d: { box: 5, dueAt: NOW - DAY, lapses: 2 }, // mastered + due
      // e: unseen
    };

    expect(summarise(deck, progress, NOW)).toEqual({
      total: 5,
      unseen: 1,
      due: 2,
      mastered: 2,
      lapses: 6,
      boxes: [1, 0, 1, 0, 2],
    });
  });
});
