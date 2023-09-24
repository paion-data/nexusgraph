// Copyright 2023 Paion Data. All rights reserved.
import { PencilSquareIcon as PencilSquareIconSolid } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectNote, updateNoteTitle } from "../../../nexusgraph-redux";
import { selectNoteList, updateNoteList } from "../../../nexusgraph-redux/src/note-list/noteListDuck";
import { Input, TitleWapper } from "./styled";

export default function NoteTitleInput(): JSX.Element {
  const [inputValue, setInputValue] = useState("");

  const currentNote = selectNote();
  const noteList = selectNoteList();

  const newList = noteList.map((note) => {
    if (note.id == currentNote.id) {
      note.title = currentNote.title;
    }
    return note;
  });

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
    <TitleWapper>
      <Input
        id="noteTitleInput"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />

      <button
        className="pencilSquare"
        onClick={() => {
          const input = document.getElementById("noteTitleInput");

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
