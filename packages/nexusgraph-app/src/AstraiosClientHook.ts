// Copyright 2023 Paion Data. All rights reserved.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AstraiosClient } from "../../nexusgraph-astraios";
import {
  GlobalState,
  NoteState,
  selectNote,
  updateNoteEditorContent,
  updateNoteGraph,
  updateNoteId,
} from "../../nexusgraph-redux";
import { updateNoteList } from "../../nexusgraph-redux/src/note-list/noteListDuck";
import { container, TYPES } from "../inversify.config";

export default function useAstraiosClientHook() {
  const dispatch = useDispatch();
  const noteState: NoteState = selectNote();

  const accessToken = useSelector((state: GlobalState) => state.oAuth.accessToken);
  const noteList = useSelector((state: GlobalState) => state.noteList.length);
  const userId = useSelector((state: GlobalState) => state.oAuth.userInfo["sub"]);

  const astraiosClient: AstraiosClient = container.get<AstraiosClient>(TYPES.AstraiosClient);

  useEffect(() => {
    if (noteState) {
      astraiosClient.getNoteList(userId).then((noteList) => {
        dispatch(updateNoteList(noteList));
        if (noteList[0]) {
          astraiosClient.getFirstNote(noteList[0].id).then((firstNote) => {
            dispatch(updateNoteId(firstNote.id));
            dispatch(updateNoteEditorContent(JSON.parse(firstNote.editorContent)));
            dispatch(updateNoteGraph(JSON.parse(firstNote.graph)));
          });
        }
      });
    }
  }, []);
}
