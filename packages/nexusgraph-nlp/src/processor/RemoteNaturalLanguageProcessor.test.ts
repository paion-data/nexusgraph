// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";

import { container, TYPES } from "../../../nexusgraph-app/inversify.config";
import { NaturalLanguageProcessor } from "./NaturalLanguageProcessor";

const remoteNaturalLanguageProcessor: any = container.get<NaturalLanguageProcessor>(TYPES.NaturalLanguageProcessor);

jest.mock("axios");

describe("Remote Natural Language Processor delegates processing to remote WS", () => {
  it("Should return nlp Data", async () => {
    // given
    const editorLines = ["China"];
    const nlpData = {
      nodes: [
        {
          fields: {
            label: "China",
            type: "entity",
          },
          id: "China",
        },
        {
          fields: {
            label: "Mandarin",
            type: "entity",
          },
          id: "Mandarin",
        },
      ],
      links: [
        {
          fields: {
            label: "capital",
          },
          source: "Mandarin",
          target: "China",
        },
      ],
    };

    axios.create = jest.fn(() => axios);
    Object(axios.post).mockResolvedValueOnce(nlpData);

    remoteNaturalLanguageProcessor["fetchRemote"](editorLines).then((nlpState: any) => {
      expect(nlpState).toEqual(nlpData);

      expect(axios.create).toHaveBeenCalled();
      expect(axios.post).toHaveBeenCalledWith("entityExtraction/", {
        documents: editorLines,
      });
    });
  });
});
