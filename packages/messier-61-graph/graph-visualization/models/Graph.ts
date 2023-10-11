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
import type { NodeModel } from "./Node";
import type { RelationshipModel } from "./Relationship";

export class GraphModel {
  private _nodes: NodeModel[];
  private _relationships: RelationshipModel[];

  // maintaning these two map is for performance consideration
  nodeMap: Record<string, NodeModel>;
  relationshipMap: Record<string, RelationshipModel>;

  expandedNodeIdMap: Record<string, string[]>;

  constructor() {
    this._nodes = [];
    this._relationships = [];
    this.nodeMap = {};
    this.relationshipMap = {};
    this.expandedNodeIdMap = {};

    this.addNodes = this.addNodes.bind(this);
    this.removeNode = this.removeNode.bind(this);
    this.containsNode = this.containsNode.bind(this);
    this.findNode = this.findNode.bind(this);

    this.addRelationships = this.addRelationships.bind(this);
    this.containsRelationship = this.containsRelationship.bind(this);
    this.findRelationship = this.findRelationship.bind(this);

    this.findAllNeighborIdsOfNode = this.findAllNeighborIdsOfNode.bind(this);
    this.findAllRelationshipsToNode = this.findAllRelationshipsToNode.bind(this);
    this.removeConnectedRelationships = this.removeConnectedRelationships.bind(this);
    this.updateNode = this.updateNode.bind(this);

    this.addExpandedNodes = this.addExpandedNodes.bind(this);
    this.collapseNode = this.collapseNode.bind(this);

    this.resetGraph = this.resetGraph.bind(this);
  }

  public get nodes(): NodeModel[] {
    return this._nodes;
  }

  public get relationships(): RelationshipModel[] {
    return this._relationships;
  }

  public addNodes(nodes: NodeModel[]): void {
    for (const node of nodes) {
      if (!this.containsNode(node)) {
        this.nodes.push(node);
        this.nodeMap[node.id] = node;
      }
    }
  }

  public removeNode(node: NodeModel): void {
    if (this.containsNode(node)) {
      this.nodes.splice(this.nodes.indexOf(node), 1);

      // eslint-disable-next-line  @typescript-eslint/no-dynamic-delete
      delete this.nodeMap[node.id];
    }
  }

  public containsNode(node: NodeModel): boolean {
    return this.findNode(node.id) != null;
  }

  public findNode(id: string): NodeModel {
    return this.nodeMap[id];
  }

  public addRelationships(relationships: RelationshipModel[]): void {
    for (const relationship of Array.from(relationships)) {
      if (!this.containsRelationship(relationship.id)) {
        this.relationships.push(relationship);
        this.relationshipMap[relationship.id] = relationship;
      }
    }
  }

  public containsRelationship(relationshipId: string): boolean {
    return this.findRelationship(relationshipId) != null;
  }

  findRelationship(relationshipId: string): RelationshipModel | undefined {
    return this.relationshipMap[relationshipId];
  }

  findAllNeighborIdsOfNode(nodeId: string): string[] {
    return this.findAllRelationshipsToNode(nodeId).map((relationship) => {
      return relationship.target.id === nodeId ? relationship.source.id : relationship.target.id;
    });
  }

  public findAllRelationshipsToNode(nodeId: string): RelationshipModel[] {
    return this.relationships.filter(
      (relationship) => relationship.source.id === nodeId || relationship.target.id === nodeId
    );
  }

  public removeConnectedRelationships(node: NodeModel): void {
    for (const relationship of Array.from(this.findAllRelationshipsToNode(node.id))) {
      this.updateNode(relationship.source);
      this.updateNode(relationship.target);

      this.relationships.splice(this.relationships.indexOf(relationship), 1);
      // eslint-disable-next-line  @typescript-eslint/no-dynamic-delete
      delete this.relationshipMap[relationship.id];
    }
  }

  public updateNode(node: NodeModel): void {
    if (this.containsNode(node)) {
      this.removeNode(node);

      node.expanded = false;
      node.minified = true;

      this.addNodes([node]);
    }
  }

  addExpandedNodes(expandingNode: NodeModel, expandedNodes: NodeModel[]): void {
    this.addNodes(expandedNodes);

    for (const expandedNode of Array.from(expandedNodes)) {
      this.expandedNodeIdMap[expandingNode.id] =
        this.expandedNodeIdMap[expandingNode.id] == null
          ? uniq(this.expandedNodeIdMap[expandingNode.id].concat([expandedNode.id]))
          : [expandedNode.id];
    }
  }

  public collapseNode(node: NodeModel): void {
    if (!(node.id in this.expandedNodeIdMap)) {
      return;
    }

    this.expandedNodeIdMap[node.id].forEach((id) => {
      const expandedNode = this.nodeMap[id];

      this.collapseNode(expandedNode);
      this.removeConnectedRelationships(expandedNode);
      this.removeNode(expandedNode);
    });

    this.expandedNodeIdMap[node.id] = [];
  }

  public resetGraph(): void {
    this._nodes = [];
    this._relationships = [];

    this.nodeMap = {};
    this.relationshipMap = {};

    this.expandedNodeIdMap = {};
  }
}

function uniq<T>(list: T[]): T[] {
  return [...new Set(list)];
}
