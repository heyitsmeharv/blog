import React from "react";

// components
import { SocialMediaButton } from "../SocialMediaButtons/SocialMediaButtons";
import { Analytics } from "../../helpers/analytics";

// icons
import {
  StyledFacebookCircle,
  StyledLinkedinSquare,
  StyledTwitter,
  StyledGithub,
} from "../../resources/styles/icons";

const socialMediaButtons = [
  {
    icon: <StyledLinkedinSquare />,
    link: "https://www.linkedin.com/in/heyitsmeharv/",
    animation: "LinkedIn",
    platform: "linkedin",
  },
  {
    icon: <StyledGithub />,
    link: "https://github.com/heyitsmeharv",
    animation: "Github",
    platform: "github",
  },
];

const SocialMedia = () => {
  return (
    <>
      {socialMediaButtons.map((button, key) => {
        return (
          <SocialMediaButton
            animation={button.animation}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={key}
          >
            <a
              target="_blank"
              href={button.link}
              onClick={() =>
                Analytics.track("social_link_clicked", {
                  platform: button.platform,
                })
              }
            >
              {button.icon}
            </a>
          </SocialMediaButton>
        );
      })}
    </>
  );
};

export default SocialMedia;
