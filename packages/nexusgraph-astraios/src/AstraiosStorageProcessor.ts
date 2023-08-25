// Copyright 2023 Paion Data. All rights reserved.

/**
 * This interface is used to define the data format for sending requests to the backend storage server Astraios
 */
export interface AstraiosData {
  data: {
    type: "note";
    attributes: {
      editorContent: string;
      graph: string;
    };
  };
}

export interface AstraiosStorageProcessor {
  /**
   * Get and update note data and send a request to WS to store note
   */
  storageProcessor(): Promise<AstraiosData>;
}
