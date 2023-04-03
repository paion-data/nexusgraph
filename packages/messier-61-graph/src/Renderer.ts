// Copyright 2023 Paion Data. All rights reserved.
import { BaseType, Selection } from "d3-selection";
import { arc as d3Arc } from "d3-shape";

import { NodeCaptionLine, NodeModel } from "./models/Node";
import { RelationshipModel } from "./models/Relationship";
import { Visualization } from "./Visualization";

const noOp = () => undefined;
const nodeRingStrokeSize = 8;
const numberOfItemsInContextMenu = 3;

const icons = {
  "Expand / Collapse":
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g class="icon"><defs><style>.a{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px;}</style></defs><title>Expand / Collapse</title><circle class="a" cx="13.5" cy="10.498" r="3.75"/><circle class="a" cx="21" cy="2.998" r="2.25"/><circle class="a" cx="21" cy="15.748" r="2.25"/><circle class="a" cx="13.5" cy="20.998" r="2.25"/><circle class="a" cx="3" cy="20.998" r="2.25"/><circle class="a" cx="3.75" cy="5.248" r="2.25"/><line class="a" x1="16.151" y1="7.848" x2="19.411" y2="4.588"/><line class="a" x1="16.794" y1="12.292" x2="19.079" y2="14.577"/><line class="a" x1="13.5" y1="14.248" x2="13.5" y2="18.748"/><line class="a" x1="10.851" y1="13.147" x2="4.59" y2="19.408"/><line class="a" x1="10.001" y1="9.149" x2="5.61" y2="6.514"/></g></svg>',
  Unlock:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g class="icon"><defs><style>.a{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px;}</style></defs><title>Unlock</title><path class="a" d="M.75,9.75V6a5.25,5.25,0,0,1,10.5,0V9.75"/><rect class="a" x="6.75" y="9.75" width="16.5" height="13.5" rx="1.5" ry="1.5"/><line class="a" x1="15" y1="15" x2="15" y2="18"/></g></svg>',
  Remove:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g class="icon"><defs><style>.a{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px;}</style></defs><title>Remove</title><path class="a" d="M8.153,13.664a12.271,12.271,0,0,1-5.936-4.15L1.008,7.96a.75.75,0,0,1,0-.92L2.217,5.486A12.268,12.268,0,0,1,11.9.75h0a12.269,12.269,0,0,1,9.684,4.736L22.792,7.04a.748.748,0,0,1,0,.92L21.584,9.514"/><path class="a" d="M10.4,10.937A3.749,3.749,0,1,1,15.338,9"/><circle class="a" cx="17.15" cy="17.25" r="6"/><line class="a" x1="14.15" y1="17.25" x2="20.15" y2="17.25"/></g></svg>',
};

type RendererEventHandler<Datum> = (
  selection: Selection<SVGGElement, Datum, BaseType, unknown>,
  style: Visualization
) => void;

export default class Renderer<Datum> {
  onGraphChange: RendererEventHandler<Datum>;
  onTick: RendererEventHandler<Datum>;
  name: string;

  constructor({
    onGraphChange = noOp,
    onTick = noOp,
    name,
  }: {
    onGraphChange?: RendererEventHandler<Datum>;
    onTick?: RendererEventHandler<Datum>;
    name: string;
  }) {
    this.onGraphChange = onGraphChange;
    this.onTick = onTick;
    this.name = name;
  }
}

const nodeOutline = new Renderer<NodeModel>({
  name: "nodeOutline",
  onGraphChange(selection, viz) {
    return selection
      .selectAll("circle.b-outline")
      .data((node) => [node])
      .join("circle")
      .classed("b-outline", true)
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", (node: NodeModel) => {
        return node.radius;
      })
      .attr("fill", (node: NodeModel) => {
        return viz.style.forNode(node).get("color");
      })
      .attr("stroke", (node: NodeModel) => {
        return viz.style.forNode(node).get("border-color");
      })
      .attr("stroke-width", (node: NodeModel) => {
        return viz.style.forNode(node).get("border-width");
      });
  },
  onTick: noOp,
});

