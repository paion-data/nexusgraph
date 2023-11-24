// Copyright 2023 Paion Data. All rights reserved.
import styled from "styled-components";

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
