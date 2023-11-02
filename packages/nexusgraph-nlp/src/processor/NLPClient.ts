// Copyright 2023 Paion Data. All rights reserved.
import { Graph } from "../../../nexusgraph-redux";

export interface NLPClient {

  /**
   * Given an arbitrary text, this method asynchronously performs entity extration on them and converts the extracted
   * entities to the format of {@link Graph}.
   *
   * @param text  The specified editor contents to perform entity extration
   */
  entityExtraction(text: string): Promise<Graph>;
}
