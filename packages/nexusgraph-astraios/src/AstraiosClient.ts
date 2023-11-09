// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { GraphState } from "../../nexusgraph-redux";

const ASTRAIOS_GRAPHQL_API_ENDPOINT = process.env.ASTRAIOS_API_RESOURCE as string;

export class AstraiosClient {
  private _userId;
  private _accessToken;

  constructor(userId: string, accessToken: string) {
    this._userId = userId;
    this._accessToken = accessToken;
  }

  public saveOrUpdate(graph: GraphState): Promise<any> {
    const graphJson = JSON.stringify({ nodes: graph.nodes, links: graph.links }).replace(/"/g, '\\"');

    return this.postAstraiosQuery(
      `
      mutation saveGraph {
        graph(op: UPSERT, data: {
          id: "${graph.id}"
          name: "${graph.name}"
          graph: "${graphJson}"
          userId: "${this._userId}"
        }) {
          edges {
            node {
              id
              name
              graph
            }
          }
        }
      }
      `
    );
  }

  public getGraphById(graphId: string) {
    return this.postAstraiosQuery(
      `
      { 
        graph(ids:["${graphId}"]) {
          edges {
            node {
              id
              name
              graph
            }
          }
        }
      }
      `
    );
  }

  public deleteGraphById(graphId: string) {
    return this.postAstraiosQuery(
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

  public getGraphListMetaDataByUserId(userId: string) {
    return this.postAstraiosQuery(
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
    );
  }

  private postAstraiosQuery(query: string): Promise<any> {
    return axios.post(ASTRAIOS_GRAPHQL_API_ENDPOINT, { query: query }, this.getHeaders()).then((response) => {
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
}
