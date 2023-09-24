// Copyright 2023 Paion Data. All rights reserved.
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AstraiosClient } from "../../nexusgraph-astraios";
import { NaturalLanguageProcessor } from "../../nexusgraph-nlp";
import {
  initialEditorContent,
  NoteState,
  selectNote,
  selectOAuth,
  updateNlpData,
  updateNoteId,
} from "../../nexusgraph-redux";
import { selectNoteList, updateNoteList } from "../../nexusgraph-redux/src/note-list/noteListDuck";
import { container, TYPES } from "../inversify.config";

export default function useReduxHook() {
  const dispatch = useDispatch();
  const noteState: NoteState = selectNote();
  const astraiosClient: AstraiosClient = container.get<AstraiosClient>(TYPES.AstraiosClient);
  const remoteNaturalLanguageProcessor: NaturalLanguageProcessor = container.get<NaturalLanguageProcessor>(
    TYPES.NaturalLanguageProcessor
  );
  const accessToken = selectOAuth().accessToken;
  const userId = selectOAuth().userInfo["sub"];
  const noteList = selectNoteList();

  useEffect(() => {
    const update = () => {
      if (noteState) {
        astraiosClient.saveOrUpdate(noteState, accessToken, userId).then((response) => {
          dispatch(updateNoteId(response.id));
        });

        if (noteState && noteState.editorContent != initialEditorContent) {
          remoteNaturalLanguageProcessor.entityExtraction(noteState.editorContent).then((NlpState) => {
            dispatch(updateNlpData(NlpState));
          });
        }
      }
    };

    const t = setInterval(update, Number(String(process.env.ENTITY_EXTRACTION_CALL_DELAY_IN_MS)));

    return () => clearInterval(t);
  }, [noteState, accessToken]);

  useEffect(() => {
    astraiosClient.getNoteList(userId).then((noteList) => {
      dispatch(updateNoteList(noteList));
    });
  }, [noteState.id, noteState.title]);
}
