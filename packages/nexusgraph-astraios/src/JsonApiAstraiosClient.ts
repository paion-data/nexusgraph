// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { NoteState } from "../../nexusgraph-redux";
import { AstraiosClient } from "./AstraiosClient";

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

  public saveOrUpdate(astraiosState: NoteState, token: string): Promise<NoteState> {
    return this.sendNoteRequest(astraiosState, token);
  }

  /**
   * Send a request to the Astraios server
   *
   * @param note The note data that should be contains graph data and editor content
   *
   * @returns A Promise of the WS response data
   */
  private async sendNoteRequest(note: NoteState, token: string): Promise<NoteState> {
    // const token = useSelector((state: GlobalState) => state.oAuth2.accessToken)
    const config = {
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: "Bearer " + token,
      },
    };

    const data = this.transformData(note);

    if (this.isInitialSave(note)) {
      return axios
        .post((process.env.ASTRAIOS_API_URL as string) + NOTE_STORAGE_API_URL_PARAMETER, { data }, config)
        .then((response) => {
          const noteState = {
            ...note,
            ...{ id: response.data.data.id },
          };
          return noteState;
        });
    }

    return axios.patch(
      (process.env.ASTRAIOS_API_URL as string) + NOTE_STORAGE_API_URL_PARAMETER + note.id,
      { data },
      config
    );
  }

  private isInitialSave(note: NoteState) {
    return note.id === undefined;
  }

  private transformData(note: NoteState) {
    let data;
    return (data = {
      type: "note",
      id: note.id,
      attributes: {
        graph: note.graph,
        editorContent: JSON.stringify(note.editorContent),
      },
    });
  }
}
