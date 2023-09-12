// Copyright 2023 Paion Data. All rights reserved.
import { Container } from "inversify";

import { AstraiosClient, JsonApiAstraiosClient } from "../nexusgraph-astraios";
import { NaturalLanguageProcessor, RemoteNaturalLanguageProcessor } from "../nexusgraph-nlp";
import { GraphQlClient } from "../nexusgraph-astraios/src/GraphQlClient";

/**
 * Define the types identifier to get dependency
 */
const TYPES = {
  JsonApiAstraiosClient: Symbol("JsonApiAstraiosClient"),
  GraphQlClient: Symbol("GraphQlClient"),
  NaturalLanguageProcessor: Symbol("NaturalLanguageProcessor"),
};

/**
 * Instantiate a inversify container for dependency injection
 */
const container = new Container();

/**
 * Bind the class we use to implement the interface
 */
container.bind<AstraiosClient>(TYPES.JsonApiAstraiosClient).to(JsonApiAstraiosClient).inSingletonScope();
container.bind<AstraiosClient>(TYPES.GraphQlClient).to(GraphQlClient).inSingletonScope();

container
  .bind<NaturalLanguageProcessor>(TYPES.NaturalLanguageProcessor)
  .to(RemoteNaturalLanguageProcessor)
  .inSingletonScope();

export { container, TYPES };
