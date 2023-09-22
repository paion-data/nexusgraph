// Copyright 2023 Paion Data. All rights reserved.
import styled from "styled-components";

export const TitleWapper = styled.div`
  position: relative;
  left: 5%;
  top: 2%;
  width: 89%;
  height: 60px;
  background-color: #fff;
  display: inline-block;
  padding-left: 1%;

  background-color: transparent;
  border-radius: 1rem;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(108, 216, 248, 0.3);
  box-shadow: inset 8px 5px 20px rgba(137, 225, 252, 0.6);

  & .pencilSquare {
    position: absolute;
    right: 10px;
    top: 5px;
    background: transparent;
    width: 40px;
    height: 50px;
    border: none;
    color: #fff;
  }

  & .pencilSquare:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
  }

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
  text-shadow: 1px 1px 2px #237295, 0 0 1em #34c7f4, 0 0 0.2em #34c7f4;
  display: inline-block;
  background-color: transparent;
  border: none;
  caret-color: #fff;
`;
