import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

import SlideInBottom from "../../animations/SlideInBottom";
import { featuredProjectsText, viewAllProjectsText } from "../../helpers/text";
import { projects } from "../../data/projects";
import Project from "../Project/Project";

const FEATURED_COUNT = 3;

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

const ViewAll = styled(NavLink)`
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
  margin-bottom: 3rem;
  border-radius: 2px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;

  @media only screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedProjects = ({ language }) => {
  const featured = projects.slice(0, FEATURED_COUNT);

  return (
    <Container id="projects">
      <Inner>
        <Header>
          <Title>{featuredProjectsText(language)}</Title>
          <ViewAll to="/projects">{viewAllProjectsText(language)} →</ViewAll>
        </Header>
        <Separator />
        <Grid>
          {featured.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              <Project
                name={p.name}
                description={p.description}
                image={p.image}
                github={p.github}
                link={p.link}
                tags={p.tags}
              />
            </motion.div>
          ))}
        </Grid>
      </Inner>
    </Container>
  );
};

export default FeaturedProjects;
