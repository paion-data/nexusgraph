// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { GraphMetaData, GraphState, Link, Node } from "../../../../nexusgraph-redux";
import { GraphClient } from "../GraphClient";

const GRAPH_API_ENDPOINT = process.env.GRAPH_API_RESOURCE as string;

const RESPONSE_FRAGMENT = `
  fragment nodeAttributes on Node {
    id
    noteId
    fields
  }
`;

const RESPONSE_SCHEMA = `
  edges {
    node {
        id
        userId
        name
        nodes {
            edges {
                node {
                    ...nodeAttributes
                }
            }
        }
        links {
            edges {
                node {
                    id
                    sourceNode {
                        edges {
                            node {
                                ...nodeAttributes
                            }
                        }
                    }
                    targetNode {
                        edges {
                            node {
                                ...nodeAttributes
                            }
                        }
                    }
                    fields
                }
            }
        }
        dateCreated
        dateUpdated
    }
  }
`;

export class DefaultGraphClient implements GraphClient {
  private _userId;
  private _accessToken;

  public constructor(userId: string, accessToken: string) {
    this._userId = userId;
    this._accessToken = accessToken;
  }

  public saveOrUpdate(graph: GraphState): Promise<GraphState> {
    return this.saveOrUpdateNodes(graph.nodes).then((nodeIdMap) => {
      return this.saveOrUpdateLinks(graph.links, nodeIdMap).then((linkIdMap) => {
        return this.saveOrUpdateGraph(graph, nodeIdMap, linkIdMap).then((response) => {
          return this.toGraphState(response);
        });
      });
    });
  }

  public getGraphById(graphId: string): Promise<GraphState> {
    return this.postGraphQuery(
      `
      {
        graph(ids:["${graphId}"]) {
            ${RESPONSE_SCHEMA}
        }
      }
    
      ${RESPONSE_FRAGMENT}
      `
    ).then((response) => {
      return this.toGraphState(response);
    });
  }

  public deleteGraphById(graphId: string): Promise<GraphState> {
    return this.postGraphQuery(
      `
      mutation {
        graph(op:DELETE, ids: ["${graphId}"]) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
      `
    );
  }

  public getGraphListMetaDataByUserId(userId: string): Promise<GraphMetaData[]> {
    return this.postGraphQuery(
      `
      query getGraphListMetaDataByUserId {
        graph(filter:"userId==${userId}") {
          edges {
            node {
              id
              name
            }
          }
        }
      }
      `
    ).then((response) => {
      return response.data.data.graph.edges.map((node: { node: any }) => {
        const metadata = node.node;
        return {
          id: metadata.id,
          name: metadata.name,
        };
      });
    });
  }

  private postGraphQuery(query: string): Promise<any> {
    return axios.post(GRAPH_API_ENDPOINT, { query: query }, this.getHeaders()).then((response) => {
      return response;
    });
  }

  private getHeaders() {
    return {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this._accessToken,
      },
    };
  }

  private saveOrUpdateNodes(nodes: Node[]): Promise<Map<string, string>> {
    const idMap: Map<string, string> = new Map();
    return this.postGraphQuery(
      `
      mutation {
          node(op:UPSERT data:${nodes}) {
              edges {
                  node {
                      id
                  }
              }
          }
      }
      `
    ).then((response) => {
      const createdNodeIds = response.data.data.node.edges.map((node: { node: { id: any } }) => {
        return node.node.id;
      });

      createdNodeIds.forEach((value: string, idx: number) => {
        idMap.set(nodes[idx].id, value);
      });

      return idMap;
    });
  }

  private saveOrUpdateLinks(links: Link[], nodeIdMap: Map<string, string>) {
    const linkEntities = links.map((link) => {
      return {
        id: link.id,
        sourceNode: { id: nodeIdMap.get(link.source) },
        targetNode: { id: nodeIdMap.get(link.target) },
        fields: link.fields,
      };
    });

    const idMap: Map<string, string> = new Map();
    return this.postGraphQuery(
      `
      mutation {
        link(
            op:UPSERT
            data:${linkEntities}
        ) {
            edges {
                node {
                    id
                }
            }
        }
    }
      `
    ).then((response) => {
      const createdLinkIds = response.data.data.link.edges.map((node: { node: { id: any } }) => {
        return node.node.id;
      });

      createdLinkIds.forEach((value: string, idx: number) => {
        idMap.set(links[idx].id, value);
      });

      return idMap;
    });
  }

  private saveOrUpdateGraph(graph: GraphState, nodeIdMap: Map<string, string>, linkIdMap: Map<string, string>) {
    const nodes = Array.from(nodeIdMap, ([key, dbId]) => {
      return {
        id: dbId,
      };
    });

    const links = Array.from(linkIdMap, ([key, dbId]) => {
      return {
        id: dbId,
      };
    });

    return this.postGraphQuery(
      `
      mutation {
        graph(
            op: UPSERT
            data:{
                userId: "${this._userId}",
                name: "${graph.name}",
                nodes: ${nodes},
                links: ${links}
            }
        ) {
            ${RESPONSE_SCHEMA}
        }
      }

      ${RESPONSE_FRAGMENT}
      `
    );
  }

  private toGraphState(response: any): GraphState {
    return response.data.data.graph.edges.map((node: { node: any }) => {
      const graph = node.node;
      const nodes: any[] = graph.nodes.edges.map((node: { node: any }) => {
        return {
          id: node.node.id,
          fields: JSON.parse(node.node.fields),
        };
      });
      const links: any[] = graph.links.edges.map((node: { node: any }) => {
        const link = node.node;
        return {
          id: link.id,
          source: link.sourceNode.edges[0].node.id,
          target: link.targetNode.edges[0].node.id,
          fields: JSON.parse(link.fields),
        };
      });

      return {
        id: graph.id,
        name: graph.name,
        nodes: nodes,
        links: links,
      };
    })[0];
  }
}
