import React from "react";
import styled from "styled-components";

import SlideInBottom from "../../animations/SlideInBottom";
import { aboutMe, aboutMeText, introductionText } from "../../helpers/i18nText";

const Container = styled.section`
  width: 100%;
  padding: 6rem 0;
  background: ${({ theme }) => theme.secondary}18;
  animation: ${SlideInBottom} 0.5s forwards;

  @media only screen and (max-width: 900px) {
    padding: 5rem 0;
  }

  @media only screen and (max-width: 600px) {
    padding: 4rem 0;
  }
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 5rem);
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
`;

const Separator = styled.div`
  width: 4rem;
  height: 3px;
  background: ${({ theme }) => theme.text};
  margin-bottom: 3rem;
  border-radius: 2px;
`;

const Text = styled.p`
  font-size: 1.6rem;
  line-height: 1.9;
  max-width: 80ch;
  letter-spacing: 0.2px;
`;

const AboutMe = ({ language }) => (
  <Container id="about">
    <Inner>
      <Title>{aboutMe(language)}</Title>
      <Separator />
      <Text>{aboutMeText(language)}</Text>
      <br />
      <Text>{introductionText(language)}</Text>
    </Inner>
  </Container>
);

export default AboutMe;
