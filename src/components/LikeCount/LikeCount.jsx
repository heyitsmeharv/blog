import React from "react";
import styled from "styled-components";
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

const LikeCount = ({ postId }) => {
  const count = useLikeCount(postId);
  return (
    <Wrapper aria-label={`${count ?? 0} like${count === 1 ? "" : "s"}`}>
      <HandThumbsUp aria-hidden="true" />
      {count === null ? "—" : count}
    </Wrapper>
  );
};

export default LikeCount;
