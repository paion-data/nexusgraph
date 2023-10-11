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
import type { Simulation } from "d3-force";
import { forceCollide, forceManyBody, forceSimulation, forceX, forceY } from "d3-force";
import type { GraphModel } from "../../../models/Graph";
import type { NodeModel } from "../../../models/Node";
import type { RelationshipModel } from "../../../models/Relationship";

// Temperature of the simulation. It's a value in the range [0,1] and it
// decreases over time. Can be seen as the probability that a node will move.
const DEFAULT_ALPHA = 1;

// Temperature at which the simulation is stopped.
const DEFAULT_ALPHA_MIN = 0.05;

const FORCE_CENTER_X = 0.03;
const FORCE_CENTER_Y = 0.03;

const FORCE_CHARGE = -400;
const LINK_DISTANCE = 45;
const EXTRA_TICKS_PER_RENDER = 10;

// Friction.
const VELOCITY_DECAY = 0.4;

const FORCE_COLLIDE_RADIUS = (node: NodeModel): number => node.radius + 25;

/**
 * A wrapper class of D3-force.
 */
export class ForceSimulation {
  simulation: Simulation<NodeModel, RelationshipModel>;
  simulationTimeout: null | number = null;

  constructor(render: () => void) {
    this.simulation = forceSimulation<NodeModel, RelationshipModel>()
      .velocityDecay(VELOCITY_DECAY)
      .force("charge", forceManyBody().strength(FORCE_CHARGE))
      .force("centerX", forceX(0).strength(FORCE_CENTER_X))
      .force("centerY", forceY(0).strength(FORCE_CENTER_Y))
      .alphaMin(DEFAULT_ALPHA_MIN)
      .on("tick", () => {
        this.simulation.tick(EXTRA_TICKS_PER_RENDER);
        render();
      })
      .stop();
  }

  public updateNodes(graph: GraphModel): void {
    const nodes = graph.nodes;
    this.circularLayout(nodes, { x: 0, y: 0 }, this.getRadius(nodes.length));
    this.simulation.nodes(nodes).force("collide", forceCollide<NodeModel>().radius(FORCE_COLLIDE_RADIUS));
  }

  public restart(): void {
    this.simulation.alpha(DEFAULT_ALPHA).restart();
  }

  /**
   * Given a number nodes which are to be positioned on a circle and a node distance number, this method returns a
   * approximated radius of the circle.
   *
   * This is a approximation where the perimeter of the circle is approximated by the number of links times the number
   * of nodes residing on the circle. The perimeter is, therefore, 2 * PI * R, where R is to be returned by this method.
   *
   * @param numNodes the number of nodes residing on the calculated circle.
   * @returns PERIMETER / (2 * PI)
   */
  private getRadius(numNodes: number): number {
    return (numNodes * LINK_DISTANCE) / (Math.PI * 2);
  }

  private circularLayout(nodes: NodeModel[], center: { x: number; y: number }, radius: number): void {
    const unlocatedNodes = nodes.filter((node) => !node.initialPositionCalculated);

    unlocatedNodes.forEach((node, i) => {
      node.x = center.x + radius * Math.sin((2 * Math.PI * i) / unlocatedNodes.length);

      node.y = center.y + radius * Math.cos((2 * Math.PI * i) / unlocatedNodes.length);

      node.initialPositionCalculated = true;
    });
  }
}
