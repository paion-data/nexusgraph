// Copyright 2023 Paion Data. All rights reserved.
import { PencilSquareIcon as PencilSquareIconSolid } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState, updateNoteTitle } from "../../nexusgraph-redux";
import { Input, TitleWapper } from "./styled";

export default function NoteTitleInput(): JSX.Element {
  const [inputValue, setInputValue] = useState("");
  const note = useSelector((state: GlobalState) => state.note);
  const dispatch = useDispatch();

  const PencilSquareIcon = (): JSX.Element => <PencilSquareIconSolid />;

  useEffect(() => {
    setInputValue(note.title);
  }, [note.id]);

  return (
    <TitleWapper>
      <Input
        id="noteTitleInput"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
          dispatch(updateNoteTitle(event.target.value));
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
