/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { Container } from "inversify";
import { RemoteNaturalLanguageProcessor } from "./src/processor/RemoteNaturalLanguageProcessor";

/**
 * Create a container and bind RemoteNaturalLanguageProcessor in order to resolve dependencies
 */
const NaturalLanguageProcessorProvider = new Container();
NaturalLanguageProcessorProvider.bind<RemoteNaturalLanguageProcessor>(RemoteNaturalLanguageProcessor).to(
  RemoteNaturalLanguageProcessor
);

export { NaturalLanguageProcessorProvider };
