// Copyright 2023 Paion Data. All rights reserved.
import { transformToBasicNodes, transformToBasicRelationships } from "./VisualizationView";

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
  expect(transformToBasicNodes(initialNodes)).toEqual([
    {
      id: "China",
      labels: ["entity"],
      properties: {
        name: "China",
      },
      propertyTypes: {
        name: "string",
      },
    },
  ]);
});

it("Converts the common JSON links type to basic relationships", () => {
  const initialLinks = [
    {
      fields: {
        label: "country",
      },
      source: "China",
      target: "Asia",
    },
  ];
  expect(transformToBasicRelationships(initialLinks)).toEqual([
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
