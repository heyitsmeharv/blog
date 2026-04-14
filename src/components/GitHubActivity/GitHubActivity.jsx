import React from "react";
import styled from "styled-components";
import { GitHubCalendar } from "react-github-calendar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import SlideInBottom from "../../animations/SlideInBottom";
import {
  contributionTooltipText,
  githubActivityText,
} from "../../helpers/i18nText";

const Container = styled.section`
  width: 100%;
  padding: 6rem 0;
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

const CalendarWrapper = styled.div`
  overflow-x: auto;

  /* Let the calendar adapt to the current theme text colour */
  .react-activity-calendar__legend-month,
  .react-activity-calendar__legend-weekday,
  .react-activity-calendar__count {
    fill: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.text};
  }
`;

const GitHubActivity = ({ language }) => {
  return (
    <Container id="github">
      <Inner>
        <Title>{githubActivityText(language)}</Title>
        <Separator />
        <CalendarWrapper>
          <GitHubCalendar
            username="heyitsmeharv"
            blockSize={14}
            blockMargin={4}
            fontSize={14}
            colorScheme="light"
            renderBlock={(block, activity) =>
              React.cloneElement(block, {
                "data-tooltip-id": "github-activity-tooltip",
                "data-tooltip-content": contributionTooltipText(
                  language,
                  activity.count,
                  activity.date,
                ),
              })
            }
          />
          <Tooltip
            id="github-activity-tooltip"
            style={{ fontSize: "1.2rem" }}
          />
        </CalendarWrapper>
      </Inner>
    </Container>
  );
};

export default GitHubActivity;
