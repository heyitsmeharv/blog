import React from "react";
import styled from "styled-components";
import { motion } from "motion/react";
import { HandThumbsUp } from "@styled-icons/bootstrap/HandThumbsUp";
import { useLikeCount } from "../../hooks/useLikes";

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.mutedText || theme.secondary};
  font-size: 1.3rem;
  font-weight: 600;
  opacity: 0.7;

  svg {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
  }
`;

const Spinner = styled(motion.span)`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  opacity: 0.5;
  flex-shrink: 0;
`;

const LikeCount = ({ postId }) => {
  const count = useLikeCount(postId);
  return (
    <Wrapper aria-label={`${count ?? 0} like${count === 1 ? "" : "s"}`}>
      <HandThumbsUp aria-hidden="true" />
      {count === null ? (
        <Spinner
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />
      ) : (
        <>{count}</>
      )}
    </Wrapper>
  );
};

export default LikeCount;
