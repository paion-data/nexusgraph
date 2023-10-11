// Copyright 2023 Paion Data. All rights reserved.
import React, { useEffect, useRef } from "react";
import type { Node, Link, GraphConfig } from "../GraphConfig";
import * as d3 from "d3";
import styles from "./D3Graph.module.css";
import { formatNodeLabel } from "../GraphDecorator";

const DEFAULT_LINK_DISTANCE = 90;
const DEFAULT_FORCE_STRENGTH = -30;
const DEFAULT_CIRCULE_RADIUS = 20;

/**
 * Generates a D3 graph whose content is defined by a provided {@link GraphConfig.GraphData}.
 *
 * @param graphConfig An object specifying the visual config of graph and graph data, which contains a list of
 * {@link GraphConfig.GraphData.Node}'s and list of {@link GraphConfig.Link}'s
 *
 * @returns A D3 visualization of network graph
 */
export function D3Graph(graphConfig: GraphConfig): JSX.Element {
  const svgRef = useRef(null);

  const width = graphConfig.canvasConfig.width;
  const height = graphConfig.canvasConfig.height;

  useEffect(() => {
    let selectedSourceNode: any;
    let selectedTargetNode: any;
    let drawingLine = false;
    let newLine: any;

    const nodes = initializeNodes(graphConfig.graphData.nodes);
    const links = initializeLinks(graphConfig.graphData.links);

    const simulation = initializeSimulation(nodes, links, width, height);

    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);

    /**
     * Reload all existing links & nodes and off-load obsolete (soft-deleted) ones.
     *
     * This method is usually called between a D3 force simulation "stop" and "restart" .
     *
     * Executing this function will cause the re-binding of simulation nodes and node data are joined using a key
     * funciton, which takes the node "name" as the resolving key.
     *
     * @see [How new links & nodes are loaded onto canvas](https://stackoverflow.com/a/43357028)
     * @see [D3 drag](https://github.com/d3/d3-drag/blob/v3.0.0/README.md#drag)
     * @see [key function](https://www.d3indepth.com/datajoins/#key-functions)
     */
    function update(): void {
      const node = circlesg
        .selectAll(".node")
        .data(nodes, function (d: any) {
          return d.name;
        })
        .classed("selectedSource", function (d: any) {
          return d === selectedSourceNode;
        })
        .classed("selectedTarget", function (d: any) {
          return d === selectedTargetNode;
        });

      const nodeg = node
        .enter()
        .append("g")
        .attr("class", "node")
        .call(d3.drag)
        .attr("transform", function (d: any) {
          return `translate(${d.x as string}, ${d.y as string})`;
        });

      nodeg
        .append("circle")
        .attr("r", DEFAULT_CIRCULE_RADIUS)
        .on("mousedown", nodeMousedown)
        .on("mouseover", nodeMouseover)
        .on("mouseout", nodeMouseout)
        .append("svg:a")
        .attr("xlink:href", function (d: any) {
          return d.url != null ? d.url : "#";
        });

      nodeg
        .append("foreignObject")
        .attr("width", 50)
        .attr("height", 50)
        .append("xhtml:body")
        .style("font", "14px black 'Helvetica Neue'")
        .html((d) => formatNodeLabel(d.name));
      node.exit().remove();

      const link = linesg.selectAll("line.link").data(links);

      link
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("x1", function (d: any) {
          return d.source.x;
        })
        .attr("y1", function (d: any) {
          return d.source.y;
        })
        .attr("x2", function (d: any) {
          return d.target.x;
        })
        .attr("y2", function (d: any) {
          return d.target.y;
        })
        .attr("marker-end", "url(#child)");

      link.exit().remove();

      simulation.nodes(nodes); // Reload nodes in simulation - https://github.com/d3/d3-force#simulation_nodes
      simulation.on("tick", () => {
        link
          .attr("x1", function (d: any) {
            return d.source.x;
          })
          .attr("y1", function (d: any) {
            return d.source.y;
          })
          .attr("x2", function (d: any) {
            return d.target.x;
          })
          .attr("y2", function (d: any) {
            return d.target.y;
          });
        node.attr("transform", function (d: any) {
          return `translate(${d.x as string}, ${d.y as string})`;
        });
      });
    }

    /**
     * An event listener function that selects a source node when a pointing device button is pressed while the pointer is
     * inside a graph node.
     *
     * The function records the currently selected node, deselect any links, and flags a link drawing.
     *
     * This function als performs side effect of stoping the simulation and graph reloading by calling {@link update}
     *
     * @param event An object that contains metadata about the event that triggers this listener function
     * @param d The datum object bound to the execution context, such as
     *
     * @see [Event listener parameter](https://observablehq.com/@d3/d3v6-migration-guide#events)
     */
    function nodeMousedown(event: any, d: any): void {
      if (!drawingLine) {
        selectedSourceNode = d;
      }

      drawingLine = true;

      d.fixed = true;

      simulation.stop();

      update();
    }

    /**
     * Selects, when a button on a pointing device (such as a mouse or trackpad) is released while the pointer is located
     * inside a node, a target node for new node connection if and only if the target node is not the source node.
     *
     * @param event An object that contains metadata about the event that triggers this listener function
     * @param d The datum object bound to the execution context, such as
     *
     * @see [Event listener parameter](https://observablehq.com/@d3/d3v6-migration-guide#events)
     */
    function nodeMouseover(event: any, d: any): void {
      if (drawingLine && d !== selectedSourceNode) {
        selectedTargetNode = d;
      }
    }

    /**
     * Prepare a target node selection by resetting the currently selected target node when a pointing device (usually a
     * mouse) is used to move the cursor so that it is no longer contained within a node element.
     *
     * @param event An object that contains metadata about the event that triggers this listener function
     * @param d The datum object bound to the execution context, such as
     *
     * @see [Event listener parameter](https://observablehq.com/@d3/d3v6-migration-guide#events)
     */
    function nodeMouseout(event: any, d: any): void {
      if (drawingLine) {
        selectedTargetNode = null;
      }
    }

    /**
     * Draws yellow "new connector" line when a pointing device (usually a mouse) is moved while the cursor's hotspot is
     * inside browser window.
     *
     * This happens only when we are drawing a line (i.e. drawingLine = true)
     *
     * @param event An object that contains metadata about the event that triggers this listener function
     * @param d The datum object bound to the execution context, such as
     *
     * @see [Event listener parameter](https://observablehq.com/@d3/d3v6-migration-guide#events)
     */
    function windowMousemove(event: any, d: any): void {
      if (drawingLine) {
        const pointerLocation = d3.pointer(event, svg.node());
        const x = Math.max(0, Math.min(width, pointerLocation[0]));
        const y = Math.max(0, Math.min(height, pointerLocation[1]));
        const dx = selectedSourceNode.x - x;
        const dy = selectedSourceNode.y - y;
        if (Math.sqrt(dx * dx + dy * dy) > 10) {
          if (newLine == null) {
            newLine = linesg.append("line").attr("class", "newLine");
          }
          newLine
            .attr("x1", function (d: any) {
              return selectedSourceNode.x;
            })
            .attr("y1", function (d: any) {
              return selectedSourceNode.y;
            })
            .attr("x2", function (d: any) {
              return x;
            })
            .attr("y2", function (d: any) {
              return y;
            });
        }
      }
      update();
    }

    /**
     * Materializes a link between source and target nodes when a button on a pointing device (such as a mouse or
     * trackpad) is released while the pointer is located inside the trget node.
     *
     * The closing drag is followed by a 30-ms delay before the link appears on screen
     *
     * @param event An object that contains metadata about the event that triggers this listener function
     * @param d The datum object bound to the execution context, such as
     *
     * @see [Event listener parameter](https://observablehq.com/@d3/d3v6-migration-guide#events)
     * @see [setTimeout](https://www.w3schools.com/jsref/met_win_settimeout.asp)
     */
    function windowMouseup(event: any, d: any): void {
      drawingLine = false;
      if (newLine != null) {
        if (selectedTargetNode != null) {
          selectedTargetNode.fixed = false;
          d = selectedTargetNode;
        }

        if (selectedSourceNode != null && selectedTargetNode != null) {
          links.push({ source: selectedSourceNode, target: d });
          update();
        }

        // delete the on-flight line
        newLine.remove();
        newLine = null;
        selectedSourceNode = null;
        selectedTargetNode = null;
      }
    }

    d3.select(svgRef.current).on("mouseup", windowMouseup).on("mousemove", windowMousemove);

    const linesg = svg.append("g");
    const circlesg = svg.append("g");
  }, [graphConfig, svgRef.current]);
  const stylesName = [styles.g, styles.node, styles.line, styles.link, styles.newLine];
  return <svg ref={svgRef} width={width} height={height} className={stylesName.join(" ")}></svg>;
}

