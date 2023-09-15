// Copyright 2023 Paion Data. All rights reserved.
import { Container } from "inversify";

import { AstraiosClient } from "../nexusgraph-astraios";
import { GraphQlClient } from "../nexusgraph-astraios/src/GraphqlAstraiosClient";
import { NaturalLanguageProcessor, RemoteNaturalLanguageProcessor } from "../nexusgraph-nlp";

/**
 * Define the types identifier to get dependency
 */
const TYPES = {
  AstraiosClient: Symbol("AstraiosClient"),
  NaturalLanguageProcessor: Symbol("NaturalLanguageProcessor"),
};

/**
 * Instantiate a inversify container for dependency injection
 */
const container = new Container();

/**
 * Bind the class we use to implement the interface
 */
container.bind<AstraiosClient>(TYPES.AstraiosClient).to(GraphQlClient).inSingletonScope();
container
  .bind<NaturalLanguageProcessor>(TYPES.NaturalLanguageProcessor)
  .to(RemoteNaturalLanguageProcessor)
  .inSingletonScope();

export { container, TYPES };
