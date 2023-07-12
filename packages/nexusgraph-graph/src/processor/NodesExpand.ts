// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { BasicNode, BasicNodesAndRels, BasicRelationship } from "../Graph";
import { NodeModel } from "../models/Node";

export class NodesExpandProcessor {
  extractionNeighbours(selectNode: any): Promise<BasicNodesAndRels> {
    const nodesAndRels: BasicNodesAndRels = { nodes: [], relationships: [] };

    const getNeighboursData = async (): Promise<BasicNodesAndRels> => {
      const response = await axios.get("https://machine-learning.paion-data.dev/expand", {
        params: {
          node: JSON.stringify(this.transformationNode(selectNode)),
        },
      });

      nodesAndRels.nodes = nodesAndRels.nodes.concat(this.getNodesAndRels(response.data).nodes);
      nodesAndRels.relationships = nodesAndRels.relationships.concat(this.getNodesAndRels(response.data).relationships);

      return nodesAndRels;
    };
    return getNeighboursData();
  }

  transformationNode(selectNode: NodeModel) {
    const newNodes = {
      fields: {
        name: selectNode["id"],
      },
      id: selectNode["id"],
    };
    return newNodes;
  }

  getNodesAndRels(data: any): BasicNodesAndRels {
    const nodesAndRels: BasicNodesAndRels = { nodes: [], relationships: [] };
    data.nodes.map((responseNode: any) => {
      if (responseNode.fields.type) {
        const basicNode: BasicNode = {
          id: responseNode["id"],
          labels: [].concat(responseNode["fields"]["type"] ? responseNode["fields"]["type"] : "*"),
          properties: {
            name: responseNode["fields"]["name"] ? responseNode["fields"]["name"] : responseNode["fields"]["label"],
          },
          propertyTypes: { name: "string" },
        };
        nodesAndRels.nodes.push(basicNode);
      }
    });
    data.links.map((link: any) => {
      const basicRelationship: BasicRelationship = {
        id: `${link["source"]}To${link["target"]} `,
        startNodeId: link["source"],
        endNodeId: link["target"],
        type: `${link["source"]}To${link["target"]} `,
        properties: {},
        propertyTypes: {},
      };
      nodesAndRels.relationships.push(basicRelationship);
    });
    return nodesAndRels;
  }
}
