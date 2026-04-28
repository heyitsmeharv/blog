import React from "react";
import styled from "styled-components";

import SlideInBottom from "../../animations/SlideInBottom";
import { experienceText, viewCvText } from "../../helpers/i18nText";

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

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
`;

const ViewCV = styled.a`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  opacity: 0.65;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const Separator = styled.div`
  width: 4rem;
  height: 3px;
  background: ${({ theme }) => theme.text};
  margin-bottom: 4rem;
  border-radius: 2px;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  border-left: 2px solid ${({ theme }) => theme.secondary}50;
  padding-left: 3.5rem;
  margin-left: 0.8rem;
`;

const TimelineItem = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: -4.25rem;
    top: 1rem;
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.text};
    border: 3px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.secondary};
  }
`;

const JobHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
`;

const JobMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const CompanyName = styled.h3`
  font-size: 2rem;
  font-weight: 700;
`;

const RoleTitle = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.mutedText || theme.secondary};
  font-weight: 600;
`;

const SubMeta = styled.span`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.mutedText || theme.secondary};
`;

const Period = styled.span`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.mutedText || theme.secondary};
  white-space: nowrap;
  padding-top: 0.4rem;
  font-weight: 500;
`;

const BulletList = styled.ul`
  margin-top: 1.6rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

const BulletItem = styled.li`
  font-size: 1.5rem;
  line-height: 1.7;
  padding-left: 1.8rem;
  position: relative;
  color: ${({ theme }) => theme.text};

  &::before {
    content: "-";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.mutedText || theme.secondary};
  }
`;

const ITEMS = {
  EN: [
    {
      company: "Davies Group",
      role: "AWS Cloud Engineer (Full-Time)",
      period: "Sep 2022 - Present",
      location: "Oxford, UK",
      bullets: [
        "Built, developed and supported different CI/CD solutions including GitHub Workflows, AWS CodePipeline and CodeDeploy.",
        "Architected and developed internal tools to automate application specific tasks using Terraform, AWS EventBridge and DynamoDB.",
        "Converted multiple applications and services from EC2 to ECS.",
        "Implemented application monitoring for applications through AWS CloudWatch, including RUM, Synthetics and X-Ray.",
        "Standardised content delivery processes with semantic versioning.",
      ],
    },
    {
      company: "ContactPartners",
      role: "Senior Development Manager (Full-Time)",
      period: "Jan 2021 - Sep 2022",
      location: "Oxford, UK",
      bullets: [
        "Led the development of multiple solutions such as an internal tool with chat functionality across Facebook Messenger, WhatsApp, SMS, email and phone, plus a client application for measuring team and organisation performance.",
        "Managed JIRA Service Desks, Kanban boards and ceremonies.",
        "Communicated and collaborated proactively with external and internal stakeholders.",
        "Supported the delivery of customer solutions from conception through implementation and beyond.",
        "Assisted with the design, creation and delivery of reports across products and services provided to clients.",
        "Gathered intelligence on client strategy and future plans to uncover sales opportunities.",
        "Collaborated with dozens of cross-functional clients across policy, content, design and QA.",
      ],
    },
  ],
  ES: [
    {
      company: "Davies Group",
      role: "Ingeniero Cloud de AWS (tiempo completo)",
      period: "Sep 2022 - Actualidad",
      location: "Oxford, Reino Unido",
      bullets: [
        "Disene, desarrolle y mantuve distintas soluciones de CI/CD con GitHub Workflows, AWS CodePipeline y CodeDeploy.",
        "Arquitete y desarrolle herramientas internas para automatizar tareas especificas de aplicaciones usando Terraform, AWS EventBridge y DynamoDB.",
        "Migre varias aplicaciones y servicios de EC2 a ECS.",
        "Implemente monitorizacion de aplicaciones con AWS CloudWatch, incluyendo RUM, Synthetics y X-Ray.",
        "Estandarice procesos de entrega de contenido mediante versionado semantico.",
      ],
    },
    {
      company: "ContactPartners",
      role: "Senior Development Manager (tiempo completo)",
      period: "Ene 2021 - Sep 2022",
      location: "Oxford, Reino Unido",
      bullets: [
        "Lidere el desarrollo de varias soluciones, como una herramienta interna con funcionalidad de chat para Facebook Messenger, WhatsApp, SMS, correo y telefono, ademas de una aplicacion para medir el rendimiento de equipos y organizaciones.",
        "Gestione Service Desks de JIRA, tableros Kanban y ceremonias de trabajo.",
        "Me comunique y colabore de forma proactiva con stakeholders internos y externos.",
        "Apoye la entrega de soluciones para clientes desde la concepcion hasta la implantacion y el soporte posterior.",
        "Colabore en el diseno, la creacion y la entrega de informes sobre productos y servicios para clientes.",
        "Obtuve informacion clave sobre la estrategia y los planes futuros de los clientes para detectar oportunidades comerciales.",
        "Trabaje con decenas de equipos multidisciplinares, incluyendo contenido, diseno y QA.",
      ],
    },
  ],
};

const AccessibleProfessionalExperience = ({ language }) => {
  const items = ITEMS[language] || ITEMS.EN;

  return (
    <Container id="experience">
      <Inner>
        <Header>
          <Title>{experienceText(language)}</Title>
          <ViewCV
            href="https://heyitsmeharv.s3.eu-west-2.amazonaws.com/AH_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            {viewCvText(language)}
            {" ->"}
          </ViewCV>
        </Header>
        <Separator />
        <Timeline>
          {items.map((item, index) => (
            <TimelineItem key={`${item.company}-${index}`}>
              <JobHeader>
                <JobMeta>
                  <CompanyName>{item.company}</CompanyName>
                  <RoleTitle>{item.role}</RoleTitle>
                  <SubMeta>{item.location}</SubMeta>
                </JobMeta>
                <Period>{item.period}</Period>
              </JobHeader>
              <BulletList>
                {item.bullets.map((bullet, bulletIndex) => (
                  <BulletItem key={`${item.company}-${bulletIndex}`}>
                    {bullet}
                  </BulletItem>
                ))}
              </BulletList>
            </TimelineItem>
          ))}
        </Timeline>
      </Inner>
    </Container>
  );
};

export default AccessibleProfessionalExperience;
