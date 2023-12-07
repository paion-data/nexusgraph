// Copyright 2023 Paion Data. All rights reserved.
import { BasicNode, BasicRelationship } from "neo4j-devtools-arc";
import { Link, Node } from "../../nexusgraph-redux";

/**
 * Converts Redux-shaped graph nodes into format compatible with Neo4J graphing library.
 *
 * @param links  A list of nodes stored in Redux
 *
 * @returns a new array of newly constructed objects
 */
export const mapToBasicNodes = (nodes: Node[]): BasicNode[] => {
  return nodes.map((node) => {
    const propertyTypes: Record<string, string> = {};
    for (const propertyName of Object.keys(node.fields)) {
      propertyTypes[propertyName] = "string";
    }

    return {
      id: node["id"],
      elementId: node["id"],
      labels: ["*"],
      properties: node.fields,
      propertyTypes: propertyTypes,
    } as BasicNode;
  });
};

/**
 * Converts Redux-shaped graph links into format compatible with Neo4J graphing library.
 *
 * @param links  A list of links stored in Redux
 *
 * @returns a new array of newly constructed objects
 */
export const mapToBasicRelationships = (links: Link[]): BasicRelationship[] => {
  return links.map((link) => {
    const propertyTypes: Record<string, string> = {};
    for (const propertyName of Object.keys(link.fields)) {
      propertyTypes[propertyName] = "string";
    }

    return {
      id: link["id"],
      elementId: link["id"],
      startNodeId: link["source"],
      endNodeId: link["target"],
      type: link.fields["type"],
      properties: link.fields,
      propertyTypes: propertyTypes,
    } as BasicRelationship;
  });
};
