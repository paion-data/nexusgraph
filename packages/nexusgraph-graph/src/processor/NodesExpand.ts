// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";

import { BasicNode, BasicNodesAndRels, BasicRelationship } from "../basicTypes";
import { ALL_NODE_LABELS_SETS, ALL_REL_TYPE_SETS } from "../GraphStats";
import { NodeModel } from "../models/Node";

const NODE_EXPAND_PATH_PARAM = "expand/";
const LINK_TYPE = "type";

export class NodesExpandProcessor {
  extractionNeighbours(selectNode: NodeModel): Promise<BasicNodesAndRels> {
    return this.getNeighboursData(selectNode);
  }

  getNeighboursData = async (selectNode: NodeModel): Promise<BasicNodesAndRels> => {
    const nodesAndRels: BasicNodesAndRels = { nodes: [], relationships: [] };
    const response = await this.response(selectNode);

    nodesAndRels.nodes = nodesAndRels.nodes.concat(this.getNodesAndRels(response.data).nodes);
    nodesAndRels.relationships = nodesAndRels.relationships.concat(this.getNodesAndRels(response.data).relationships);

    return nodesAndRels;
  };

  response = async (selectNode: NodeModel) => {
    const instanceAxios = axios.create({
      baseURL: process.env.THERESA_API_URL as string,
    });
    return await instanceAxios.post(NODE_EXPAND_PATH_PARAM, this.transformNode(selectNode));
  };

  transformNode(selectNode: NodeModel) {
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
          labels: [].concat(responseNode["fields"]["type"] ? responseNode["fields"]["type"] : ALL_NODE_LABELS_SETS),
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
        type: link["fields"] && link["fields"][LINK_TYPE] ? link["fields"][LINK_TYPE] : ALL_REL_TYPE_SETS,
        properties: {},
        propertyTypes: {},
      };
      nodesAndRels.relationships.push(basicRelationship);
    });
    return nodesAndRels;
  }
}
