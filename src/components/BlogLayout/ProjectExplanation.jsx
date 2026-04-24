import React from "react";

import { CodeBlockWithCopy } from "../Code/Code";
import {
  SectionHeading,
  TertiaryHeading,
  Paragraph,
  TextList,
  TextListItem,
  Strong,
} from "../Typography/Typography";

const renderParagraphContent = (content) => {
  if (!content) return null;

  if (Array.isArray(content)) {
    return content.map((item, index) => (
      <Paragraph key={`${index}-${String(item).slice(0, 16)}`}>
        {item}
      </Paragraph>
    ));
  }

  return <Paragraph>{content}</Paragraph>;
};

const renderSectionContent = (content) => {
  if (!content) return null;

  if (typeof content === "string" || Array.isArray(content)) {
    return renderParagraphContent(content);
  }

  return content;
};

export const ProjectArchitecture = ({
  title = "Architecture at a Glance",
  summary,
  diagram,
  children,
}) => (
  <>
    <SectionHeading>{title}</SectionHeading>
    {renderSectionContent(summary)}
    {diagram && <CodeBlockWithCopy code={diagram} />}
    {renderSectionContent(children)}
  </>
);

export const EngineeringDecisions = ({
  title = "Notable Design Decisions",
  decisions = [],
}) => (
  <>
    <SectionHeading>{title}</SectionHeading>
    {decisions.map((decision) => (
      <React.Fragment key={decision.title}>
        <TertiaryHeading>{decision.title}</TertiaryHeading>
        {renderParagraphContent(decision.body)}
      </React.Fragment>
    ))}
  </>
);

export const ProjectChallenges = ({
  title = "Problems I Had to Solve",
  challenges = [],
}) => (
  <>
    <SectionHeading>{title}</SectionHeading>
    <TextList>
      {challenges.map((challenge) => (
        <TextListItem key={challenge.title}>
          <Strong>{challenge.title}</Strong>
          {challenge.body && <> - {challenge.body}</>}
        </TextListItem>
      ))}
    </TextList>
  </>
);

export const ProjectCritique = ({ title = "Critical Review", children }) => (
  <>
    <SectionHeading>{title}</SectionHeading>
    {renderSectionContent(children)}
  </>
);

export const ProjectNextSteps = ({
  title = "What I Would Improve Next",
  children,
}) => (
  <>
    <SectionHeading>{title}</SectionHeading>
    {renderSectionContent(children)}
  </>
);

const ProjectExplanation = ({
  architecture,
  decisions,
  challenges,
  critique,
  nextSteps,
}) => (
  <>
    {architecture && <ProjectArchitecture {...architecture} />}
    {decisions && <EngineeringDecisions decisions={decisions} />}
    {challenges && <ProjectChallenges challenges={challenges} />}
    {critique && <ProjectCritique>{critique}</ProjectCritique>}
    {nextSteps && <ProjectNextSteps>{nextSteps}</ProjectNextSteps>}
  </>
);

export default ProjectExplanation;
