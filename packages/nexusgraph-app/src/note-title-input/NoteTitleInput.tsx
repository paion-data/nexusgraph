// Copyright 2023 Paion Data. All rights reserved.
import { PencilSquareIcon as PencilSquareIconSolid } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NoteState, selectNote, updateNoteTitle } from "../../../nexusgraph-redux";
import { NoteInfo, selectNoteList, updateNoteList } from "../../../nexusgraph-redux/src/note-list/noteListDuck";
import { Input, TitleWapper } from "./styled";

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
