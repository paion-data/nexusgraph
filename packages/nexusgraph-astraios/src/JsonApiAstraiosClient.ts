// Copyright 2023 Paion Data. All rights reserved.
import { injectable } from "inversify";
import "reflect-metadata";
import { GraphName, GraphState } from "../../nexusgraph-redux";
import { AstraiosClient } from "./AstraiosClient";

/**
 * An implementation of {@link AstraiosClient}, It will send Http requests to the backend Astraios storage
 * service
 */
@injectable()
export class JsonApiAstraiosClient implements AstraiosClient {

  public saveOrUpdate(graph: GraphState): Promise<number> {
    return Promise.reject()
  }

  public getGraphList(userId: string): Promise<GraphName[]> {
    return Promise.reject();
  }

  public getGraphById(graphId: string): Promise<GraphState> {
    return Promise.reject();
  }

  public deleteGraphById(graphId: string): Promise<void> {
    return Promise.reject();
  }
}
