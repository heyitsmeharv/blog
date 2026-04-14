import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { StyledNavLink } from "../Button/Button";

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${({ theme }) => theme.primary};
  border-bottom: 1px solid ${({ theme }) => theme.secondary}50;
`;

const NavInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 4vw, 4rem);
  height: 6.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 585px) {
    height: 5.5rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const NavControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const AnchorLink = styled.a`
  font-family: "Raleway", sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.secondary}25;
  }
`;

const RouterLink = styled(StyledNavLink)`
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.secondary}25;
  }

  &.active {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

const Divider = styled.span`
  width: 1px;
  height: 2rem;
  background: ${({ theme }) => theme.secondary};
  opacity: 0.5;
  margin: 0 0.2rem;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ThemeDot = styled.button`
  border: 1.5px solid ${(props) => props.$border};
  border-radius: 50%;
  width: 1.6rem;
  height: 1.6rem;
  background: ${(props) => props.$colour};
  cursor: pointer;
  transition: transform 0.15s;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.25);
  }
`;

const LangButton = styled.button`
  border: none;
  font-size: 1.8rem;
  background: none;
  cursor: pointer;
  padding: 0.2rem;
  opacity: 0.65;
  transition: opacity 0.15s;
  line-height: 1;

  &:hover {
    opacity: 1;
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const HamburgerBtn = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.6rem;

  @media only screen and (max-width: 768px) {
    display: flex;
  }
`;

const HamLine = styled.span`
  display: block;
  width: 22px;
  height: 2px;
  background: ${({ theme }) => theme.text};
  border-radius: 2px;
  transition:
    transform 0.2s,
    opacity 0.2s;

  &:nth-child(1) {
    transform: ${({ $open }) =>
      $open ? "translateY(7px) rotate(45deg)" : "none"};
  }
  &:nth-child(2) {
    opacity: ${({ $open }) => ($open ? 0 : 1)};
  }
  &:nth-child(3) {
    transform: ${({ $open }) =>
      $open ? "translateY(-7px) rotate(-45deg)" : "none"};
  }
`;

const MobileMenu = styled.div`
  display: ${({ $open }) => ($open ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.primary};
  border-bottom: 1px solid ${({ theme }) => theme.secondary}50;
  padding: 0.8rem clamp(1.5rem, 4vw, 4rem) 1.4rem;
  gap: 0.2rem;
  z-index: 99;

  @media only screen and (min-width: 769px) {
    display: none;
  }
`;

const MobileLangRow = styled.div`
  display: flex;
  gap: 0.4rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.secondary}30;

  button {
    display: flex;
  }
`;

const THEMES = [
  { name: "light", colour: "#fff", border: "#999" },
  { name: "dark", colour: "#1b1c22", border: "#555" },
  { name: "blue", colour: "#118ab2", border: "#053546" },
  { name: "red", colour: "#6a040f", border: "#240104" },
  { name: "green", colour: "#84994F", border: "#273506" },
];

const Navbar = ({ toggleTheme, toggleLanguage }) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  const desktopLinks = isHome ? (
    <>
      <AnchorLink href="#home">Home</AnchorLink>
      <AnchorLink href="#about">About</AnchorLink>
      <AnchorLink href="#experience">Experience</AnchorLink>
      <AnchorLink href="#blog">Blog</AnchorLink>
      <AnchorLink href="#projects">Projects</AnchorLink>
      <AnchorLink href="#skills">Skills</AnchorLink>
    </>
  ) : (
    <>
      <RouterLink exact to="/">
        Home
      </RouterLink>
      <RouterLink exact to="/blog">
        Blog
      </RouterLink>
      <RouterLink exact to="/projects">
        Projects
      </RouterLink>
    </>
  );

  const mobileLinks = isHome ? (
    <>
      <AnchorLink href="#home" onClick={closeMenu}>
        Home
      </AnchorLink>
      <AnchorLink href="#about" onClick={closeMenu}>
        About
      </AnchorLink>
      <AnchorLink href="#experience" onClick={closeMenu}>
        Experience
      </AnchorLink>
      <AnchorLink href="#blog" onClick={closeMenu}>
        Blog
      </AnchorLink>
      <AnchorLink href="#projects" onClick={closeMenu}>
        Projects
      </AnchorLink>
      <AnchorLink href="#skills" onClick={closeMenu}>
        Skills
      </AnchorLink>
      <AnchorLink href="#github" onClick={closeMenu}>
        GitHub
      </AnchorLink>
    </>
  ) : (
    <>
      <RouterLink exact to="/">
        Home
      </RouterLink>
      <RouterLink exact to="/blog">
        Blog
      </RouterLink>
      <RouterLink exact to="/projects">
        Projects
      </RouterLink>
    </>
  );

  return (
    <Nav>
      <NavInner>
        <NavLinks>{desktopLinks}</NavLinks>
        <NavControls>
          <LangButton onClick={() => toggleLanguage("EN")} title="English">
            🇬🇧
          </LangButton>
          <LangButton onClick={() => toggleLanguage("ES")} title="Español">
            🇪🇸
          </LangButton>
          <Divider />
          {THEMES.map((t) => (
            <ThemeDot
              key={t.name}
              $colour={t.colour}
              $border={t.border}
              onClick={() => toggleTheme(t.name)}
              title={t.name}
            />
          ))}
        </NavControls>
        <HamburgerBtn
          onClick={() => setIsMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <HamLine $open={isMenuOpen} />
          <HamLine $open={isMenuOpen} />
          <HamLine $open={isMenuOpen} />
        </HamburgerBtn>
      </NavInner>
      <MobileMenu $open={isMenuOpen}>
        {mobileLinks}
        <MobileLangRow>
          <LangButton
            onClick={() => {
              toggleLanguage("EN");
              closeMenu();
            }}
            title="English"
          >
            🇬🇧
          </LangButton>
          <LangButton
            onClick={() => {
              toggleLanguage("ES");
              closeMenu();
            }}
            title="Español"
          >
            🇪🇸
          </LangButton>
        </MobileLangRow>
      </MobileMenu>
    </Nav>
  );
};

export default Navbar;
