// Copyright 2023 Paion Data. All rights reserved.
import { transformBasicNodes, transformBasicRelationships } from "./VisualizationView";

it("Converts the common JSON node type to basic nodes", () => {
  const initialNodes = [
    {
      fields: {
        label: "China",
        type: "entity",
      },
      id: "China",
    },
  ];
  expect(transformBasicNodes(initialNodes)).toEqual([
    {
      id: "China",
      labels: ["entity"],
      properties: {
        name: "China",
        url: "null",
      },
      propertyTypes: {
        name: "string",
        url: "string",
      },
    },
  ]);
});

it("Converts the common JSON links type to basic relationships", () => {
  const initialLinks = [
    {
      fields: {
        type: "country",
      },
      source: "China",
      target: "Asia",
    },
  ];
  expect(transformBasicRelationships(initialLinks)).toEqual([
    {
      id: "country",
      startNodeId: "China",
      endNodeId: "Asia",
      type: "country",
      properties: {
        name: "country",
      },
      propertyTypes: {
        name: "string",
      },
    },
  ]);
});
