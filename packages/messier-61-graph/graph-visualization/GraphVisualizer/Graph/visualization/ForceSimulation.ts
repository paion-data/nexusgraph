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
import { forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY } from "d3-force";
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

const MAX_PRECOMPUTED_TICKS = 300;

// Friction.
const VELOCITY_DECAY = 0.4;

const FORCE_COLLIDE_RADIUS = (node: NodeModel): number => node.radius + 25;
const FORCE_LINK_DISTANCE = (relationship: RelationshipModel): number =>
  relationship.source.radius + relationship.target.radius + LINK_DISTANCE * 2;

/**
 * {@link ForceSimulation} is a wrapper of [d3-force Simulation](https://github.com/d3/d3-force#simulation).
 */
export class ForceSimulation {
  simulation: Simulation<NodeModel, RelationshipModel>;
  simulationTimeout: null | number = null;

  /**
   * Creates a new simulation with no nodes initially.
   *
   * The simulator is not started. In addition,
   *
   * - The [velocity decay factor](https://github.com/d3/d3-force#simulation_velocityDecay) is set to 0.4
   * - Graph nodes repels each other with a strength of -400
   * - The nodes are attracted towards the canvas center, i.e. (0, 0), with the strength of 0.03 on both X and Y
   *   direction
   * - The [alpha min](https://github.com/d3/d3-force#simulation_alphaMin) is set to 0.05
   * - Each [tick](https://github.com/d3/d3-force#simulation_tick) over-steps by 10 iterations
   */
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

  /**
   * Positions un-located nodes of a graph onto a circle and restarts the simulation.
   *
   * @param graph the graph whose dangling nodes are to be redrawn
   */
  public updateNodes(graph: GraphModel): void {
    const nodes = graph.nodes;
    this.circularLayout(nodes, { x: 0, y: 0 }, this.getRadius(nodes.length));
    this.simulation.nodes(nodes).force("collide", forceCollide<NodeModel>().radius(FORCE_COLLIDE_RADIUS));
  }

  /**
   * Re-apply force to links of a graph.
   *
   * @param graph the graph whose relationships are to be re-simulated
   */
  public updateRelationships(graph: GraphModel): void {
    this.simulation.force(
      "link",
      forceLink<NodeModel, RelationshipModel>(this.getAllRelationshipsPerPairOfNodes(graph.relationships))
        .id((node) => node.id)
        .distance(FORCE_LINK_DISTANCE)
    );
  }

  public precomputeAndStart(onEnd: () => void = () => undefined): void {
    this.simulation.stop();

    let precomputeTicks = 0;
    const start = performance.now();

    while (performance.now() - start < 250 && precomputeTicks < MAX_PRECOMPUTED_TICKS) {
      this.simulation.tick(1);
      precomputeTicks++;
      if (this.simulation.alpha() <= this.simulation.alphaMin()) {
        break;
      }
    }

    this.simulation.restart().on("end", () => {
      onEnd();
      this.simulation.on("end", null);
    });
  }

  /**
   * Restarts the simulation.
   */
  public restart(): void {
    this.simulation.alpha(DEFAULT_ALPHA).restart();
  }

  /**
   * Given a node distance and a number of nodes which are to be positioned on a circle equi-distance, this method
   * returns a approximated radius of the circle.
   *
   * The radius calculation is based on the assumption that the perimeter of the circle is approximately equal to
   * (the number of links) x (the number of nodes residing on the circle). The perimeter is, therefore, 2 * PI * R,
   * where R is to be returned by this method.
   *
   * @param numNodes the number of nodes residing on the calculated circle.
   *
   * @returns PERIMETER / (2 * PI)
   */
  public getRadius(numNodes: number): number {
    return (numNodes * LINK_DISTANCE) / (Math.PI * 2);
  }

  /**
   * A side-effect method which, given a list of nodes, computes the position of dangling nodes in the list if they are
   * to be positioned in a circle pattern.
   *
   * @param nodes A list of nodes which contains all the dangling nodes, whose (x, y) coordinates are to be computed
   * @param center The coordinates of the center of the circle
   * @param radius The radius of the circle
   */
  public circularLayout(nodes: NodeModel[], center: { x: number; y: number }, radius: number): void {
    const unlocatedNodes = nodes.filter((node) => !node.initialPositionCalculated);

    unlocatedNodes.forEach((node, i) => {
      console.log(
        ` Math.cos((2 * Math.PI * i) / unlocatedNodes.length) = ${Math.cos((2 * Math.PI * i) / unlocatedNodes.length)}`
      );

      node.x = center.x + radius * Math.cos((2 * Math.PI * i) / unlocatedNodes.length);
      node.y = center.y + radius * Math.sin((2 * Math.PI * i) / unlocatedNodes.length);
      node.initialPositionCalculated = true;
    });
  }

  /**
   * Given a list of relationships, this method filters out all "duplicate" relationships connecting the same pair of
   * nodes.
   *
   * For example, if the relationships are
   *
   * [
   *   {
   *     "source": "node1",
   *     "target": "node2"
   *   },
   *   {
   *     "source": "node1",
   *     "target": "node2"
   *   },
   *   {
   *     "source": "node5",
   *     "target": "node6"
   *   },
   * ]
   *
   * then this method returns
   *
   * [
   *   {
   *     "source": "node1",
   *     "target": "node2"
   *   },
   *   {
   *     "source": "node5",
   *     "target": "node6"
   *   },
   * ]
   *
   * @param relationships the specified list of relationshiops to be filtered
   *
   * @returns a sub-list of relationships, each of which connects a unique pair of nodes
   */
  public getAllRelationshipsPerPairOfNodes(relationships: RelationshipModel[]): RelationshipModel[] {
    return relationships.filter(
      (relationship, idx, self) =>
        idx === self.findIndex((it) => it.source === relationship.source && it.target === relationship.target)
    );
  }
}
