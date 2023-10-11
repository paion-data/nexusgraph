// Copyright 2023 Paion Data. All rights reserved.
import { Graph } from "../../../nexusgraph-redux";

export interface NaturalLanguageProcessor {
  /**
   * Given an array of editor lines, this method asynchronously performs entity extration on them and converts the
   * extracted entities to the format of {@link Graph}.
   *
   * @param editorLines  The specified editor contents to perform entity extration
   */
  entityExtraction(editorLines: string): Promise<Graph>;
}
