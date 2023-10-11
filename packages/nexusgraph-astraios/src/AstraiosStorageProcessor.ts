// Copyright 2023 Paion Data. All rights reserved.
import { NoteState } from "../../nexusgraph-redux/src/note/noteTypes";

/**
 * This interface is used to define the data format for sending requests to the backend storage server Astraios
 */
export interface AstraiosClient {
  /**
   * Get and update note data and send a request to WS to store note
   */
  saveOrUpdate(astraiosState: NoteState): Promise<NoteState>;
}
