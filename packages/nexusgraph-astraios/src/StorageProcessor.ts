// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { useSelector } from "react-redux";
import { GlobalState } from "../../nexusgraph-provider";
import { AstraiosData, AstraiosStorageProcessor } from "./AstraiosStorageProcessor";
import { injectable } from "inversify";
import "reflect-metadata";

/**
 * An implementation of {@link AstraiosStorageProcessor}, It will send Http requests to the backend Astraios storage
 * service
 */
@injectable()
export class StorageProcessor implements AstraiosStorageProcessor {
  storageProcessor(): Promise<AstraiosData> {
    const note: AstraiosData = {
      data: {
        type: "note",
        attributes: {
          graph: "",
          editorContent: "",
        },
      },
    };

    note["data"]["attributes"]["graph"] = useSelector((state: GlobalState) => JSON.stringify(state.nlpData));
    note["data"]["attributes"]["editorContent"] = useSelector((state: GlobalState) => JSON.stringify(state.editor));

    return sendRequest(note);
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

  return await axios.post(process.env.ASTRAIOS_API_URL as string, note, config);
};