/**
 * Creates a new simulation with the specified array of nodes and links with no forces.
 *
 * If nodes is not specified, it defaults to an empty array. Executing this function starts simulator automatically.
 *
 * The configuration of the simulation is the following:
 *
 * - A repulsive force field with a fixed strength of -340
 * - Nodes are pushed at a fixed distance of 90 units apart
 * - The ID of a node is defined by its property "id"
 * - The force attracts nodes to the center of the SVG area
 *
 * @param nodes The provided array of starting nodes
 * @param links The provided array of starting links
 * @param width The width of the canvas hosting the simulation
 * @param height The height of the canvas hosting the simulation
 *
 * @returns a fully initialized and running D3 force graph simulation
 *
 * @see [How node ID are accessed in D3](https://stackoverflow.com/a/45382200)
 */
function initializeSimulation(nodes: any[], links: any[], width: number, height: number): any {
  return d3
    .forceSimulation(nodes)
    .stop()
    .restart()
    .force("charge", d3.forceManyBody().strength(DEFAULT_FORCE_STRENGTH))
    .force(
      "link",
      d3
        .forceLink()
        .distance(DEFAULT_LINK_DISTANCE)
        .id(function (d: any) {
          return d.id;
        })
        .links(links)
    )
    .force("center", d3.forceCenter(width / 2, height / 2));
}

/**
 * Converts a list of {@link GraphConfig.GraphData. Node}'s to D3-compatible nodes.
 *
 * @param inputNodes The list of all node objects in Messier-61 format
 *
 * @returns a list of D3 force-graph nodes
 */
function initializeNodes(inputNodes: Node[]): any[] {
  return inputNodes;
}

/**
 * Converts a list of {@link GraphConfig.GraphData. Link}'s to D3-compatible links.
 *
 * Each of the returned links promises to have the following attributes:
 *
 * - source
 * - target
 *
 * Note that each link might contain other attributes, which D3 doesn't need for its own good
 *
 * @param inputLinks The list of all link objects in Messier-61 format
 *
 * @returns a list of D3 force-graph links
 */
function initializeLinks(inputLinks: Link[]): any[] {
  return inputLinks;
}
