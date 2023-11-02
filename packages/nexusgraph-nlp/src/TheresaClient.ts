// Copyright 2023 Paion Data. All rights reserved.
import * as Sentry from "@sentry/react";
import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { Graph } from "../../nexusgraph-redux";
import { NLPClient } from "./NLPClient";

const ENTITY_EXTRACTION_PATH_PARAM = "entityExtraction";

/**
 * An implementation of {@link NLPClient} that delegates NLP to paion-data/theresa.
 */
@injectable()
export class TheresaClient implements NLPClient {
  public entityExtraction(text: string): Promise<Graph> {
    return this.remoteEntityExtration(text);
  }

  /**
   * Given an array of editor lines, this method asynchronously performs entity extration on them and converts the
   * extracted entities to the format of {@link Graph}.
   *
   * @param textLines  The specified editor contents to perform entity extration
   *
   * @returns a Promise the Redux state
   */
  private remoteEntityExtration = async (text: string): Promise<Graph> => {
    const response = this.fetchRemote(text);
    const data: Graph = (await response).data;
    return data;
  };

  /**
   * Queries configured Machine Learning WS to perform the named entity extration on a list of specified texts
   *
   * The HTTP query concats texts into a single string so that only 1 round-trip is executed
   *
   * @param text  The provided text
   *
   * @returns a Promise of the WS response data
   */
  private fetchRemote = async (text: string) => {
    const instanceAxios = axios.create({
      baseURL: process.env.THERESA_API_URL as string,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
    };
    const payload = {
      columns: ["text"],
      data: [[text]],
    };

    const response = instanceAxios.post(
      ENTITY_EXTRACTION_PATH_PARAM,
      {
        dataframe_split: payload,
      },
      config
    );

    response.catch(async (error) => {
      Sentry.captureException(error);
    });

    return await response;
  };
}
