/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import axios from "axios";
import { RemoteNaturalLanguageProcessor } from "./RemoteNaturalLanguageProcessor";

const naturalLanguageProcessor = new RemoteNaturalLanguageProcessor();

describe("Remote Natural Language Processor can transform Knowledge Graph Spec data into the format needed by graphing component", () => {
  test("Empty WS response converts to an empty Redux state", async () => {
    const editorLines: any = [];
    expect(naturalLanguageProcessor.getBasicNode(editorLines)).toEqual([]);
  });

  it("processor converts Knowledge Graph spec data into Redux states", () => {
    const dataGiven = {
      nodes: [
        {
          fields: {
            label: "中国",
            type: "Location",
          },
          id: "中国",
        },
        {
          fields: {
            label: "6",
            type: "Quantity",
          },
          id: "6",
        },
        {
          fields: {
            label: "6",
            type: "Quantity",
          },
          id: "6",
        },
      ],
    };

    expect(naturalLanguageProcessor.getBasicNode(dataGiven)).toEqual([
      { id: "中国", labels: ["Location"], properties: { name: "中国" }, propertyTypes: { name: "string" } },
      { id: "6", labels: ["Quantity"], properties: { name: "6" }, propertyTypes: { name: "string" } },
      { id: "6", labels: ["Quantity"], properties: { name: "6" }, propertyTypes: { name: "string" } },
    ]);
  });
});

jest.mock("axios");

describe("Remote Natural Language Processor delegates processing to remote WS", () => {
  it("should return users list", async () => {
    // given
    const editorLines = ["345678"];
    const user = {
      nodes: [
        { id: "345678", labels: ["Quantity"], properties: { name: "345678" }, propertyTypes: { name: "string" } },
      ],
      relationship: [],
    };
    Object(axios.get).mockResolvedValueOnce(user);

    naturalLanguageProcessor.fetchRemote(editorLines).then((graphEditorState) => {
      expect(graphEditorState).toEqual(user);

      expect(axios.get).toHaveBeenCalledWith("https://machine-learning.paion-data.dev/entityExtraction", {
        params: { sentence: editorLines.join(" ") },
      });
    });
  });
});
