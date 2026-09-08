import { useCallback, useState } from "react";

/**
 * Leitner spaced repetition, as a hook.
 *
 *   - 5 boxes. A new card starts in box 1.
 *   - "Got it"    → move up one box (never past 5).
 *   - "Missed it" → straight back to box 1.
 *   - Higher boxes are reviewed less often: 0, 2, 4, 9, 18 days.
 *
 * Only *progress* is saved to localStorage — one small entry per card:
 *   { box, dueAt, lastReviewedAt, reps, lapses }
 * The card text lives in the deck files and is never stored. Cards you add
 * later show up as "unseen"; cards you remove leave a harmless orphan entry
 * that nothing reads.
 */

// Days to wait before a card in each box is due again (index = box - 1).
const REVIEW_AFTER_DAYS = [0, 2, 4, 9, 18];
const TOP_BOX = REVIEW_AFTER_DAYS.length; // 5
const DAY = 24 * 60 * 60 * 1000;

/* ────────────────────────────────────────────────────────────────────────────
 * Plain functions — the whole Leitner rule set. No React in here.
 * ──────────────────────────────────────────────────────────────────────────── */

/** A card seen for the first time: box 1, due now, nothing reviewed yet. */
export function newEntry(at = Date.now()) {
  return { box: 1, dueAt: at, lastReviewedAt: null, reps: 0, lapses: 0 };
}

/** Has this card's review time arrived? (no entry = never studied = "new", not "due") */
export function isDue(entry, at = Date.now()) {
  return Boolean(entry) && entry.dueAt <= at;
}

/** The new entry after answering one card. Counts the rep, and a lapse if wrong. */
export function review(entry, gotIt, at = Date.now()) {
  const current = entry ?? newEntry(at);
  const box = gotIt ? Math.min(current.box + 1, TOP_BOX) : 1;
  return {
    box,
    dueAt: at + REVIEW_AFTER_DAYS[box - 1] * DAY,
    lastReviewedAt: at,
    reps: current.reps + 1,
    lapses: current.lapses + (gotIt ? 0 : 1),
  };
}

/**
 * The cards to study right now:
 *   normal → everything that's due, then up to `newLimit` cards you've never seen
 *   cram   → every card in the selected decks, schedule ignored
 */
export function pickQueue(
  cards,
  progress,
  { cram = false, newLimit = 15, at = Date.now() } = {},
) {
  if (cram) return cards;
  const due = cards.filter((card) => isDue(progress[card.id], at));
  const fresh = cards.filter((card) => !progress[card.id]).slice(0, newLimit);
  return [...due, ...fresh];
}

/** Counts for the start screen. */
export function summarise(cards, progress, at = Date.now()) {
  const boxes = [0, 0, 0, 0, 0];
  let unseen = 0;
  let due = 0;
  let lapses = 0;

  for (const card of cards) {
    const entry = progress[card.id];
    if (!entry) {
      unseen += 1;
      continue;
    }
    boxes[entry.box - 1] += 1;
    lapses += entry.lapses;
    if (isDue(entry, at)) due += 1;
  }

  return {
    total: cards.length,
    unseen,
    due,
    mastered: boxes[TOP_BOX - 1],
    lapses,
    boxes,
  };
}

/* ────────────────────────────────────────────────────────────────────────────
 * Persistence — one localStorage key per exam.
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * Bump this only when old saved progress genuinely can't be used any more
 * (a card-id scheme change, an entry-shape change with no sensible default).
 * On a mismatch the old data is dropped and you start fresh — same effect as
 * the in-app "reset progress" button, just applied automatically.
 */
export const PROGRESS_VERSION = 1;

function load(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && saved.version === PROGRESS_VERSION) return saved.entries;
  } catch {
    /* absent or corrupt — start fresh */
  }
  return {};
}

function save(key, entries) {
  localStorage.setItem(
    key,
    JSON.stringify({ version: PROGRESS_VERSION, entries }),
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * The hook — holds progress for one exam and persists it.
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * @param {string} examId  e.g. "saa-c03" — each exam gets its own localStorage key
 * @returns {{
 *   progress: Record<string, ReturnType<typeof newEntry>>,
 *   grade: (cardId: string, gotIt: boolean) => void,
 *   reset: () => void,
 *   queueFor: (cards: Array, opts?: object) => Array,
 *   statsFor: (cards: Array) => ReturnType<typeof summarise>,
 * }}
 */
export function useFlashcards(examId) {
  const storageKey = `flashcards:${examId}`;
  const [progress, setProgress] = useState(() => load(storageKey));

  const grade = useCallback(
    (cardId, gotIt) => {
      setProgress((current) => {
        const next = { ...current, [cardId]: review(current[cardId], gotIt) };
        save(storageKey, next);
        return next;
      });
    },
    [storageKey],
  );

  const reset = useCallback(() => {
    localStorage.removeItem(storageKey);
    setProgress({});
  }, [storageKey]);

  return {
    progress,
    grade,
    reset,
    queueFor: (cards, opts) => pickQueue(cards, progress, opts),
    statsFor: (cards) => summarise(cards, progress),
  };
}
