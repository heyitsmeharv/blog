import styled from "styled-components";

import SlideInBottom from "../../animations/SlideInBottom";
import FadeUp from "../../animations/FadeUp";
import {
  aboutMe,
  aboutMeText,
  introductionText,
  introductionTextExtended,
  introductionStandoutLabel,
  introductionStandoutLabelSecondary,
} from "../../helpers/i18nText";

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

const Standout = styled.div`
  margin: 0 0 3rem;
  animation: ${FadeUp} 0.5s ease 0.5s both;
`;

const Body = styled.div`
  animation: ${FadeUp} 0.5s ease 0.85s both;
`;

const StandoutLabel = styled.p`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 0 1.4rem;
  font-size: 1.3rem;
  font-weight: 900;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.link};

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.link};
  }
`;

const StandoutText = styled.p`
  margin: 0;
  font-size: clamp(1.8rem, 1.4rem + 1vw, 2.2rem);
  font-weight: 200;
  line-height: 1.6;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.mutedText};
  text-wrap: balance;

  strong {
    font-weight: 700;
    color: ${({ theme }) => theme.text};
  }
`;

const standoutText = (language) =>
  language === "EN" ? (
    <>
      <strong>Leading</strong> development teams, <strong>modernising</strong>{" "}
      infrastructure, and <strong>delivering</strong> scalable internal tools
      across diverse industries.
    </>
  ) : (
    <>
      <strong>Lidero</strong> equipos de desarrollo, <strong>modernizo</strong>{" "}
      infraestructuras y <strong>desarrollo</strong> herramientas internas
      escalables para diversos sectores.
    </>
  );

const AboutMe = ({ language }) => (
  <Container id="about">
    <Inner>
      <Title>{aboutMe(language)}</Title>
      <Separator />
      <Standout>
        <StandoutLabel>{introductionStandoutLabel(language)}</StandoutLabel>
        <StandoutText>{standoutText(language)}</StandoutText>
      </Standout>
      <Body>
        <StandoutLabel>
          {introductionStandoutLabelSecondary(language)}
        </StandoutLabel>
        <Text>{aboutMeText(language)}</Text>
        <br />
        <Text>{introductionText(language)}</Text>
        <br />
        <Text>{introductionTextExtended(language)}</Text>
      </Body>
    </Inner>
  </Container>
);

export default AboutMe;
