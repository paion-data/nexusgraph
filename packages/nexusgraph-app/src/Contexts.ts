// Copyright 2023 Paion Data. All rights reserved.
import { createContext } from "react";
import { GraphClient } from "../../nexusgraph-db";

export const GraphClientContext = createContext<GraphClient | undefined>(undefined);
