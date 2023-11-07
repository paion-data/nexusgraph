// Copyright 2023 Paion Data. All rights reserved.
import { BasicNodesAndRels } from "../basicTypes";
import { mapNodes, mapRelationships } from "../Graph";
import { getGraphStats, GraphStats } from "../GraphStats";
import type { GraphModel } from "../models/Graph";
import { NodeModel } from "../models/Node";
import { RelationshipModel } from "../models/Relationship";
import type { Visualization } from "../Visualization";
import type { VizItem } from "../VizItem";

export const NODE_MOUSE_OVER = "nodeMouseOver";
export const NODE_MOUSE_OUT = "nodeMouseOut";
export const NEMU_MOUSE_OVER = "menuMouseOver";
export const NEMU_MOUSE_OUT = "menuMouseOut";
export const REL_MOUSE_OVER = "relMouseOver";
export const REL_MOUSE_OUT = "relMouseOut";
export const RELATIONSHIO_CLICKED = "relationshipClicked";
export const CANVAS_CLICKED = "canvasClicked";
export const CANVAS_DBL_CLICKED = "canvasDblClicked";
export const NODE_CLOSE = "nodeClose";
export const NODE_CLICKED = "nodeClicked";
export const NODE_DBLCLICKED = "nodeDblClicked";
export const NODE_UNLOCK = "nodeUnlock";
export const NODE_ALT_DOWN = "nodeAltDown";

export const NODE_ON_CANVAS_CREATE = "NODE_ON_CANVAS_CREATE";
export const LINK_ON_CANVAS_CREATE = "REL_ON_CANVAS_CREATE";

export type GraphInteraction =
  | "NODE_EXPAND"
  | "NODE_UNPINNED"
  | "NODE_DISMISSED"
  | typeof NODE_ON_CANVAS_CREATE
  | typeof LINK_ON_CANVAS_CREATE;

export type GraphInteractionCallBack = (event: GraphInteraction, properties?: Record<string, unknown>) => void;

export interface NodesAndRels {
  nodes: NodeModel[];
  relationships: RelationshipModel[];
}

export type GetNodeNeighboursFn = (
  node: NodeModel,
  currentNeighbourIds: string[],
  callback: (data: BasicNodesAndRels) => void
) => void;

export class GraphEventHandlerModel {
  getNodeNeighbours: GetNodeNeighboursFn;
  graph: GraphModel;
  visualization: Visualization;
  onGraphModelChange: (stats: GraphStats) => void;
  onItemMouseOver: (item: VizItem) => void;
  onItemSelected: (item: VizItem) => void;
  onGraphInteraction: GraphInteractionCallBack;
  selectedItem: NodeModel | RelationshipModel | null;

  private altCreatedLinkSourceNode: any;
  private altCreatedLinkTargetNode: any;

  constructor(
    graph: GraphModel,
    visualization: Visualization,
    getNodeNeighbours: GetNodeNeighboursFn,
    onItemMouseOver: (item: VizItem) => void,
    onItemSelected: (item: VizItem) => void,
    onGraphModelChange: (stats: GraphStats) => void,
    onGraphInteraction?: (event: GraphInteraction) => void
  ) {
    this.graph = graph;
    this.visualization = visualization;
    this.getNodeNeighbours = getNodeNeighbours;
    this.selectedItem = null;
    this.onItemMouseOver = onItemMouseOver;
    this.onItemSelected = onItemSelected;
    this.onGraphModelChange = onGraphModelChange;
    this.onGraphInteraction = onGraphInteraction ?? (() => undefined);

    this.altCreatedLinkSourceNode = null;
    this.altCreatedLinkTargetNode = null;
  }

  public graphModelChanged = (): void => {
    this.onGraphModelChange(getGraphStats(this.graph));
  };

  public selectItem(item: NodeModel | RelationshipModel): void {
    if (this.selectedItem != null) {
      this.selectedItem.selected = false;
    }

    item.selected = true;
    this.selectedItem = item;
    this.visualization.update({
      updateNodes: this.selectedItem instanceof NodeModel,
      updateRelationships: this.selectedItem instanceof RelationshipModel,
      restartSimulation: false,
    });
  }

  public deselectItem(): void {
    if (this.selectedItem != null) {
      this.selectedItem.selected = false;

      this.visualization.update({
        updateNodes: this.selectedItem instanceof NodeModel,
        updateRelationships: this.selectedItem instanceof RelationshipModel,
        restartSimulation: false,
      });

      this.selectedItem = null;
    }
    this.onItemSelected({
      type: "canvas",
      item: {
        nodeCount: this.graph.nodes.length,
        relationshipCount: this.graph.relationships.length,
      },
    });
  }

  public nodeClose(node: NodeModel): void {
    this.graph.removeConnectedRelationships(node);
    this.graph.removeNode(node);
    this.deselectItem();
    this.visualization.update({
      updateNodes: true,
      updateRelationships: true,
      restartSimulation: true,
    });
    this.graphModelChanged();
    this.onGraphInteraction("NODE_DISMISSED");
  }

