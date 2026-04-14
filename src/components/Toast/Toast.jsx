import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "motion/react";

import { LanguageContext } from "../../context/languageContext";
import {
  dismissNotificationText,
  notificationsText,
} from "../../helpers/i18nText";

const DURATION = 5000;

/* ── Layout ─────────────────────────────────────────── */
const Container = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.8rem;
  pointer-events: none;
`;

/* ── Card ───────────────────────────────────────────── */
const Card = styled(motion.div)`
  pointer-events: auto;
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  min-width: 30rem;
  max-width: 38rem;
  padding: 1.5rem 1.4rem 1.8rem 1.6rem;
  background: ${({ theme }) => theme.surface};
  border-left: 4px solid ${({ $accent }) => $accent};
  border-radius: 8px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 12px 32px rgba(0, 0, 0, 0.18);
  overflow: hidden;
`;

/* ── Body ───────────────────────────────────────────── */
const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

const ToastTitle = styled.p`
  margin: 0 0 0.3rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  font-family: "Raleway", sans-serif;
`;

const ToastDesc = styled.p`
  margin: 0;
  font-size: 1.3rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.mutedText || theme.text};
  font-family: "Raleway", sans-serif;
`;

/* ── Close button ───────────────────────────────────── */
const CloseBtn = styled.button`
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.mutedText || theme.text};
  padding: 0;
  display: flex;
  align-items: center;
  opacity: 0.5;
  margin-top: 0.2rem;
  transition: opacity 0.15s;
  font-family: inherit;

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.focus || theme.text};
    border-radius: 3px;
    opacity: 1;
  }
`;

/* ── Progress bar ───────────────────────────────────── */
const ProgressBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: ${({ $accent }) => $accent};
  opacity: 0.45;
`;

/* ── Icons ──────────────────────────────────────────── */
const SuccessIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    style={{ flexShrink: 0, marginTop: "0.15rem" }}
  >
    <circle cx="10" cy="10" r="10" fill="#15803d" />
    <path
      d="M5.5 10.5l3 3 6-6"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    style={{ flexShrink: 0, marginTop: "0.15rem" }}
  >
    <circle cx="10" cy="10" r="10" fill="#b91c1c" />
    <path
      d="M6.5 6.5l7 7M13.5 6.5l-7 7"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/* ── Single toast item ──────────────────────────────── */
function ToastItem({ toast, onDismiss }) {
  const language = useContext(LanguageContext);
  const isSuccess = toast.backgroundColor === "#15803d";
  const accent = toast.backgroundColor;

  /* Each toast manages its own countdown */
  useEffect(() => {
    const t = setTimeout(() => onDismiss(toast.id), DURATION);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card
      $accent={accent}
      layout
      initial={{ opacity: 0, x: 48, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 48, scale: 0.96, transition: { duration: 0.18 } }}
      transition={{ type: "spring", damping: 22, stiffness: 300 }}
      role="status"
      aria-live="polite"
    >
      {isSuccess ? <SuccessIcon /> : <ErrorIcon />}

      <Body>
        <ToastTitle>{toast.title}</ToastTitle>
        <ToastDesc>{toast.description}</ToastDesc>
      </Body>

      <CloseBtn
        onClick={() => onDismiss(toast.id)}
        aria-label={dismissNotificationText(language, toast.title)}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 1l10 10M11 1L1 11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </CloseBtn>

      <ProgressBar
        $accent={accent}
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: DURATION / 1000, ease: "linear" }}
      />
    </Card>
  );
}

/* ── Toast container ────────────────────────────────── */
const Toast = ({ toastList }) => {
  const language = useContext(LanguageContext);
  const [list, setList] = useState([]);

  const dismiss = useCallback((id) => {
    setList((current) => current.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    setList(toastList);
  }, [toastList]);

  return (
    <Container role="region" aria-label={notificationsText(language)}>
      <AnimatePresence mode="popLayout">
        {list.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </AnimatePresence>
    </Container>
  );
};

export default Toast;
