// Copyright 2023 Paion Data. All rights reserved.
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AstraiosClient } from "../../nexusgraph-astraios";
import { NaturalLanguageProcessor } from "../../nexusgraph-nlp";
import {
  NoteState,
  selectIntelligentAI,
  selectNote,
  selectOAuth,
  updateNlpData,
  updateNoteId,
} from "../../nexusgraph-redux";
import { updateNoteList } from "../../nexusgraph-redux/src/note-list/noteListDuck";
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

  const intelligentAIState: string | null = selectIntelligentAI();

  useEffect(() => {
    const update = () => {
      if (noteState) {
        astraiosClient.saveOrUpdate(noteState, accessToken, userId).then((response) => {
          dispatch(updateNoteId(response.id));
        });
      }
    };

    const t = setInterval(update, Number(String(process.env.ENTITY_EXTRACTION_CALL_DELAY_IN_MS)));

    return () => clearInterval(t);
  }, [noteState]);

  useEffect(() => {
    if (intelligentAIState) {
      remoteNaturalLanguageProcessor.entityExtraction(intelligentAIState).then((NlpState) => {
        dispatch(updateNlpData(NlpState));
      });
    } else {
      dispatch(
        updateNlpData({
          nodes: [],
          links: [],
        })
      );
    }
  }, [intelligentAIState]);

  useEffect(() => {
    astraiosClient.getNoteList(userId, accessToken).then((noteList) => {
      dispatch(updateNoteList(noteList));
    });
  }, [noteState.id, noteState.title]);
}
