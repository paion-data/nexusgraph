// Copyright 2023 Paion Data. All rights reserved.
import type { NodeModel } from "./models/Node";
import type { RelationshipModel } from "./models/Relationship";

export type VizItem = NodeItem | ContextMenuItem | RelationshipItem | CanvasItem | StatusItem;

export interface NodeItem {
  type: "node";
  item: Pick<NodeModel, "id" | "labels" | "propertyList">;
}

interface ContextMenuItem {
  type: "context-menu-item";
  item: {
    label: string;
    content: string;
    selection: string;
  };
}

export interface RelationshipItem {
  type: "relationship";
  item: Pick<RelationshipModel, "id" | "type" | "propertyList">;
}

interface CanvasItem {
  type: "canvas";
  item: {
    nodeCount: number;
    relationshipCount: number;
  };
}

interface StatusItem {
  type: "status-item";
  item: string;
}
