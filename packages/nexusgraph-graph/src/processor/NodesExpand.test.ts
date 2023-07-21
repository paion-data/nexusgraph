// Copyright 2023 Paion Data. All rights reserved.
import { NodeModel } from "../models/Node";
import { NodesExpandProcessor } from "./NodesExpand";
import axios from "axios";

const nodesExpandProcessor = new NodesExpandProcessor();
const selectNode = new NodeModel("china", ["entity"], { key: "name", value: "china" }, { key: "name", type: "string" });
const requestNode = { fields: { name: "china" }, id: "china" };

const responseData = {
  nodes: [
    { id: "East Asia", fields: { label: "East Asia", type: "entity" } },
    { id: "China", fields: { name: "China" } },
  ],
  links: [
    { source: "China", target: "East Asia" },
    { source: "China", target: "1.4 billion" },
  ],
};

const basicNodesAndRels = {
  nodes: [
    {
      id: "East Asia",
      labels: ["entity"],
      properties: {
        name: "East Asia",
      },
      propertyTypes: {
        name: "string",
      },
    },
  ],
  relationships: [
    {
      endNodeId: "East Asia",
      id: "ChinaToEast Asia ",
      properties: {},
      propertyTypes: {},
      startNodeId: "China",
      type: "*",
    },
    {
      endNodeId: "1.4 billion",
      id: "ChinaTo1.4 billion ",
      properties: {},
      propertyTypes: {},
      startNodeId: "China",
      type: "*",
    },
  ],
};

test("The node format is converted to a format that axios can accept", () => {
  expect(nodesExpandProcessor.transformNode(selectNode)).toStrictEqual(requestNode);
});

test("Convert the nodes and relationships resulting from the response to 'BasicNodeAndRel' type", () => {
  expect(nodesExpandProcessor.getNodesAndRels(responseData)).toStrictEqual(basicNodesAndRels);
});

jest.mock("axios");
Object(axios.post).mockResolvedValueOnce(responseData);

test("Axios responds successfully and returns the correct data", () => {
  nodesExpandProcessor.response(selectNode).then((getData) => {
    expect(getData).toStrictEqual(responseData);
    expect(axios.post).toHaveBeenCalledWith(process.env.EXPAND_API_URL as string, requestNode);
  });
});