const nodeCaption = new Renderer<NodeModel>({
  name: "nodeCaption",
  onGraphChange(selection, viz) {
    return selection
      .selectAll("text.caption")
      .data((node: NodeModel) => node.caption)
      .join("text")
      .classed("caption", true)
      .attr("text-anchor", "middle")
      .attr("pointer-events", "none")
      .attr("x", 0)
      .attr("y", (line: NodeCaptionLine) => line.baseline)
      .attr("font-size", (line: NodeCaptionLine) => viz.style.forNode(line.node).get("font-size"))
      .attr("fill", (line: NodeCaptionLine) => viz.style.forNode(line.node).get("text-color-internal"))
      .text((line: NodeCaptionLine) => line.text);
  },

  onTick: noOp,
});

const nodeRing = new Renderer<NodeModel>({
  name: "nodeRing",
  onGraphChange(selection) {
    const circles = selection.selectAll("circle.ring").data((node: NodeModel) => [node]);

    circles
      .enter()
      .insert("circle", ".b-outline")
      .classed("ring", true)
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("stroke-width", `${nodeRingStrokeSize}px`)
      .attr("r", (node: NodeModel) => node.radius + 4);

    return circles.exit().remove();
  },

  onTick: noOp,
});

const arrowPath = new Renderer<RelationshipModel>({
  name: "arrowPath",

  onGraphChange(selection, viz) {
    return selection
      .selectAll("path.b-outline")
      .data((rel: any) => [rel])
      .join("path")
      .classed("b-outline", true)
      .attr("fill", (rel: any) => viz.style.forRelationship(rel).get("color"))
      .attr("stroke", "none");
  },

  onTick(selection) {
    return selection
      .selectAll<BaseType, RelationshipModel>("path")
      .attr("d", (rel) => rel.arrow!.outline(rel.shortCaptionLength ?? 0));
  },
});

const relationshipType = new Renderer<RelationshipModel>({
  name: "relationshipType",
  onGraphChange(selection, viz) {
    return selection
      .selectAll("text")
      .data((rel) => [rel])
      .join("text")
      .attr("text-anchor", "middle")
      .attr("pointer-events", "none")
      .attr("font-size", (rel) => viz.style.forRelationship(rel).get("font-size"))
      .attr("fill", (rel) => viz.style.forRelationship(rel).get(`text-color-${rel.captionLayout}`));
  },

  onTick(selection, viz) {
    return selection
      .selectAll<BaseType, RelationshipModel>("text")
      .attr("x", (rel) => rel?.arrow?.midShaftPoint?.x ?? 0)
      .attr(
        "y",
        (rel) =>
          (rel?.arrow?.midShaftPoint?.y ?? 0) + parseFloat(viz.style.forRelationship(rel).get("font-size")) / 2 - 1
      )
      .attr("transform", (rel) => {
        if (rel.naturalAngle < 90 || rel.naturalAngle > 270) {
          return `rotate(180 ${rel?.arrow?.midShaftPoint?.x ?? 0} ${rel?.arrow?.midShaftPoint?.y ?? 0})`;
        } else {
          return null;
        }
      })
      .text((rel) => rel.shortCaption ?? "");
  },
});

const relationshipOverlay = new Renderer<RelationshipModel>({
  name: "relationshipOverlay",
  onGraphChange(selection) {
    return selection
      .selectAll("path.overlay")
      .data((rel) => [rel])
      .join("path")
      .classed("overlay", true);
  },

  onTick(selection) {
    const band = 16;

    return selection
      .selectAll<BaseType, RelationshipModel>("path.overlay")
      .attr("d", (rel) => rel.arrow!.overlay(band));
  },
});

function drawArc(radius: number, itemNumber: number, width = 30): any {
  const startAngle = ((2 * Math.PI) / numberOfItemsInContextMenu) * (itemNumber - 1);
  const endAngle = startAngle + (2 * Math.PI) / numberOfItemsInContextMenu;
  const innerRadius = Math.max(radius + 8, 20);
  return d3Arc()
    .innerRadius(innerRadius)
    .outerRadius(innerRadius + width)
    .startAngle(startAngle)
    .endAngle(endAngle)
    .padAngle(0.03);
}

const getSelectedNode = (node: NodeModel) => (node.selected ? [node] : []);

