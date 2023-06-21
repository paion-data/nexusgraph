// Copyright 2023 Paion Data. All rights reserved.
import { GraphModel } from "./models/Graph";

const ALL_NODE_LABELS_SETS = "*";
const ALL_REL_TYPE_SETS = "*";

export type GraphStatsLabels = Record<string, { count: number; properties: Record<string, string> }>;

export type GraphStatsRelationshipTypes = Record<string, { count: number; properties: Record<string, string> }>;

export type GraphStats = {
  labels?: GraphStatsLabels;
  relTypes?: GraphStatsRelationshipTypes;
};

export function getGraphStats(graph: GraphModel): GraphStats {
  const allNodeLable: GraphStatsLabels = {};
  allNodeLable[ALL_NODE_LABELS_SETS] = { count: graph.nodes.length, properties: {} };

  const allRelType: GraphStatsRelationshipTypes = {};
  allRelType[ALL_REL_TYPE_SETS] = { count: graph.relationships.length, properties: {} };

  const labelStats: GraphStatsLabels = graph.nodes.length === 0 ? {} : allNodeLable;

  const relTypeStats: GraphStatsRelationshipTypes = graph.relationships.length === 0 ? {} : allRelType;
  graph.nodes.forEach((node) => {
    node.labels.forEach((label) => {
      if (labelStats[label] == null) {
        labelStats[label] = { count: 1, properties: node.propertyMap };
      } else {
        labelStats[label].count = labelStats[label].count + 1;
        labelStats[label].properties = { ...labelStats[label].properties, ...node.propertyMap };
      }
    });
  });

  graph.relationships.forEach((rel) => {
    if (relTypeStats[rel.type] == null) {
      relTypeStats[rel.type] = {
        count: 1,
        properties: rel.propertyMap,
      };
    } else {
      relTypeStats[rel.type].count = relTypeStats[rel.type].count + 1;
      relTypeStats[rel.type].properties = {
        ...relTypeStats[rel.type].properties,
        ...rel.propertyMap,
      };
    }
  });

  return { labels: labelStats, relTypes: relTypeStats };
}
