/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import axios from "axios";
import { RemoteNaturalLanguageProcessor } from "./RemoteNaturalLanguageProcessor";

const naturalLanguageProcessor = new RemoteNaturalLanguageProcessor();

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
    Object(axios.post).mockResolvedValueOnce(nlpData);

    naturalLanguageProcessor["fetchRemote"](editorLines).then((nlpState) => {
      expect(nlpState).toEqual(nlpData);

      expect(axios.post).toHaveBeenCalledWith(process.env.ENTITY_EXTRACTION_API, {
        documents: editorLines,
      });
    });
  });
});
