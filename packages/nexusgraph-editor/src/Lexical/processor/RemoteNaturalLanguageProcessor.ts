// Copyright 2023 Paion Data. All rights reserved.

import { GraphEditorState, ALL_REL_TYPE_SETS } from "../../../../nexusgraph-graph";
import axios from "axios";
import { NaturalLanguageProcessor } from "./NaturalLanguageProcessor";
import { BasicNode, BasicRelationship } from "../../../../nexusgraph-provider/src/shared/editor/editorDuck";

/**
 * An implementation of {@link NaturalLanguageProcessor} that delegates NLP to a remote service.
 */
export class RemoteNaturalLanguageProcessor implements NaturalLanguageProcessor {
  public entityExtraction(editorLines: string[]): Promise<GraphEditorState> {
    return this.remoteEntityExtration(editorLines);
  }

  /**
   * Given an array of editor lines, this method asynchronously performs entity extration on them and converts the
   * extracted entities to the format of {@link GraphEditorState}.
   *
   * @param editorLines  The specified editor contents to perform entity extration
   *
   * @returns a Promise the Redux state
   */
  private remoteEntityExtration = async (editorLines: string[]): Promise<GraphEditorState> => {
    const response = this.fetchRemote(editorLines);
    const data = (await response).data;
    const basicNodes = this.getBasicNode(data);
    const basicRelationships = this.getBasicRelationships(data);

    return {
      nodes: basicNodes,
      relationships: basicRelationships,
    };
  };

  /**
   * Queries configured Machine Learning WS to perform the named entity extration on a list of specified texts
   *
   * The HTTP query concats texts into a single string so that only 1 round-trip is executed
   *
   * @param editorLines  The provided texts
   *
   * @returns a Promise of the WS response data
   */
  private fetchRemote = async (editorLines: string[]) => {
    return await axios.post(process.env.ENTITY_EXTRACTION_API_URL as string, { documents: editorLines });
  };

  /**
   * Given a complete Knowledge Graph spec data, this method extracts nodes and converts them to Redux state consumed
   * by graphing component
   *
   * @param data  The provided WS response data
   *
   * @returns a list of new objects, each of which is a graph node compatible with Redux store state
   */
  private getBasicNode = (data: any): BasicNode[] => {
    const initNodes = data.nodes;
    const basicNodesList: BasicNode[] = [];

    if (initNodes != null && initNodes.length > 0) {
      for (let i = 0; i < initNodes.length; i++) {
        const node: BasicNode = {
          id: `${initNodes[i].id}`,
          labels: [`${initNodes[i].fields.type}`],
          properties: { name: `${initNodes[i].fields.label}` },
          propertyTypes: { name: "string" },
        };
        basicNodesList.push(node);
      }
    }

    return basicNodesList;
  };

  getBasicRelationships = (data: any) => {
    const basicRelationshipsList: BasicRelationship[] = [];
    data.links.map((link: any) => {
      const relationship: BasicRelationship = {
        id: link["fields"]["label"] ? link["fields"]["label"] : `${link["source"]}To${link["target"]} `,
        startNodeId: link["source"],
        endNodeId: link["target"],
        type: link["fields"]["label"] ? link["fields"]["label"] : ALL_REL_TYPE_SETS,
        properties: {},
        propertyTypes: {},
      };
      basicRelationshipsList.push(relationship);
    });
    return basicRelationshipsList;
  };
}
