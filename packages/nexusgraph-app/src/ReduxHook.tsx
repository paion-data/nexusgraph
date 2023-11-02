// Copyright 2023 Paion Data. All rights reserved.
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AstraiosClient } from "../../nexusgraph-astraios";
import { NaturalLanguageProcessor } from "../../nexusgraph-theresa";
import { NoteState, selectNote, selectOAuth } from "../../nexusgraph-redux";
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

  useEffect(() => {
    const update = () => {
      if (noteState) {
        // astraiosClient.saveOrUpdate(noteState, accessToken, userId).then((response) => {
        //   dispatch(updateNoteId(response.id));
        // });
      }
    };

    const t = setInterval(update, Number(String(process.env.ENTITY_EXTRACTION_CALL_DELAY_IN_MS)));

    return () => clearInterval(t);
  }, [noteState]);

  // useEffect(() => {
  //   astraiosClient.getNoteList(userId, accessToken).then((noteList) => {
  //     dispatch(updateNoteList(noteList));
  //   });
  // }, [noteState.id, noteState.title]);
}
