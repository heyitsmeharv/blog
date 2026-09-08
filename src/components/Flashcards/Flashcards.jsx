import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

import { Analytics } from "../../helpers/analytics";
import SlideInBottom from "../../animations/SlideInBottom";
import { useFlashcards } from "../../hooks/useFlashcards";
import { cardsForDecks, exams, getExam } from "./decks";
import StartScreen from "./StartScreen";
import Session from "./Session";
import ConfirmDialog from "./ConfirmDialog";

const Page = styled.div`
  min-height: calc(100vh - 6.5rem);
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.primary};
  animation: ${SlideInBottom} 0.5s forwards;
`;

const Inner = styled.div`
  max-width: 820px;
  margin: 0 auto;
`;

const PickerHeading = styled.h1`
  font-size: clamp(2.6rem, 4vw, 3.6rem);
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin: 0 0 0.8rem;
`;

const PickerIntro = styled.p`
  font-size: 1.6rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.mutedText};
  margin: 0 0 3rem;
`;

const ExamCard = styled(Link)`
  display: block;
  padding: 2rem 2.2rem;
  margin-bottom: 1.4rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.secondary}55;
  border-radius: 1rem;
  text-decoration: none;
  transition:
    transform 0.15s,
    border-color 0.15s;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.secondary};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.focus};
    outline-offset: 3px;
  }
`;

const ExamCode = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.mutedText};
`;

const ExamName = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 0.4rem 0 0.8rem;
`;

const ExamBlurb = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.mutedText};
  margin: 0;
`;

const decksStorageKey = (examId) => `flashcards:${examId}:decks`;

const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

/** Which decks to pre-select: ?decks= param → last saved selection → all decks. */
function initialDeckIds(exam, query) {
  const valid = (ids) =>
    ids.filter((id) => exam.decks.some((d) => d.id === id));

  const fromQuery = query.get("decks");
  if (fromQuery) {
    const picked = valid(fromQuery.split(",").map((s) => s.trim()));
    if (picked.length) return picked;
  }

  try {
    const saved = JSON.parse(localStorage.getItem(decksStorageKey(exam.id)));
    if (Array.isArray(saved)) {
      const picked = valid(saved);
      if (picked.length) return picked;
    }
  } catch {
    /* ignore */
  }

  return exam.decks.map((d) => d.id);
}

export default function Flashcards() {
  const { examId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  useEffect(() => {
    Analytics.pageview("/flashcards");
    Analytics.track("flashcards_opened", examId ? { examId } : {});
  }, [examId]);

  // With a single exam there's nothing to pick - go straight in.
  useEffect(() => {
    if (!examId && exams.length === 1) {
      history.replace(`/flashcards/${exams[0].id}`);
    }
  }, [examId, history]);

  const exam = examId ? getExam(examId) : null;
  const { grade, reset, queueFor, statsFor } = useFlashcards(
    exam?.id ?? "none",
  );

  const [session, setSession] = useState(null);
  const [confirmingReset, setConfirmingReset] = useState(false);

  const startSession = useCallback(
    ({ deckIds, cram }) => {
      localStorage.setItem(decksStorageKey(exam.id), JSON.stringify(deckIds));
      const queue = shuffle(queueFor(cardsForDecks(exam, deckIds), { cram }));
      if (!queue.length) return;
      setSession({ mode: cram ? "cram" : "review", queue });
      Analytics.track("flashcards_session_started", {
        examId: exam.id,
        mode: cram ? "cram" : "review",
        count: queue.length,
      });
    },
    [exam, queueFor],
  );

  const handleReset = useCallback(() => setConfirmingReset(true), []);

  const confirmReset = useCallback(() => {
    reset();
    setConfirmingReset(false);
  }, [reset]);

  if (!exam) {
    return (
      <Page>
        <Inner>
          <PickerHeading>Flashcards</PickerHeading>
          <PickerIntro>
            Spaced-repetition decks built from the blog posts. Pick an exam.
          </PickerIntro>
          {exams.map((item) => {
            const stats = statsFor(cardsForDecks(item));
            return (
              <ExamCard key={item.id} to={`/flashcards/${item.id}`}>
                <ExamCode>{item.code}</ExamCode>
                <ExamName>{item.name}</ExamName>
                <ExamBlurb>
                  {stats.total} cards · {stats.due} due · {stats.unseen} new
                </ExamBlurb>
              </ExamCard>
            );
          })}
        </Inner>
      </Page>
    );
  }

  return (
    <Page>
      <Inner>
        {session ? (
          <Session
            mode={session.mode}
            queue={session.queue}
            onGrade={grade}
            onExit={() => setSession(null)}
          />
        ) : (
          <StartScreen
            exam={exam}
            statsFor={statsFor}
            initialDeckIds={initialDeckIds(exam, query)}
            onStart={startSession}
            onReset={handleReset}
          />
        )}
      </Inner>
      <ConfirmDialog
        open={confirmingReset}
        title="Reset progress?"
        message={`This clears all ${exam.name} flashcard progress and can't be undone.`}
        confirmLabel="Reset"
        cancelLabel="Cancel"
        destructive
        onConfirm={confirmReset}
        onCancel={() => setConfirmingReset(false)}
      />
    </Page>
  );
}
