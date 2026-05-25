import React from "react";
import styled from "styled-components";
import { HandThumbsUpFill } from "@styled-icons/bootstrap/HandThumbsUpFill";
import { HandThumbsUp } from "@styled-icons/bootstrap/HandThumbsUp";
import { useLikes } from "../../hooks/useLikes";

const Wrapper = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  color: ${({ $liked, theme }) =>
    $liked ? theme.secondary : theme.mutedText || theme.secondary};
  font-size: 1.4rem;
  font-family: inherit;
  transition:
    color 0.15s,
    opacity 0.15s;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const ThumbIcon = styled.span`
  display: inline-flex;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Count = styled.span`
  font-size: 1.3rem;
  min-width: 1.5ch;
`;

const LikeButton = ({ postId, visitorId }) => {
  const { count, liked, loading, handleLike, handleUnlike } = useLikes(
    postId,
    visitorId,
  );

  const handleClick = () => {
    if (liked) {
      handleUnlike();
    } else {
      handleLike();
    }
  };

  return (
    <Wrapper
      type="button"
      $liked={liked}
      disabled={loading}
      onClick={handleClick}
      aria-label={liked ? "Remove like" : "Like this post"}
      aria-pressed={liked}
    >
      <ThumbIcon aria-hidden="true">
        {liked ? <HandThumbsUpFill /> : <HandThumbsUp />}
      </ThumbIcon>
      <Count>{count === null ? "—" : count}</Count>
    </Wrapper>
  );
};

export default LikeButton;
