// Copyright 2023 Paion Data. All rights reserved.
import { GraphName, GraphState } from "../../nexusgraph-redux";

/**
 * This interface is used to define the data format for sending requests to the backend storage server Astraios
 */
export interface AstraiosClient {

  /**
   * UPSERT a graph.
   *
   * @param graph  The graph object to be persisted 
   */
  saveOrUpdate(graph: GraphState): Promise<number>;

  getGraphList(userId: string): Promise<GraphName[]>;
  
  getGraphById(graphId: string): Promise<GraphState>;
  
  deleteGraphById(graphId: string): Promise<void>;
}
