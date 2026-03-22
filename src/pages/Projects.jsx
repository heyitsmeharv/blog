import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "motion/react";

// helpers
import { Analytics } from "../helpers/analytics";

// data
import { projects } from "../data/projects";
import { tagColors } from "../data/tagColors";

// components
import Project from "../components/Project/Project";

// animations
import SlideInBottom from "../animations/SlideInBottom";

const Container = styled.div`
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.primary};
  animation: ${SlideInBottom} 0.5s forwards;
`;

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 3.2rem;
`;

const FilterButton = styled.button`
  padding: 0.6rem 1.6rem;
  border-radius: 999px;
  border: 2px solid ${({ $color, theme }) => $color || theme.buttonColour};
  background: ${({ $active, $color, theme }) =>
    $active ? $color || theme.buttonColour : "transparent"};
  color: ${({ $active, $textColor, theme }) =>
    $active ? $textColor || theme.buttonText : theme.text};
  font-size: 1.3rem;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    background: ${({ $color, theme }) => $color || theme.buttonColour};
    color: ${({ $textColor, theme }) => $textColor || theme.buttonText};
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;
  max-width: 60%;
  margin: 0 auto;

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 585px) {
    grid-template-columns: 1fr;
  }
`;

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    Analytics.event("projects", { slug: "projects-selection" });
  }, []);

  const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags))];

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <Container>
      <FilterBar>
        {allTags.map((tag) => (
          <FilterButton
            key={tag}
            $active={activeFilter === tag}
            $color={tagColors[tag]?.bg}
            $textColor={tagColors[tag]?.text}
            onClick={() => setActiveFilter(tag)}
          >
            {tag}
          </FilterButton>
        ))}
      </FilterBar>
      <AnimatePresence mode="wait">
        <Grid
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filtered.map((p) => (
            <motion.div key={p.name} variants={itemVariants}>
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
      </AnimatePresence>
    </Container>
  );
}
