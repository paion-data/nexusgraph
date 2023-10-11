/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useEffect, useRef } from "react";
import type { Node, Link, GraphConfig } from "../GraphConfig";
import * as d3 from "d3";
import styles from "./ConfigurableD3Graph.module.css";

const DELETE_KEY_CODE = 46;
const BACKSPACE_KEY_CODE = 8;

const DEFAULT_LINK_DISTANCE = 90;
const DEFAULT_FORCE_STRENGTH = -30;

const DEFAULT_NODE_NAME = "new node";

/**
 * Generates a D3 graph whose content is defined by a provided {@link Graph graph data}.
 *
 * @param props An object containing a list of {@link Graph. Node}'s and list of {@link Graph. Link}'s
 *
 * @returns A D3 visualization of network graph
 */
export function ConfigurableD3Graph(graphConfig: GraphConfig): JSX.Element {
  const svgRef = useRef(null);

  const width = graphConfig.canvasConfig.width;
  const height = graphConfig.canvasConfig.height;

  const nodes: any[] = initializeNodes(graphConfig.graphData.nodes);
  let links: any[] = initializeLinks(graphConfig.graphData.links);

  useEffect(() => {
    let selectedSourceNode: any;
    let selectedTargetNode: any;
    let selectedLink: any;
    let newLine: any;

    let drawingLine = false;

    const simulation = initializeSimulation(nodes, links, width, height);

    const svg = attatchSvgTo(svgRef.current, width, height);

    const linesg = svg.append("g");
    const circlesg = svg.append("g");

    d3.select(svgRef.current).on("mouseup", windowMouseup).on("mousemove", windowMousemove).on("mousedown", mousedown);

    d3.select(window).on("keydown", windowKeydown);

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
      const link = linesg
        .selectAll("line.link")
        .data(links)
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
        .classed("selected", function (d: any) {
          return d === selectedLink;
        });

      // load all existing links
      link
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("marker-end", "url(#child)")
        .on("mousedown", linkMousedown);

      // off-load obsolete links due to node removal
      link.exit().remove();

      const node = circlesg
        .selectAll(".node")
        .data(nodes, function (d: any) {
          return d.name;
        })
        .classed("selected", function (d: any) {
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
        .attr("r", 20)
        .on("mousedown", nodeMousedown)
        .on("mouseover", nodeMouseover)
        .on("mouseout", nodeMouseout);

      nodeg
        .append("svg:a")
        .attr("xlink:href", function (d: any) {
          return d.url != null ? d.url : "#";
        })
        .append("text")
        .attr("dx", 24)
        .attr("dy", ".35em")
        .text(function (d: any) {
          return d.name;
        });
      node.exit().remove();

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
     * An event listener function that selects a link when a pointing device button is pressed while the pointer is inside
     * a graph link.
     *
     * The function records the currently selected link and deselect any nodes
     *
     * @param event An object that contains metadata about the event that triggers this listener function
     * @param d The datum object bound to the execution context, such as
     *
     * @see [Event listener parameter](https://observablehq.com/@d3/d3v6-migration-guide#events)
     */
    function linkMousedown(event: any, d: any): void {
      selectedLink = d;
      selectedSourceNode = null;
      update();
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
        selectedLink = null;
      }

      event.stopPropagation();
      drawingLine = true;

      d.fixed = true;

      simulation.stop();

      update();
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
        // highlight and select target node
        selectedTargetNode = d;
      }
    }

    /**
     * Handles, after a node or link is mouse-selected, various key stroke event, such as deleting the node or link.
     *
     * @param event An object that contains metadata about the event that triggers this listener function
     * @param d The datum object bound to the execution context, such as
     *
     * @see [Event listener parameter](https://observablehq.com/@d3/d3v6-migration-guide#events)
     */
    function windowKeydown(event: any, d: any): void {
      switch (event.keyCode) {
        case BACKSPACE_KEY_CODE:
        case DELETE_KEY_CODE: {
          if (selectedSourceNode != null) {
            const i = nodes.indexOf(selectedSourceNode);
            nodes.splice(i, 1);

            // find links to/from this node, and delete them too
            const preservedLinks: any = [];
            links.forEach(function (link) {
              if (link.source !== selectedSourceNode && link.target !== selectedSourceNode) {
                preservedLinks.push(link);
              }
            });
            links = preservedLinks;

            selectedSourceNode = nodes.length > 0 ? nodes[i > 0 ? i - 1 : 0] : null;
          } else if (selectedLink != null) {
            const i = links.indexOf(selectedLink);
            links.splice(i, 1);

            selectedLink = links.length > 0 ? links[i > 0 ? i - 1 : 0] : null;
          }
          update();
          break;
        }
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

        // confine the dragging inside canvas defined by width and height
        const x = Math.max(0, Math.min(width, pointerLocation[0]));
        const y = Math.max(0, Math.min(height, pointerLocation[1]));

        // debouncing - only start drawing when the line gets a bit longer
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
        let newNode: any;

        if (selectedTargetNode != null) {
          selectedTargetNode.fixed = false;
          newNode = selectedTargetNode;
        } else {
          const pointerLocation = d3.pointer(event, svg.node());
          newNode = {
            x: pointerLocation[0],
            y: pointerLocation[1],
            name: `${DEFAULT_NODE_NAME} ${nodes.length}`,
            group: 1,
          };
          nodes.push(newNode);
          simulation.nodes(nodes); // Reload nodes in simulation - https://github.com/d3/d3-force#simulation_nodes
        }

        selectedSourceNode.fixed = false;
        links.push({ source: selectedSourceNode, target: newNode });

        selectedSourceNode = null;
        selectedTargetNode = null;

        update();

        setTimeout(function () {
          newLine.remove();
          newLine = null;
          simulation.restart();
        }, 300);
      }
    }

    /**
     * Add a new disconnected node to canvas.
     *
     * @param event An object that contains metadata about the event that triggers this listener function
     * @param d The datum object bound to the execution context, such as
     *
     * @see [Event listener parameter](https://observablehq.com/@d3/d3v6-migration-guide#events)
     * @see [How to obtain pointer location in D3](https://stackoverflow.com/a/63988345)
     */
    function mousedown(event: any, d: any): void {
      const pointerLocation = d3.pointer(event, svg.node());

      nodes.push({
        x: pointerLocation[0],
        y: pointerLocation[1],
        name: `${DEFAULT_NODE_NAME} ${nodes.length}`,
        group: 1,
      });

      simulation.nodes(nodes); // Reload nodes in simulation - https://github.com/d3/d3-force#simulation_nodes

      selectedLink = null;

      simulation.stop();
      update();
      simulation.restart();
    }
  }, [nodes, links, svgRef.current]);

  const stylesName = [styles.g, styles.node, styles.line, styles.link, styles.newLine];
  return <svg ref={svgRef} width={width} height={height} className={stylesName.join(" ")} />;
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
 * Selects a specified HTML element and bind a new SVG to it using the provided width and height.
 *
 * @param htmlContainer The string that specifies which elements this SVG bind to and is in the form of a CSS
 * @param width The width of the SVG
 * @param height The height of the SVG
 *
 * @returns the selection itself, i.e. The bound SVG instance
 */
function attatchSvgTo(htmlContainer: any, width: number, height: number): any {
  return d3.select(htmlContainer).append("svg").attr("width", width).attr("height", height);
}

/**
 * Converts a list of {@link D3Graph. Node}'s to D3-compatible nodes.
 *
 * @param inputNodes The list of all node objects in Messier-61 format
 *
 * @returns a list of D3 force-graph nodes
 */
function initializeNodes(inputNodes: Node[]): any[] {
  return inputNodes;
}

/**
 * Converts a list of {@link Graph. Link}'s to D3-compatible links.
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
