import React, { useContext } from "react";
import styled from "styled-components";

// animations
import SlideInLeft from "../animations/SlideInLeft";
import { LanguageContext } from "../context/languageContext";
import { notFoundDescriptionText } from "../helpers/i18nText";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px);
  background-color: #f8f9fa;
  color: #343a40;
  animation: ${SlideInLeft} 0.5s forwards;
`;

const Message = styled.h1`
  font-size: 5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 600px;
`;

const NotFoundPage = () => {
  const language = useContext(LanguageContext);

  return (
    <Container>
      <Message>404</Message>
      <Description>{notFoundDescriptionText(language)}</Description>
    </Container>
  );
};

export default NotFoundPage;
