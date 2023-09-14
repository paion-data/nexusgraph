// Copyright 2023 Paion Data. All rights reserved.
import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { GraphState } from "../../../nexusgraph-redux";
import EditorContentParser from "../parser/EditorContentParser";
import { NaturalLanguageProcessor } from "./NaturalLanguageProcessor";

/**
 * An implementation of {@link NaturalLanguageProcessor} that delegates NLP to a remote service.
 */
@injectable()
export class RemoteNaturalLanguageProcessor implements NaturalLanguageProcessor {
  public entityExtraction(editorContent: object): Promise<GraphState> {
    const parser = new EditorContentParser();
    const jsonObject = JSON.parse(JSON.stringify(editorContent));
    const editorLines = parser.parse(jsonObject);

    return this.remoteEntityExtration(editorLines);
  }

  /**
   * Given an array of editor lines, this method asynchronously performs entity extration on them and converts the
   * extracted entities to the format of {@link GraphState}.
   *
   * @param editorLines  The specified editor contents to perform entity extration
   *
   * @returns a Promise the Redux state
   */
  private remoteEntityExtration = async (editorLines: string[]): Promise<GraphState> => {
    const response = this.fetchRemote(editorLines);
    const data: GraphState = (await response).data;
    return data;
  };

  /**
   * Queries configured Machine Learning WS to perform the named entity extration on a list of specified texts
   *
   * The HTTP query concats texts into a single string so that only 1 round-trip is executed
   *
   * @param editorLines  The provided texts
   *
   * @returns a Promise of the WS response data
   */
  private fetchRemote = async (editorLines: string[]) => {
    return await axios.post(process.env.ENTITY_EXTRACTION_API_URL as string, { documents: editorLines });
  };
}
