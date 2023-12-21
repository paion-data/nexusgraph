// Copyright 2023 Paion Data. All rights reserved.
import { GraphMetaData, GraphState } from "../../../nexusgraph-redux";

/**
 * Webservice interface library.
 */
export interface GraphClient {
  saveOrUpdate(graph: GraphState): Promise<GraphState>;

  getGraphById(graphId: string): Promise<GraphState>;

  deleteGraphById(graphId: string): Promise<GraphState>;

  getGraphListMetaDataByUserId(userId: string): Promise<GraphMetaData[]>;
}
