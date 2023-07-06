/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { GraphEditorState } from "../../../../nexusgraph-graph";
import { BasicNode } from "../../../../nexusgraph-graph/src/Graph";
import { NaturalLanguageProcessor } from "./NaturalLanguageProcessor";
import axios from "axios";

export class RemoteNaturalLanguageProcessor implements NaturalLanguageProcessor {
  entityExtraction(editorLines: string[]): GraphEditorState {
    let rootUrl = "https://machine-learning.paion-data.dev/entityExtraction?";
    let basicNodes: BasicNode[] = [];
    axios
      .get(rootUrl + "sentence=" + editorLines)
      .then((res) => {
        let data = res.data;
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
    let initNodes = data.nodes;
    let basicNodesList: BasicNode[] = [];
    for (let i = 0; i < initNodes.length; i++) {
      let node: BasicNode = {
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
