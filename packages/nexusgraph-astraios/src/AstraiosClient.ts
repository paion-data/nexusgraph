// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { GraphState } from "../../nexusgraph-redux";

const ASTRAIOS_GRAPHQL_API_ENDPOINT = process.env.ASTRAIOS_API_RESOURCE as string;

export class AstraiosClient {
  public saveOrUpdate(graph: GraphState, userId: string, accessToken: string): Promise<any> {
    return this.postAstraiosQuery(
      `
      mutation saveGraph {
        graph(op: UPSERT, data: {
          id: "${graph.id}"
          name: "${graph.name}"
          graph: "${{ nodes: graph.nodes, links: graph.links }}"
          userId: "${userId}",
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
      `,
      accessToken
    );
  }

  public getGraphById(id: string, accessToken: string): Promise<GraphState> {
    return this.postAstraiosQuery(
      `
      {
        graph(filter:"id==${id}") {
          edges {
            node {
              graph
            }
          }
        }
      }
      `,
      accessToken
    );
  }

  public getGraphListMetaDataByUserId(userId: string, accessToken: string) {
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
      `,
      accessToken
    );
  }

  private postAstraiosQuery(query: string, accessToken: string): Promise<any> {
    return axios
      .post(ASTRAIOS_GRAPHQL_API_ENDPOINT, { query: query }, this.getHeaders(accessToken))
      .then((response) => {
        return response;
      });
  }

  private getHeaders(token: string) {
    return {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
  }
}
