// Copyright 2023 Paion Data. All rights reserved.
import { animated } from "react-spring";
import styled from "styled-components";

export const StyledAlert = styled(animated.div)<{
  x: number;
  y: number;
}>`
  z-index: 100;
  background: rgba(256, 256, 256, 0.5);
  padding: 1rem;
  min-width: 15rem;
  border-radius: 8px;
  font-size: 0.8rem;
  position: fixed;
  // bottom: 10vh;
  // right: 5vw;
  ${(props) =>
    `
    bottom: ${props.y};
    right: ${props.x};
    `}
  max-width: 25rem;
  border: 1px solid rgba(255, 255, 255, 0.472);
`;
