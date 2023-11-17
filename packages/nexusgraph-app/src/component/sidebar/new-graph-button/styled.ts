// Copyright 2023 Paion Data. All rights reserved.
import styled, { keyframes } from "styled-components";

export const StyledNewGraphButton = styled.button`
  position: relative;
  width: 40%;
  aspect-ratio: 1.618 / 1;
  border-radius: 1rem;
  border: none;
  margin: 5%;
  color: #f9bfd5;
  background: rgba(256, 256, 256, 0.6);
  cursor: pointer;
  word-wrap: break-word;
  font-size: 20px;
  & svg {
    height: 30%;
    stroke-width: 1px;
    stroke: #f9bfd5;
  }

  &:hover {
    border-style: solid;
    border-width: 3px;
    border-color: rgba(245, 95, 145, 0.45);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }

  to {
    
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;
