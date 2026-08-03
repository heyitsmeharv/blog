import React, { useContext } from "react";
import styled from "styled-components";

import { LanguageContext } from "../../context/languageContext";
import { postTypeText } from "../../helpers/i18nText";

export const TYPE_COLORS = {
  Practical: { bg: "#FFC349", text: "#000000" },
  Study: { bg: "#063B00", text: "#FFFFFF" },
  Theory: { bg: "#EC6530", text: "#FFFFFF" },
  Reflection: { bg: "#249D8F", text: "#FFFFFF" },
};

const StyledTypeBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 1rem;
  border-radius: 999px;
  font-size: 1.2rem;
  font-weight: 700;
  background: ${({ $bg }) => $bg || "#e5e7eb"};
  color: ${({ $color }) => $color || "#374151"};
`;

const TypeBadge = ({ type, ...rest }) => {
  const language = useContext(LanguageContext);
  const typeStyle = TYPE_COLORS[type] || {};

  return (
    <StyledTypeBadge $bg={typeStyle.bg} $color={typeStyle.text} {...rest}>
      {postTypeText(language, type)}
    </StyledTypeBadge>
  );
};

export default TypeBadge;
