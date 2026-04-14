import React, { useState, useEffect } from "react";
import styled from "styled-components";

import SlideInBottom from "../../animations/SlideInBottom";
import { skillsText, skillsListText } from "../../helpers/i18nText";
import awscp from "../../resources/images/aws-certified-cloud-practitioner.png";

import {
  AWSWhiteBackgroundSVG,
  GraphqlSVG,
  ReactjsSVG,
  ExpressSVG,
  JavascriptSVG,
  NodejsSVG,
  HtmlSVG,
  CssSVG,
  MongoDBSVG,
  MySQLSVG,
  TwilioSVG,
  WebpackSVG,
  DockerSVG,
  GitHubSVG,
  GitSVG,
  SassSVG,
  StyledComponentsSVG,
  HerokuSVG,
  CPlusPlusSVG,
  CSharpSVG,
  ElectronJSSVG,
  RaspberryPiSVG,
  JIRASVG,
  BitBucketSVG,
  ConfluenceSVG,
  MaterialUISVG,
  NetlifySVG,
  SocketIOSVG,
  ServerlessSVG,
  TerraformSVG,
  CypressSVG,
  ESLintSVG,
  PrettierSVG,
} from "../../resources/styles/icons";

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
  margin-bottom: 2.5rem;
  border-radius: 2px;
`;

const Subtitle = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.mutedText || theme.secondary};
  font-weight: 600;
  margin-bottom: 2.5rem;
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 3rem;
`;

const FilterButton = styled.button`
  font-family: "Raleway", sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.6rem 1.6rem;
  border-radius: 999px;
  border: 1.5px solid
    ${({ theme, $active }) => ($active ? theme.text : `${theme.secondary}80`)};
  background: ${({ theme, $active }) => ($active ? theme.text : "transparent")};
  color: ${({ theme, $active }) => ($active ? theme.primary : theme.text)};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.primary};
  }
`;

const TagsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3.5rem;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.6rem 1.4rem;
  border-radius: 999px;
  border: 1.5px solid ${({ theme }) => `${theme.secondary}60`};
  font-size: 1.4rem;
  font-weight: 600;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  transition: border-color 0.15s;
  cursor: default;

  &:hover {
    border-color: ${({ theme }) => theme.text};
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 18px;
  height: 18px;

  svg {
    width: 18px !important;
    height: 18px !important;
    margin: 0 !important;
    padding: 0 !important;
  }
`;

const CertRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const CertImage = styled.img`
  transition: opacity 0.2s;

  &:hover {
    cursor: pointer;
    opacity: 0.85;
  }
`;

const skillList = [
  { icon: <HtmlSVG />, title: "HTML", tag: ["all", "webDev"] },
  { icon: <CssSVG />, title: "CSS", tag: ["all", "webDev"] },
  {
    icon: <JavascriptSVG />,
    title: "JavaScript",
    tag: ["all", "language", "webDev"],
  },
  { icon: <SassSVG />, title: "Sass", tag: ["all", "webDev"] },
  {
    icon: <StyledComponentsSVG />,
    title: "Styled Components",
    tag: ["all", "webDev"],
  },
  { icon: <ReactjsSVG />, title: "React", tag: ["all", "webDev"] },
  { icon: <MaterialUISVG />, title: "Material UI", tag: ["all", "webDev"] },
  { icon: <NodejsSVG />, title: "Node", tag: ["all", "language"] },
  {
    icon: <CypressSVG />,
    title: "Cypress",
    tag: ["all", "language", "webDev"],
  },
  { icon: <ESLintSVG />, title: "ESLint", tag: ["all", "webDev"] },
  { icon: <PrettierSVG />, title: "Prettier", tag: ["all", "webDev"] },
  {
    icon: <ElectronJSSVG />,
    title: "Electron",
    tag: ["all", "language", "webDev"],
  },
  { icon: <ExpressSVG />, title: "Express", tag: ["all", "webDev"] },
  { icon: <CPlusPlusSVG />, title: "C++", tag: ["all", "language"] },
  { icon: <CSharpSVG />, title: "C#", tag: ["all", "language"] },
  { icon: <AWSWhiteBackgroundSVG />, title: "AWS", tag: ["all", "misc"] },
  { icon: <ServerlessSVG />, title: "Serverless", tag: ["all", "misc"] },
  { icon: <TerraformSVG />, title: "Terraform", tag: ["all", "misc"] },
  { icon: <HerokuSVG />, title: "Heroku", tag: ["all", "misc"] },
  { icon: <NetlifySVG />, title: "Netlify", tag: ["all", "misc"] },
  { icon: <TwilioSVG />, title: "Twilio", tag: ["all", "misc"] },
  { icon: <SocketIOSVG />, title: "Socket IO", tag: ["all", "webDev"] },
  { icon: <MongoDBSVG />, title: "Mongo DB", tag: ["all", "database"] },
  { icon: <RaspberryPiSVG />, title: "Raspberry Pi", tag: ["all", "misc"] },
  { icon: <GraphqlSVG />, title: "GraphQL", tag: ["all", "database"] },
  { icon: <WebpackSVG />, title: "Webpack", tag: ["all", "webDev"] },
  { icon: <DockerSVG />, title: "Docker", tag: ["all", "webDev"] },
  { icon: <MySQLSVG />, title: "MySQL", tag: ["all", "database"] },
  { icon: <GitSVG />, title: "Git", tag: ["all", "misc"] },
  { icon: <GitHubSVG />, title: "GitHub", tag: ["all", "misc"] },
  { icon: <BitBucketSVG />, title: "BitBucket", tag: ["all", "misc"] },
  { icon: <JIRASVG />, title: "JIRA", tag: ["all", "misc"] },
  { icon: <ConfluenceSVG />, title: "Confluence", tag: ["all", "misc"] },
];

const Skills = ({ language }) => {
  const [filter, setFilter] = useState("all");
  const [list, setList] = useState(skillList);

  const buttons = {
    EN: [
      { label: "All", value: "all" },
      { label: "Programming languages", value: "language" },
      { label: "Web / App Dev", value: "webDev" },
      { label: "Databases", value: "database" },
      { label: "Misc", value: "misc" },
    ],
    ES: [
      { label: "Toda", value: "all" },
      { label: "Lenguajes de programación", value: "language" },
      { label: "Desarrollo Web / App", value: "webDev" },
      { label: "Bases de datos", value: "database" },
      { label: "Varios", value: "misc" },
    ],
  };

  useEffect(() => {
    setList(skillList.filter((s) => s.tag.includes(filter)));
  }, [filter]);

  return (
    <Container id="skills">
      <Inner>
        <Title>{skillsText(language)}</Title>
        <Separator />
        <Subtitle>{skillsListText(language)}</Subtitle>
        <FilterRow>
          {buttons[language].map((btn) => (
            <FilterButton
              key={btn.value}
              $active={filter === btn.value}
              onClick={() => setFilter(btn.value)}
            >
              {btn.label}
            </FilterButton>
          ))}
        </FilterRow>
        <TagsGrid>
          {list.map((skill) => (
            <Tag key={skill.title}>
              <IconWrapper>{skill.icon}</IconWrapper>
              {skill.title}
            </Tag>
          ))}
        </TagsGrid>
        <CertRow>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.credly.com/badges/445bcb6b-31b2-4c23-8ca4-adf17e871e42"
          >
            <CertImage
              width="120px"
              height="120px"
              src={awscp}
              alt="AWS Certified Cloud Practitioner"
            />
          </a>
        </CertRow>
      </Inner>
    </Container>
  );
};

export default Skills;
