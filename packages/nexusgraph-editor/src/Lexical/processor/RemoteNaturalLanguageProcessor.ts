/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { BasicNode, GraphEditorState } from "../../../../nexusgraph-graph";
import { NaturalLanguageProcessor } from "./NaturalLanguageProcessor";
import axios from "axios";

export class RemoteNaturalLanguageProcessor implements NaturalLanguageProcessor {
  entityExtraction(editorLines: string[]): GraphEditorState {
    let basicNodes: BasicNode[] = [];
    axios
      .get("https://machine-learning.paion-data.dev/entityExtraction", {
        params: {
          sentence: editorLines.join(" "),
        },
      })
      .then((res) => {
        const data = res.data;
        basicNodes = this.getBasicNode(data);
      })
      .catch((err) => {
        console.log(err);
      });
    return {
      nodes: basicNodes,
      relationships: [],
    };
  }

  getBasicNode(data: any) {
    const initNodes = data.nodes;
    const basicNodesList: BasicNode[] = [];
    for (let i = 0; i < initNodes.length; i++) {
      const node: BasicNode = {
        id: `${initNodes[i].id}`,
        labels: [`${initNodes[i].fields.type}`],
        properties: { name: `${initNodes[i].fields.label}` },
        propertyTypes: { name: "string" },
      };
      basicNodesList.push(node);
    }
    return basicNodesList;
  }
}
