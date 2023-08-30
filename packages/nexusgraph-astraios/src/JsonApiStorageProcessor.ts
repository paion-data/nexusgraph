// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { injectable } from "inversify";
import { useDispatch } from "react-redux";
import "reflect-metadata";
import { NoteState, UPDATE_NOTE_ID } from "../../nexusgraph-redux";
import { AstraiosClient } from "./AstraiosStorageProcessor";

const NOTE_STORAGE_API_URL_PARAMETER = "note/";

/**
 * An implementation of {@link AstraiosClient}, It will send Http requests to the backend Astraios storage
 * service
 */
@injectable()
export class JsonApiAstraiosClient implements AstraiosClient {
  updateNote: boolean;

  constructor() {
    this.updateNote = false;
  }

  saveOrUpdate(astraiosState: NoteState): Promise<NoteState | undefined> {
    return this.sendNoteRequest(astraiosState);
  }

  /**
   * Send a request to the Astraios server
   *
   * @param note The note data that should be contains graph data and editor content
   *
   * @returns A Promise of the WS response data
   */
  private async sendNoteRequest(note: NoteState) {
    const dispatch = useDispatch();

    const config = {
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
    };

    if (note.data.id === "") {
      const noteRequest = axios.post(
        (process.env.ASTRAIOS_API_URL as string) + NOTE_STORAGE_API_URL_PARAMETER,
        note,
        config
      );
      noteRequest.then((response) => {
        dispatch({ type: UPDATE_NOTE_ID, payload: response.data.data.id });
      });

      return await noteRequest;
    }

    if (!this.updateNote) {
      this.updateNote = true;
    } else {
      const noteId = note.data.id;
      const noteUpdate = axios.patch(
        (process.env.ASTRAIOS_API_URL as string) + NOTE_STORAGE_API_URL_PARAMETER + noteId,
        note,
        config
      );

      return await noteUpdate;
    }
  }
}
