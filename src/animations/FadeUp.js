import { keyframes } from "styled-components";

const FadeUp = keyframes`
  from {
    -webkit-transform: translate3d(0, 1.5rem, 0);
    transform: translate3d(0, 1.5rem, 0);
    opacity: 0;
  }
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

export default FadeUp;
