/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { RemoteNaturalLanguageProcessor } from "./RemoteNaturalLanguageProcessor";

test("Returns an empty 'nodes' and 'relationships' with no input from the user", () => {
  const editorLines: any = [];
  const classInstantiated = new RemoteNaturalLanguageProcessor();
  expect(classInstantiated.entityExtraction(editorLines)).toEqual({ nodes: [], relationships: [] });
});

test("Return the correct 'GraphEditorState' data", () => {
  const remoteNaturalLanguageProcessor = new RemoteNaturalLanguageProcessor();
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
  expect(remoteNaturalLanguageProcessor.getBasicNode(dataGiven)).toEqual([
    { id: "中国", labels: ["Location"], properties: { name: "中国" }, propertyTypes: { name: "string" } },
    { id: "6", labels: ["Quantity"], properties: { name: "6" }, propertyTypes: { name: "string" } },
    { id: "6", labels: ["Quantity"], properties: { name: "6" }, propertyTypes: { name: "string" } },
  ]);
});
