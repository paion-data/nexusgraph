// Copyright 2023 Paion Data. All rights reserved.
import styled from "styled-components";

export const TitleWapper = styled.div<{
  inputWidth: number;
}>`
  position: relative;
  left: 5%;
  top: 5%;
  z-index: 10;
  height: 60px;
  background-color: #fff;
  display: inline-block;
  padding-left: 1%;

  background-color: transparent;

  & .pencilSquare {
    position: absolute;
    left: 415px;
    top: 0px;
    background: transparent;
    width: 35px;
    height: 50px;
    border: none;
    color: #fff;
  }

  & .pencilSquare:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
  }

  ${(props) =>
    `
    & input {
      width: ${props.inputWidth}px;
    }

    & .pencilSquare {
      position: absolute;
      left: ${props.inputWidth + 30}px;
      top: 0px;
    }
    `}

  & input:focus {
    border: none !important;
    outline: none;
  }
`;

export const Input = styled.input`
  height: 60px;
  white-space: pre;
  font-size: 35px;
  font-weight: bold;
  color: #fff;
  display: inline-block;
  background-color: transparent;
  border: none;
  caret-color: #fff;
`;
