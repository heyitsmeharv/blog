import { useEffect, useRef } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";

const Scrim = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 8999;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const Card = styled(motion.div)`
  position: fixed;
  z-index: 9000;
  top: 50%;
  left: 50%;
  width: min(420px, 92vw);
  background: ${({ theme }) => theme.surface || theme.secondary};
  border-radius: 1.2rem;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.3);
  padding: 2.4rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin: 0 0 0.8rem;
`;

const Message = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.mutedText || theme.text};
  margin: 0 0 2rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const Button = styled.button.attrs({ type: "button" })`
  font-family: inherit;
  font-size: 1.4rem;
  font-weight: 700;
  padding: 0.9rem 1.8rem;
  border-radius: 0.6rem;
  cursor: pointer;
  transition:
    background 0.15s,
    border-color 0.15s,
    filter 0.15s;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.focus};
    outline-offset: 3px;
  }
`;

const CancelButton = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.secondary};

  &:hover {
    border-color: ${({ theme }) => theme.text};
  }
`;

const ConfirmButton = styled(Button)`
  color: #fff;
  background: ${({ $destructive, theme }) =>
    $destructive ? "#8b191d" : theme.buttonColour};
  border: 2px solid
    ${({ $destructive, theme }) =>
      $destructive ? "#8b191d" : theme.buttonColour};

  &:hover {
    filter: brightness(0.9);
  }
`;

/**
 * Accessible confirmation modal - replaces window.confirm.
 * Styled to match the ContactMe dialog (scrim + centred card, motion).
 */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel,
}) {
  const cancelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    const id = setTimeout(() => cancelRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(id);
    };
  }, [open, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <Scrim
            key="confirm-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onCancel}
          />
          <Card
            key="confirm-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-message"
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
            transition={{ duration: 0.18 }}
          >
            <Title id="confirm-dialog-title">{title}</Title>
            <Message id="confirm-dialog-message">{message}</Message>
            <Row>
              <CancelButton ref={cancelRef} onClick={onCancel}>
                {cancelLabel}
              </CancelButton>
              <ConfirmButton $destructive={destructive} onClick={onConfirm}>
                {confirmLabel}
              </ConfirmButton>
            </Row>
          </Card>
        </>
      )}
    </AnimatePresence>
  );
}
