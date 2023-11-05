// Copyright 2023 Paion Data. All rights reserved.
import { PencilSquareIcon as PencilSquareIconSolid } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { selectGraphData } from "../../../nexusgraph-redux";

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
    width: 50px;
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
  font-size: 50px;
  font-weight: bold;
  color: #fff;
  display: inline-block;
  background-color: transparent;
  border: none;
  caret-color: #fff;
`;

export default function NoteTitleInput(): JSX.Element {
  const input = document.getElementById("noteTitleInput");
  const graphData = selectGraphData();
  const graphWidth = document.getElementById("graphBrowser")?.offsetWidth;

  const [inputWidth, setInputWidth] = useState(350);
  const [inputValue, setInputValue] = useState(graphData.name);

  const PencilSquareIcon = (): JSX.Element => <PencilSquareIconSolid />;

  useEffect(() => {
    setInputValue(graphData.name);
  }, [graphData.id]);

  return (
    <TitleWapper inputWidth={inputWidth}>
      <Input
        id="noteTitleInput"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
          if (input && graphWidth && input.offsetWidth <= graphWidth / 2) {
            setInputWidth(input.offsetWidth);
          }
        }}
      />

      <button
        className="pencilSquare"
        onClick={() => {
          if (input !== null) {
            input.focus();
          }
        }}
      >
        <PencilSquareIcon />
      </button>
    </TitleWapper>
  );
}
