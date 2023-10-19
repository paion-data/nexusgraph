// Copyright 2023 Paion Data. All rights reserved.
import * as Sentry from "@sentry/react";
import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { Graph } from "../../../nexusgraph-redux";
import TextareaContentParser from "../parser/TextareaContentParser";
import { NaturalLanguageProcessor } from "./NaturalLanguageProcessor";

const ENTITY_EXTRACTION_PATH_PARAM = "entityExtraction";

/**
 * An implementation of {@link NaturalLanguageProcessor} that delegates NLP to a remote service.
 */
@injectable()
export class RemoteNaturalLanguageProcessor implements NaturalLanguageProcessor {
  public entityExtraction(textareaContent: string): Promise<Graph> {
    const parser = new TextareaContentParser();
    const textLines = parser.parse(textareaContent);
    return this.remoteEntityExtration(textLines);
  }

  /**
   * Given an array of editor lines, this method asynchronously performs entity extration on them and converts the
   * extracted entities to the format of {@link Graph}.
   *
   * @param textLines  The specified editor contents to perform entity extration
   *
   * @returns a Promise the Redux state
   */
  private remoteEntityExtration = async (textLines: string[]): Promise<Graph> => {
    const response = this.fetchRemote(textLines);
    const data: Graph = (await response).data;
    return data;
  };

  /**
   * Queries configured Machine Learning WS to perform the named entity extration on a list of specified texts
   *
   * The HTTP query concats texts into a single string so that only 1 round-trip is executed
   *
   * @param textLines  The provided texts
   *
   * @returns a Promise of the WS response data
   */
  private fetchRemote = async (textLines: string[]) => {
    const instanceAxios = axios.create({
      baseURL: process.env.THERESA_API_URL as string,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
    };

    const response = instanceAxios.post(ENTITY_EXTRACTION_PATH_PARAM, { text: textLines }, config);

    response.catch(async (error) => {
      Sentry.captureException(error);
    });

    return await response;
  };
}
