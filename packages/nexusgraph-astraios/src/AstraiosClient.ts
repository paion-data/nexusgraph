// Copyright 2023 Paion Data. All rights reserved.
import { NoteState } from "../../nexusgraph-redux";
import { NoteInfo } from "../../nexusgraph-redux/src/note-list/noteListDuck";

/**
 * This interface is used to define the data format for sending requests to the backend storage server Astraios
 */
export interface AstraiosClient {
  /**
   * Get and update note data and send a request to WS to store note
   */
  saveOrUpdate(astraiosState: NoteState, token: string, userId: string): Promise<NoteState>;
  getNoteList(userId: string, token: string): Promise<NoteInfo[]>;
  getNoteById(noteId: string, token: string): Promise<Record<any, string>>;
  deleteNote(noteId: string, token: string): Promise<Record<any, string>>;
}
