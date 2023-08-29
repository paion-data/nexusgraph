/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { Container } from "inversify";
import { JsonApiStorageProcessor } from "../nexusgraph-astraios/src/JsonApiStorageProcessor";
import { AstraiosStorageProcessor } from "../nexusgraph-astraios/src/AstraiosStorageProcessor";
import { RemoteNaturalLanguageProcessor } from "../nexusgraph-nlp/src/processor/RemoteNaturalLanguageProcessor";
import { NaturalLanguageProcessor } from "../nexusgraph-nlp/src/processor/NaturalLanguageProcessor";

/**
 * Define the types identifier to get dependency
 */
const TYPES = {
  AstraiosStorageProcessor: Symbol("AstraiosStorageProcessor"),
  NaturalLanguageProcessor: Symbol("NaturalLanguageProcessor"),
};

/**
 * Instantiate a inversify container for dependency injection
 */
const container = new Container();

/**
 * Bind the class we use to implement the interface
 */
container.bind<AstraiosStorageProcessor>(TYPES.AstraiosStorageProcessor).to(JsonApiStorageProcessor).inSingletonScope();
container
  .bind<NaturalLanguageProcessor>(TYPES.NaturalLanguageProcessor)
  .to(RemoteNaturalLanguageProcessor)
  .inSingletonScope();

export { container, TYPES };