function attachContextEvent(
  eventType: string,
  elements: [
    Selection<BaseType | SVGPathElement, NodeModel, BaseType, NodeModel>,
    Selection<BaseType | SVGGElement, NodeModel, BaseType, NodeModel>
  ],
  viz: Visualization,
  content: string,
  label: string
) {
  elements.forEach((element) => {
    element.on("mousedown.drag", (event: Event) => {
      event.stopPropagation();
      return null;
    });
    element.on("mouseup", (_event: Event, node: NodeModel) => viz.trigger(eventType, node));
    element.on("mouseover", (_event: Event, node: NodeModel) => {
      node.contextMenu = {
        menuSelection: eventType,
        menuContent: content,
        label,
      };
      return viz.trigger("menuMouseOver", node);
    });

    element.on("mouseout", (_event: Event, node: NodeModel) => {
      delete node.contextMenu;
      return viz.trigger("menuMouseOut", node);
    });
  });
}

function createMenuItem(
  selection: Selection<SVGGElement, NodeModel, BaseType, unknown>,
  viz: Visualization,
  eventType: string,
  itemIndex: number,
  className: string,
  position: [number, number],
  svgIconKey: "Expand / Collapse" | "Unlock" | "Remove",
  tooltip: string
) {
  const tab = selection
    .selectAll(`path.${className}`)
    .data(getSelectedNode)
    .join("path")
    .classed(className, true)
    .classed("context-menu-item", true)
    .attr("d", (node: NodeModel) => drawArc(node.radius, itemIndex)());

  const rawSvgIcon = icons[svgIconKey];
  const svgIcon = document.importNode(
    new DOMParser().parseFromString(rawSvgIcon, "application/xml").documentElement.firstChild as HTMLElement,
    true
  );

  const icon = selection
    .selectAll(`.icon.${className}`)
    .data(getSelectedNode)
    .join("g")
    .html(svgIcon.innerHTML)
    .classed("icon", true)
    .classed(className, true)
    .classed("context-menu-item", true)
    .attr("transform", (node: NodeModel) => {
      return `translate(${Math.floor(drawArc(node.radius, itemIndex).centroid()[0] + position[0])},${Math.floor(
        drawArc(node.radius, itemIndex).centroid()[1] + position[1]
      )}) scale(0.7)`;
    })
    .attr("color", (node: NodeModel) => {
      return viz.style.forNode(node).get("text-color-internal");
    });

  attachContextEvent(eventType, [tab, icon], viz, tooltip, rawSvgIcon);

  tab
    .transition()
    .duration(200)
    .attr("d", (node: NodeModel) => {
      return drawArc(node.radius, itemIndex)();
    })
    .selection()
    .exit<NodeModel>()
    .transition()
    .duration(200)
    .attr("d", (node: NodeModel) => {
      return drawArc(node.radius, itemIndex, 1)();
    })
    .remove();

  return icon;
}

const donutRemoveNode = new Renderer<NodeModel>({
  name: "donutRemoveNode",
  onGraphChange(selection, viz) {
    return createMenuItem(selection, viz, "nodeClose", 1, "remove-node", [-8, 0], "Remove", "Dismiss");
  },

  onTick: noOp,
});

const donutExpandNode = new Renderer<NodeModel>({
  name: "donutExpandNode",
  onGraphChange(selection, viz) {
    return createMenuItem(
      selection,
      viz,
      "nodeDblClicked",
      2,
      "expand-node",
      [-8, -10],
      "Expand / Collapse",
      "Expand / Collapse child relationships"
    );
  },

  onTick: noOp,
});

const donutUnlockNode = new Renderer<NodeModel>({
  name: "donutUnlockNode",
  onGraphChange(selection, viz) {
    return createMenuItem(
      selection,
      viz,
      "nodeUnlock",
      3,
      "unlock-node",
      [-10, -6],
      "Unlock",
      "Unlock the node to re-layout the graph"
    );
  },

  onTick: noOp,
});

const node = [nodeOutline, nodeCaption, nodeRing];

const relationship = [arrowPath, relationshipType, relationshipOverlay];

const nodeMenuRenderer = [donutExpandNode, donutRemoveNode, donutUnlockNode];

export { node, relationship, nodeMenuRenderer };
