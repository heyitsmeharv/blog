import React from "react";
import styled from "styled-components";
import { Analytics } from "../../helpers/analytics";

const Wrapper = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: end;
  @media only screen and (max-width: 585px) {
    justify-content: center;
  }
`;

const LanguageButton = styled.button`
  border: none;
  font-size: 2.5rem;
  margin: 0 1rem;
  background: none;
  :hover {
    cursor: pointer;
  }
`;

const Language = ({ language, toggleLanguage }) => {
  const languages = [
    { name: "english", value: "EN", flag: "🇬🇧" },
    { name: "castellano", value: "ES", flag: "🇪🇸" },
  ];
  return (
    <Wrapper>
      {languages.map((lang) => {
        return (
          <LanguageButton
            key={lang.name}
            onClick={() => {
              toggleLanguage(lang.value);
              Analytics.track("language_changed", { language: lang.value });
            }}
          >
            {lang.flag}
          </LanguageButton>
        );
      })}
    </Wrapper>
  );
};

export default Language;