  public nodeClicked(node: NodeModel): void {
    if (node === undefined) {
      return;
    }
    node.hoverFixed = false;
    node.fx = node.x;
    node.fy = node.y;
    if (node.selected) {
      this.deselectItem();
    } else {
      this.selectItem(node);
      this.onItemSelected({
        type: "node",
        item: node,
      });
    }
  }

  public nodeUnlock(node: NodeModel): void {
    if (node === undefined) {
      return;
    }
    node.fx = null;
    node.fy = null;
    this.deselectItem();
    this.onGraphInteraction("NODE_UNPINNED");
  }

  public nodeDblClicked(node: NodeModel): void {
    if (node.expanded) {
      this.nodeCollapse(node);
      return;
    }
    node.expanded = true;
    const graphModelChanged = this.graphModelChanged.bind(this);
    this.getNodeNeighbours(node, this.graph.findAllNeighborIdsOfNode(node.id), ({ nodes, relationships }) => {
      this.graph.addExpandedNodes(node, mapNodes(nodes));
      this.graph.addRelationships(mapRelationships(relationships, this.graph));
      this.visualization.update({ updateNodes: true, updateRelationships: true });
      graphModelChanged();
    });
    this.onGraphInteraction("NODE_EXPAND");
  }

  public nodeCollapse(node: NodeModel): void {
    node.expanded = false;
    this.graph.collapseNode(node);
    this.visualization.update({ updateNodes: true, updateRelationships: true });
    this.graphModelChanged();
  }

  public onNodeMouseOver(node: NodeModel): void {
    if (!node.contextMenu) {
      this.onItemMouseOver({
        type: "node",
        item: node,
      });
    }
  }

  public onMenuMouseOver(itemWithMenu: NodeModel): void {
    if (itemWithMenu.contextMenu === undefined) {
      throw new Error("menuMouseOver triggered without menu");
    }
    this.onItemMouseOver({
      type: "context-menu-item",
      item: {
        label: itemWithMenu.contextMenu.label,
        content: itemWithMenu.contextMenu.menuContent,
        selection: itemWithMenu.contextMenu.menuSelection,
      },
    });
  }

  public onRelationshipMouseOver(relationship: RelationshipModel): void {
    this.onItemMouseOver({
      type: "relationship",
      item: relationship,
    });
  }

  public onRelationshipClicked(relationship: RelationshipModel): void {
    if (relationship.selected) {
      this.deselectItem();
    } else {
      this.selectItem(relationship);
      this.onItemSelected({
        type: "relationship",
        item: relationship,
      });
    }
  }

  public onCanvasClicked(): void {
    this.deselectItem();
  }

  onCanvasDblClicked(): void {
    const newId = Math.random().toString(36).slice(2);

    this.onGraphInteraction(NODE_ON_CANVAS_CREATE, {
      newNode: {
        id: newId,
        fields: {
          name: "New Node",
          labels: ["Undefined"],
        },
      },
    });
  }

  public onItemMouseOut(): void {
    this.onItemMouseOver({
      type: "canvas",
      item: {
        nodeCount: this.graph.nodes.length,
        relationshipCount: this.graph.relationships.length,
      },
    });
  }

  nodeAltDown(node: NodeModel): void {
    if (!node) {
      return;
    }

    if (this.altCreatedLinkSourceNode == null && this.altCreatedLinkTargetNode == null) {
      this.altCreatedLinkSourceNode = node;
    } else if (this.altCreatedLinkSourceNode != null && this.altCreatedLinkTargetNode == null) {
      this.altCreatedLinkTargetNode = node;

      const newId = Math.random().toString(36).slice(2);

      this.onGraphInteraction(LINK_ON_CANVAS_CREATE, {
        newLink: {
          id: newId,
          source: this.altCreatedLinkSourceNode.id,
          target: this.altCreatedLinkTargetNode.id,
          fields: {
            type: "new link",
          },
        },
      });

      this.altCreatedLinkSourceNode = null;
      this.altCreatedLinkTargetNode = null;
    }
  }

  public bindEventHandlers(): void {
    this.visualization
      .on(NODE_MOUSE_OVER, this.onNodeMouseOver.bind(this))
      .on(NODE_MOUSE_OUT, this.onItemMouseOut.bind(this))
      .on(NEMU_MOUSE_OVER, this.onMenuMouseOver.bind(this))
      .on(NEMU_MOUSE_OUT, this.onItemMouseOut.bind(this))
      .on(REL_MOUSE_OVER, this.onRelationshipMouseOver.bind(this))
      .on(REL_MOUSE_OUT, this.onItemMouseOut.bind(this))
      .on(RELATIONSHIO_CLICKED, this.onRelationshipClicked.bind(this))
      .on(CANVAS_CLICKED, this.onCanvasClicked.bind(this))
      .on(CANVAS_DBL_CLICKED, this.onCanvasDblClicked.bind(this))
      .on(NODE_CLOSE, this.nodeClose.bind(this))
      .on(NODE_CLICKED, this.nodeClicked.bind(this))
      .on(NODE_DBLCLICKED, this.nodeDblClicked.bind(this))
      .on(NODE_UNLOCK, this.nodeUnlock.bind(this))
      .on(NODE_ALT_DOWN, this.nodeAltDown.bind(this));
    this.onItemMouseOut();
  }
}
