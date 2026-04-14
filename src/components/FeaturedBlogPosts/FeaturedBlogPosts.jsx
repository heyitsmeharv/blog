import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

import SlideInBottom from "../../animations/SlideInBottom";
import { latestPostsText, viewAllPostsText } from "../../helpers/text";
import { posts } from "../../data/posts";

const FEATURED_COUNT = 3;

const TYPE_COLORS = {
  Practical: { bg: "#dbeafe", text: "#1e40af" },
  Study: { bg: "#fef3c7", text: "#92400e" },
  Theory: { bg: "#ede9fe", text: "#5b21b6" },
};

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

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.secondary}50;
  border-radius: 12px;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  height: 100%;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.secondary};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const TypeBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 1rem;
  border-radius: 999px;
  font-size: 1.2rem;
  font-weight: 700;
  background: ${({ $bg }) => $bg || "#e5e7eb"};
  color: ${({ $color }) => $color || "#374151"};
`;

const DateText = styled.span`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.secondary};
`;

const PostTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.35;
  color: ${({ theme }) => theme.text};
  flex: 1;
`;

const ReadingTime = styled.span`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.secondary};
  font-style: italic;
`;

const Intro = styled.p`
  font-size: 1.4rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.text};
  opacity: 0.75;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;
`;

const TagPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 1rem;
  border-radius: 999px;
  font-size: 1.2rem;
  font-weight: 600;
  background: ${({ $bg }) => $bg || "#e5e7eb"};
  color: #1a1a1a;

  svg {
    width: 14px !important;
    height: 14px !important;
    flex-shrink: 0;
  }
`;

const ReadMore = styled(NavLink)`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  margin-top: auto;
  opacity: 0.7;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const FeaturedBlogPosts = ({ language }) => {
  const featured = posts.filter((p) => p.published).slice(0, FEATURED_COUNT);

  return (
    <Container id="blog">
      <Inner>
        <Header>
          <Title>{latestPostsText(language)}</Title>
          <ViewAll to="/blog">{viewAllPostsText(language)} →</ViewAll>
        </Header>
        <Separator />
        <Grid>
          {featured.map((post, i) => {
            const typeStyle = TYPE_COLORS[post.type] || {};
            return (
              <motion.div
                key={post.navigate}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                style={{ display: "flex" }}
              >
                <Card>
                  <CardTop>
                    <TypeBadge $bg={typeStyle.bg} $color={typeStyle.text}>
                      {post.type}
                    </TypeBadge>
                    <DateText>{post.date}</DateText>
                  </CardTop>
                  <PostTitle>{post.title}</PostTitle>
                  <ReadingTime>{post.readingTime}</ReadingTime>
                  {post.tags?.length > 0 && (
                    <TagsRow>
                      {post.tags.map((tag) => (
                        <TagPill key={tag.name} $bg={tag.background}>
                          {tag.icon}
                          {tag.name}
                        </TagPill>
                      ))}
                    </TagsRow>
                  )}
                  <Intro>{post.intro}</Intro>
                  <ReadMore to={`/blog/${post.navigate}`}>Read post →</ReadMore>
                </Card>
              </motion.div>
            );
          })}
        </Grid>
      </Inner>
    </Container>
  );
};

export default FeaturedBlogPosts;
