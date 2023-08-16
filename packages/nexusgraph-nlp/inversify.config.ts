/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { Container } from "inversify";
import { NaturalLanguageProcessor } from "./src/processor/NaturalLanguageProcessor"
import { RemoteNaturalLanguageProcessor } from "./src/processor/RemoteNaturalLanguageProcessor"
import "reflect-metadata";

const NaturalLanguageProcessorProvider = new Container();
NaturalLanguageProcessorProvider.bind<RemoteNaturalLanguageProcessor>(RemoteNaturalLanguageProcessor).to(RemoteNaturalLanguageProcessor);

// NaturalLanguageProcessorProvider.get<NaturalLanguageProcessor>(TYPES.NaturalLanguageProcessor);
// expect(NaturalLanguageProcessorProvider.get<NaturalLanguageProcessor>(TYPES.NaturalLanguageProcessor)
// ).to.eql("Ninja");

export default NaturalLanguageProcessorProvider
