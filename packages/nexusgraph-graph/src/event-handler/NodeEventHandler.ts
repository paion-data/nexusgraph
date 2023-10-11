// Copyright 2023 Paion Data. All rights reserved.
import { D3DragEvent, drag as d3Drag } from "d3-drag";
import type { Simulation } from "d3-force";
import type { BaseType, Selection } from "d3-selection";

import type { NodeModel } from "../models/Node";
import type { RelationshipModel } from "../models/Relationship";
import { NODE_MOUSE_OVER, NODE_MOUSE_OUT, NODE_CLICKED, NODE_DBLCLICKED } from "./GraphEventHandlerModel";

const DRAGGING_ALPHA = 0.8;
const DRAGGING_ALPHA_TARGET = 0.09;
const DEFAULT_ALPHA_TARGET = 0;

export function nodeEventHandlers(
  selection: Selection<SVGGElement, NodeModel, BaseType, unknown>,
  trigger: (event: string, node: NodeModel) => void,
  simulation: Simulation<NodeModel, RelationshipModel>
): Selection<SVGGElement, NodeModel, BaseType, unknown> {
  let initialDragPosition: [number, number];
  let restartedSimulation = false;
  const tolerance = 25;

  const onNodeClick = (_event: Event, node: NodeModel) => {
    trigger(NODE_CLICKED, node);
  };

  const onNodeDblClick = (_event: Event, node: NodeModel) => {
    trigger(NODE_DBLCLICKED, node);
  };

  const onNodeMouseOver = (_event: Event, node: NodeModel) => {
    if (!node.fx && !node.fy) {
      node.hoverFixed = true;
      node.fx = node.x;
      node.fy = node.y;
    }
    trigger(NODE_MOUSE_OVER, node);
  };

  const onNodeMouseOut = (_event: Event, node: NodeModel) => {
    if (node.hoverFixed) {
      node.hoverFixed = false;
      node.fx = null;
      node.fy = null;
    }

    trigger(NODE_MOUSE_OUT, node);
  };

  const dragstarted = (event: D3DragEvent<SVGGElement, NodeModel, any>) => {
    initialDragPosition = [event.x, event.y];
    restartedSimulation = false;
  };

  const dragged = (event: D3DragEvent<SVGGElement, NodeModel, any>, node: NodeModel) => {
    const dist = Math.pow(initialDragPosition[0] - event.x, 2) + Math.pow(initialDragPosition[1] - event.y, 2);

    if (dist > tolerance && restartedSimulation == false) {
      simulation.alphaTarget(DRAGGING_ALPHA_TARGET).alpha(DRAGGING_ALPHA).restart();
      restartedSimulation = true;
    }

    node.hoverFixed = false;
    node.fx = event.x;
    node.fy = event.y;
  };

  const dragended = (_event: D3DragEvent<SVGGElement, NodeModel, any>) => {
    if (restartedSimulation) {
      simulation.alphaTarget(DEFAULT_ALPHA_TARGET);
    }
  };

  return selection
    .call(d3Drag<SVGGElement, NodeModel>().on("start", dragstarted).on("drag", dragged).on("end", dragended))
    .on("mouseover", onNodeMouseOver)
    .on("mouseout", onNodeMouseOut)
    .on("click", onNodeClick)
    .on("dblclick", onNodeDblClick);
}
