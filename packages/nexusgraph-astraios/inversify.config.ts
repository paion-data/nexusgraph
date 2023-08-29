/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { Container } from "inversify";
import { JsonApiStorageProcessor } from "./src/StorageProcessor";

const AstraiosStorageProcessorProvider = new Container();
AstraiosStorageProcessorProvider.bind<JsonApiStorageProcessor>(JsonApiStorageProcessor).to(JsonApiStorageProcessor);

export { AstraiosStorageProcessorProvider };
