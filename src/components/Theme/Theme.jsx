import React from "react";
import styled from "styled-components";
import { Analytics } from "../../helpers/analytics";

const Wrapper = styled.div`
  padding: 2rem;
  @media only screen and (max-width: 375px) {
    padding: 2rem 1rem;
  }
`;

const ThemeButton = styled.button`
  border: 2px solid ${(props) => props.border};
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  background: ${(props) => props.colour};
  margin: 0 0.5rem;
  :hover {
    cursor: pointer;
  }
`;

const Theme = ({ theme, toggleTheme }) => {
  const themes = [
    { name: "light", colour: "#fff", border: "#000" },
    { name: "dark", colour: "#000", border: "#fff" },
    { name: "blue", colour: "#219ebc", border: "#fff" },
    { name: "red", colour: "#780000", border: "#fff" },
    { name: "green", colour: "#84994F", border: "#fff" },
  ];
  return (
    <Wrapper>
      {themes.map((t, i) => {
        return (
          <ThemeButton
            key={i}
            onClick={() => {
              toggleTheme(t.name);
              Analytics.track("theme_changed", { theme: t.name });
            }}
            border={t.border}
            colour={t.colour}
          />
        );
      })}
    </Wrapper>
  );
};

export default Theme;
