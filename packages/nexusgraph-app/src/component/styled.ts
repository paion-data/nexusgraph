// Copyright 2023 Paion Data. All rights reserved.
import { animated } from "react-spring";
import styled from "styled-components";

export const AlertContent = styled.p`
  margin: 0;
  font-size: 14px;
`;

export const AlertFooter = styled.footer`
  display: flex;
  align-items: center;
  padding-top: 0.5rem;
  flex-direction: row-reverse;
`;

export const AlertCloseButton = styled.button`
  outline: none;
  border: none;
  background-color: rgba(256, 256, 256, 0.5);
  padding: 0.3rem 0.75rem;
  border-radius: 4px;
  font-size: 0.7rem;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1), -2px -2px 8px rgba(255, 255, 255, 0.883);
  transition: box-shadow 0.15s linear;
  border-style: solid;
  border-width: 2px;
  border-color: rgba(245, 95, 145, 0.45);
  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1) inset, -2px -2px 8px rgba(245, 95, 145, 0.45) inset;
  }
`;

export const StyledAlert = styled(animated.div)`
  background: rgba(256, 256, 256, 0.5);
  padding: 1rem;
  min-width: 15rem;
  border-radius: 8px;
  font-size: 0.8rem;
  position: fixed;
  bottom: 10vh;
  right: 5vw;
  max-width: 25rem;
  border: 1px solid rgba(255, 255, 255, 0.472);
`;

export const StyledDeleteButton = styled.button`
  border: none;
  background-color: transparent;

  & svg {
    position: relative;
    left: 1vw;
    top: 2vh;
    height: 3vh;
    color: #fff;
    display: inline-block;
    padding-left: 1%;
    background: transparent;
    background-color: transparent;
    z-index: 999;
  }

  & svg:hover {
    cursor: pointer;
    color: gray;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
  }
`;

export const StyledInput = styled.input`
  font-size: 3vw;
  font-weight: bold;
  color: #fff;
  background-color: transparent;
  border: none;
`;
