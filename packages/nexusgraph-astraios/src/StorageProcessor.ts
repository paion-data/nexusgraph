// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { useSelector } from "react-redux";
import { GlobalState } from "../../nexusgraph-provider";
import { AstraiosData, AstraiosStorageProcessor } from "./AstraiosStorageProcessor";
import { injectable } from "inversify";
import "reflect-metadata";

const NOTE_STORAGE_API_URL_PARAMETER = "note"

/**
 * An implementation of {@link AstraiosStorageProcessor}, It will send Http requests to the backend Astraios storage
 * service
 */
@injectable()
export class JsonApiStorageProcessor implements AstraiosStorageProcessor {
  storageProcessor(): Promise<AstraiosData> {
    return sendRequest({
      data: {
        type: "note",
        attributes: {
          graph: useSelector((state: GlobalState) => JSON.stringify(state.nlpData)),
          editorContent: useSelector((state: GlobalState) => JSON.stringify(state.editor)),
        },
      },
    });
  }
}

/**
 * Send a request to the Astraios server
 *
 * @param note The note data that should be contains graph data and editor content
 *
 * @returns A Promise of the WS response data
 */
const sendRequest = async (note: AstraiosData) => {
  const config = {
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
  };

  return await axios.post(process.env.ASTRAIOS_API_URL as string + NOTE_STORAGE_API_URL_PARAMETER, note, config);
};
