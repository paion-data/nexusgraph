// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { GraphMetaData, GraphState } from "../../../../nexusgraph-redux";
import { GraphClient } from "../GraphClient";

export class JsonGraphQLServerClient implements GraphClient {
  private _userId;

  public constructor(userId: string) {
    this._userId = userId;
  }

  public saveOrUpdate(graph: GraphState): Promise<GraphState> {
    return graph.id ? this.update(graph) : this.save(graph);
  }

  private save(graph: GraphState): Promise<GraphState> {
    return this.postQuery(
      `
      mutation {
        createGraph(user: ${Number(this._userId)}, name: "${graph.name}", nodes: ${this.removeQuotesFromKey(
        JSON.stringify(graph.nodes)
      )}, links: ${this.removeQuotesFromKey(
        JSON.stringify(graph.links)
      )}, created_on: "${new Date()}", last_updated_on: "${new Date()}") {
          id
          name
          nodes
          links
        }
      }
      `
    ).then((response) => {
      return response.data.data.createGraph;
    });
  }

  private update(graph: GraphState): Promise<GraphState> {
    return this.postQuery(
      `
      mutation {
        updateGraph(id: ${Number(graph.id)}, user: ${Number(this._userId)}, name: "${
        graph.name
      }", nodes: ${this.removeQuotesFromKey(JSON.stringify(graph.nodes))}, links: ${this.removeQuotesFromKey(
        JSON.stringify(graph.links)
      )}, created_on: "${new Date()}", last_updated_on: "${new Date()}") {
        id
        name
        nodes
        links
        }
      }
      `
    ).then((response) => {
      return response.data.data.createGraph;
    });
  }

  /**
   * Removes the double quotes from the JSON string properties.
   *
   * For example, `{ "name": "John Smith" }` becomes `{ name: "John Smith" }`
   *
   * @param jsonObjectString  A regular JSON object string with property key double-quoted
   *
   * @returns the same object with it's key's double quotes being removed
   */
  private removeQuotesFromKey(jsonObjectString: string) {
    return jsonObjectString.replace(/"([^"]+)":/g, "$1:");
  }

  public getGraphById(graphId: string): Promise<GraphState> {
    return this.postQuery(
      `
      {
        Graph(id:${graphId}) {
          id
          user
          name
          nodes
          links
          created_on
          last_updated_on
        }
      }
      `
    ).then((response) => {
      return response.data.data.Graph;
    });
  }

  public deleteGraphById(graphId: string): Promise<GraphState> {
    return this.postQuery(
      `
      mutation {
        removeGraph(id: ${Number(graphId)}) {
          id
        }
      }
      `
    );
  }

  public getGraphListMetaDataByUserId(userId: string): Promise<GraphMetaData[]> {
    return this.postQuery(
      `
      {
        allGraphs(filter: {user:${Number(userId)}}) {
          id
          name
        }
      }
      `
    ).then((response) => {
      return response.data.data.allGraphs;
    });
  }

  private postQuery(query: string): Promise<any> {
    return axios
      .request({
        url: "http://localhost:5000/",
        method: "post",
        params: {
          query: query,
        },
      })
      .then((response) => {
        return response;
      });
  }
}
