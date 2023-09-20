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

  const astraiosClient: AstraiosClient = container.get<AstraiosClient>(TYPES.AstraiosClient);

  useEffect(() => {
    if (noteState) {
      astraiosClient.getNoteList().then((response) => {
        // dispatch(updateNoteList(response));
        astraiosClient.getFirstNote(response[0].id).then((response) => {
          // dispatch(updateNoteId(response.id));
          // dispatch(updateNoteEditorContent(response.editorContent));
          // dispatch(updateNoteGraph(response.graph));
        });
      });
    }
  }, []);
}
