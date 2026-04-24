import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import { Github } from "@styled-icons/boxicons-logos/Github";
import { LinkedinSquare } from "@styled-icons/boxicons-logos/LinkedinSquare";

import SlideInBottom from "../../animations/SlideInBottom";
import ProfileImg from "../../resources/images/Profile.jpg";
import { Analytics } from "../../helpers/analytics";
import { contactMe, curriculumVitaeButtonText } from "../../helpers/text";
import { ContactMeButton, DownloadCVButton } from "../Button/Button";

const HeroSection = styled.section`
  width: 100%;
  padding: 7rem 0;
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
  display: flex;
  align-items: center;
  gap: 5rem;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 3rem;
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
`;

const ProfileImageFrame = styled.div`
  position: relative;
  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  background: ${({ theme }) => theme.surface || theme.secondary};

  @media only screen and (max-width: 768px) {
    width: 16rem;
    height: 16rem;
  }
`;

const ProfileImageLoader = styled.div`
  position: absolute;
  inset: 0;
  display: ${({ $loaded }) => ($loaded ? "none" : "block")};
  background: ${({ theme }) => theme.surface || theme.secondary};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.28),
      transparent
    );
    animation: ${shimmer} 1.2s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 50%;
    width: 3.6rem;
    height: 3.6rem;
    margin: -1.8rem 0 0 -1.8rem;
    border: 3px solid rgba(255, 255, 255, 0.38);
    border-top-color: ${({ theme }) => theme.text};
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ProfileImage = styled.img`
  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  object-fit: cover;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.25s ease;

  @media only screen and (max-width: 768px) {
    width: 16rem;
    height: 16rem;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5);
  }
  50% {
    box-shadow: 0 0 0 16px rgba(16, 185, 129, 0);
  }
`;

const OpenToWorkBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #d1fae5;
  color: #065f46;
  border-radius: 999px;
  padding: 0.5rem 1.4rem;
  font-size: 1.3rem;
  font-weight: 700;
  width: fit-content;
  letter-spacing: 0.2px;
  animation: ${pulse} 2s ease-in-out infinite;

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    background: #10b981;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }

  @media only screen and (max-width: 768px) {
    align-self: center;
  }
`;

const Name = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -1px;

  @media only screen and (max-width: 768px) {
    font-size: 3.6rem;
  }

  @media only screen and (max-width: 400px) {
    font-size: 3rem;
  }
`;

const RoleTitle = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.secondary};
`;

const Location = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.secondary};
`;

const Tagline = styled.p`
  font-size: 1.5rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.secondary};
  max-width: 54ch;

  @media only screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  transition:
    background 0.2s,
    color 0.2s,
    border-color 0.2s;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.text};
  }
`;

const GithubIcon = styled(Github)`
  width: 2rem;
  height: 2rem;
`;

const LinkedInIcon = styled(LinkedinSquare)`
  width: 2rem;
  height: 2rem;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 0.5rem;

  @media only screen and (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const HeroContactButton = styled(ContactMeButton)`
  margin-top: 0;
  margin-right: 0;
  height: 5rem;
  border-radius: 4px;
  padding: 0 2.4rem;
`;

const HeroCVButton = styled(DownloadCVButton)`
  margin-top: 0;
  height: 5rem;
  border-radius: 4px;
`;

const Introduction = ({ language, open, setOpen }) => {
  const [profileLoaded, setProfileLoaded] = useState(false);

  return (
    <HeroSection id="home">
      <Inner>
        <ProfileImageFrame aria-busy={!profileLoaded}>
          <ProfileImageLoader $loaded={profileLoaded} aria-hidden="true" />
          <ProfileImage
            src={ProfileImg}
            alt="Adam Harvey"
            $loaded={profileLoaded}
            onLoad={() => setProfileLoaded(true)}
            onError={() => setProfileLoaded(true)}
            decoding="async"
            fetchPriority="high"
          />
        </ProfileImageFrame>
        <InfoWrapper>
          <OpenToWorkBadge>Open to work</OpenToWorkBadge>
          <Name>Adam Harvey</Name>
          <RoleTitle>Software Engineer</RoleTitle>
          <Location>📍 Oxford, England</Location>
          {/* <Tagline>
            7 years of delivering commercialised web applications built in React.js.
            AWS-certified platform engineer with 3+ years of experience building DevOps
            and cloud-native solutions using AWS, Terraform, and CI/CD tools. Proven track
            record in leading development teams, modernising infrastructure, and delivering
            scalable internal tools across diverse industries.
          </Tagline> */}
          <SocialRow>
            <SocialIconLink
              href="https://github.com/heyitsmeharv"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <GithubIcon />
            </SocialIconLink>
            <SocialIconLink
              href="https://www.linkedin.com/in/heyitsmeharv/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <LinkedInIcon />
            </SocialIconLink>
          </SocialRow>
          <ActionRow>
            <HeroContactButton
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setOpen(!open)}
            >
              {contactMe(language)}
            </HeroContactButton>
            {/* <HeroCVButton
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://heyitsmeharv.s3.eu-west-2.amazonaws.com/AH_CV.pdf"
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() =>
                  Analytics.event("file_download", {
                    link_url:
                      "https://heyitsmeharv.s3.eu-west-2.amazonaws.com/AH_CV.pdf",
                    file_name: "AH_CV.pdf",
                    file_extension: "pdf",
                    link_label: "Curriculum Vitae",
                  })
                }
              >
                {curriculumVitaeButtonText(language)}
              </a>
            </HeroCVButton> */}
          </ActionRow>
        </InfoWrapper>
      </Inner>
    </HeroSection>
  );
};

export default Introduction;
