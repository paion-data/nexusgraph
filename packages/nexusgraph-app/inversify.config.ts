// Copyright 2023 Paion Data. All rights reserved.
import { Container } from "inversify";

import { AstraiosClient } from "../nexusgraph-astraios";
import { GraphQlClient } from "../nexusgraph-astraios/src/GraphQlClient";
import { NLPClient, TheresaClient } from "../nexusgraph-nlp";

/**
 * Define the types identifier to get dependency
 */
const TYPES = {
  AstraiosClient: Symbol("AstraiosClient"),
  accessToken: Symbol("accessToken"),
  userId: Symbol("userId"),

  NLPClient: Symbol("NLPClient"),
};

/**
 * Instantiate a inversify container for dependency injection
 */
const container = new Container();

/**
 * Bind the class we use to implement the interface
 */
container.bind<NLPClient>(TYPES.NLPClient).to(TheresaClient).inSingletonScope();
container.bind<AstraiosClient>(TYPES.AstraiosClient).to(GraphQlClient).inSingletonScope();

export { container, TYPES };
