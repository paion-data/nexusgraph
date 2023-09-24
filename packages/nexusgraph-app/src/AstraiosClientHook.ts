// Copyright 2023 Paion Data. All rights reserved.
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AstraiosClient } from "../../nexusgraph-astraios";
import {
  NoteState,
  selectNote,
  selectOAuth,
  updateNoteEditorContent,
  updateNoteGraph,
  updateNoteId,
  updateNoteTitle,
} from "../../nexusgraph-redux";
import { updateNoteList } from "../../nexusgraph-redux/src/note-list/noteListDuck";
import { container, TYPES } from "../inversify.config";

export default function useAstraiosClientHook() {
  const dispatch = useDispatch();
  const noteState: NoteState = selectNote();

  const accessToken = selectOAuth().accessToken;
  const userId = selectOAuth().userInfo["sub"];

  const astraiosClient: AstraiosClient = container.get<AstraiosClient>(TYPES.AstraiosClient);

  useEffect(() => {
    astraiosClient.getNoteList(userId).then((noteList) => {
      dispatch(updateNoteList(noteList));
      if (noteList[0]) {
        astraiosClient.getFirstNote(noteList[0].id).then((firstNote) => {
          dispatch(updateNoteTitle(firstNote.title));
          dispatch(updateNoteId(firstNote.id));
          dispatch(updateNoteEditorContent(JSON.parse(firstNote.editorContent)));
          dispatch(updateNoteGraph(JSON.parse(firstNote.graph)));
        });
      }
    });
  }, []);
}
