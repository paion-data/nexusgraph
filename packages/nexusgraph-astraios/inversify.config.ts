/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { Container } from "inversify";
import { StorageProcessor } from "./src/StorageProcessor";

const AstraiosStorageProcessorProvider = new Container();
AstraiosStorageProcessorProvider.bind<StorageProcessor>(StorageProcessor).to(StorageProcessor);

export { AstraiosStorageProcessorProvider };
