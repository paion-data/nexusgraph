// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { NoteState } from "../../nexusgraph-redux";
import { NoteInfo } from "../../nexusgraph-redux/src/note-list/noteListDuck";
import { AstraiosClient } from "./AstraiosClient";

const NOTE_STORAGE_API_URL_PARAMETER = "note/";
const ASTRAIOS_JSON_API_ENDPOINT = process.env.ASTRAIOS_API_RESOURCE as string;

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

  public async getNoteList(): Promise<NoteInfo[]> {
    return [] as NoteInfo[];
  }

  public async getNoteById(): Promise<Record<any, string>> {
    return {} as Record<any, string>;
  }

  public async deleteNote(): Promise<Record<any, string>> {
    return {} as Record<any, string>;
  }

  /**
   * Send a request to the Astraios server
   *
   * @param note The note data that should be contains graph data and editor content
   *
   * @returns A Promise of the WS response data
   */
  private async sendNoteRequest(note: NoteState, token: string): Promise<NoteState> {
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
        .post(ASTRAIOS_JSON_API_ENDPOINT + NOTE_STORAGE_API_URL_PARAMETER, { data }, config)
        .then((response) => {
          const noteState = {
            ...note,
            ...{ id: response.data.data.id },
          };
          return noteState;
        });
    }

    return axios.patch(ASTRAIOS_JSON_API_ENDPOINT + NOTE_STORAGE_API_URL_PARAMETER + note.id, { data }, config);
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
        graph: JSON.stringify(note.graph),
        editorContent: JSON.stringify(note.editorContent),
      },
    });
  }
}
