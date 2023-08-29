// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AstraiosState, GlobalState, UPDATE_NOTE_ID } from "../../nexusgraph-provider";
import { AstraiosStorageProcessor } from "./AstraiosStorageProcessor";
import { injectable } from "inversify";
import "reflect-metadata";

const NOTE_STORAGE_API_URL_PARAMETER = "note/";

/**
 * An implementation of {@link AstraiosStorageProcessor}, It will send Http requests to the backend Astraios storage
 * service
 */
@injectable()
export class JsonApiStorageProcessor implements AstraiosStorageProcessor {
  updateNote: boolean;

  constructor() {
    this.updateNote = false;
  }

  storageProcessor(): Promise<AstraiosState | undefined> {
    return this.sendNoteRequest(useSelector((state: GlobalState) => state.astraios));
  }

  /**
   * Send a request to the Astraios server
   *
   * @param note The note data that should be contains graph data and editor content
   *
   * @returns A Promise of the WS response data
   */
  private async sendNoteRequest(note: AstraiosState) {
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
