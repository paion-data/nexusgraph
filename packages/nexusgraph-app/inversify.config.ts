// Copyright 2023 Paion Data. All rights reserved.
import { Container } from "inversify";

import { NLPClient, TheresaClient } from "../nexusgraph-nlp";

/**
 * Define the types identifier to get dependency
 */
const TYPES = {
  DefaultGraphClient: Symbol("DefaultGraphClient"),
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

export { container, TYPES };
