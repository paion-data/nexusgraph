// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { GraphName, GraphState } from "../../nexusgraph-redux";
import { AstraiosClient } from "./AstraiosClient";

const ASTRAIOS_GRAPHQL_API_ENDPOINT = process.env.ASTRAIOS_API_RESOURCE as string;

@injectable()
export class GraphQlClient implements AstraiosClient {
  private _token: string;
  private _userId: string;

  public constructor(userId: string, token: string) {
    this._userId = userId;
    this._token = token;
  }

  public saveOrUpdate(graph: GraphState): Promise<number> {
    return axios
      .post(
        ASTRAIOS_GRAPHQL_API_ENDPOINT,
        {
          query: ` 
          mutation saveGraph {
            graph(op: UPSERT, data: {
              graph: "${{
                nodes: graph.nodes,
                links: graph.links,
              }}"
              name: "${graph.name}"
              userId: "${this._userId}",
            }) {
              edges {
                node {
                  id
                  graph
                  userId
                }
              }
            }
          }
        `,
          operationName: "upsertGraph",
        },
        this.getHeaders(this._token)
      )
      .then((response) => {
        return response.data.data.graph.edges[0]["node"]["id"];
      });
  }

  public getGraphList(userId: string): Promise<GraphName[]> {
    return axios
      .post(
        ASTRAIOS_GRAPHQL_API_ENDPOINT,
        {
          query: ` 
        query getGraphList{
          graph (filter: \"userId==${userId}\"){
          edges 
          {
            node {
              id
              title: name
            }
          }
        }
        }
      `,
          operationName: "getGraphList",
        },
        this.getHeaders(this._token)
      )
      .then((response) => {
        return response.data.data.graph["edges"];
      });
  }

  public getGraphById(graphId: string): Promise<GraphState> {
    return axios
      .post(
        ASTRAIOS_GRAPHQL_API_ENDPOINT,
        {
          query: ` 
        query getGraphById{
          graph(ids: [\"${graphId}\"]) {
          edges 
          {
            node {
              id
              graph
              userId
              title: name
            }
          }
        } 
        }
`,
          operationName: "getGraphById",
        },
        this.getHeaders(this._token)
      )
      .then((response) => {
        return response.data.data.graph["edges"][0]["node"];
      });
  }

  public deleteGraphById(graphId: string): Promise<void> {
    return axios.post(
      ASTRAIOS_GRAPHQL_API_ENDPOINT,
      {
        query: ` 
          mutation deleteGraph{
            graph(op: DELETE, ids: [\"${graphId}\"]) {
              edges {
                node {
                  id
                  title
                  graph
                  editorContent
                }
              }
            }
          }
  `,
        operationName: "deleteGraph",
      },
      this.getHeaders(this._token)
    );
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
