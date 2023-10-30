// Copyright 2023 Paion Data. All rights reserved.
import { PencilSquareIcon as PencilSquareIconSolid } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { NoteState, selectNote, updateNoteTitle } from "../../../nexusgraph-redux";
import { NoteInfo, selectNoteList, updateNoteList } from "../../../nexusgraph-redux/src/note-list/noteListDuck";

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
  const currentNote = selectNote();
  const graphWidth = document.getElementById("graphBrowser")?.offsetWidth;

  const [inputWidth, setInputWidth] = useState(350);
  const [inputValue, setInputValue] = useState(currentNote.title);

  const noteList = selectNoteList();

  const newList = getNewList(currentNote, noteList);

  const dispatch = useDispatch();

  const PencilSquareIcon = (): JSX.Element => <PencilSquareIconSolid />;

  useEffect(() => {
    setInputValue(currentNote.title);
  }, [currentNote.id]);

  useEffect(() => {
    dispatch(updateNoteTitle(inputValue));
    dispatch(updateNoteList(newList));
  }, [inputValue]);

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

function getNewList(currentNote: NoteState, noteList: NoteInfo[]) {
  const newList = noteList.map((note) => {
    if (note.id == currentNote.id) {
      note.title = currentNote.title;
    }
    return note;
  });
  return newList;
}
