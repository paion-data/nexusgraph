// Copyright 2023 Paion Data. All rights reserved.
import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    supportFile: "cypress/support/commands.ts",
    env: {
      skipSignIn: process.env.SKIP_SIGN_IN as string,
      userEmail: process.env.TEST_USER_EMAIL as string,
      password: process.env.TEST_USER_PASSWORD as string,
      logtoEndpointUrl: process.env.LOGTO_ENDPOINT_URL as string,
      nodeEnv: process.env.NODE_ENV as string,
      entityExtractionServer: (process.env.THERESA_API_URL as string) + "entityExtraction",
      nodeExpand: (process.env.THERESA_API_URL as string) + "expand/",
      graphApiEndpoint: process.env.GRAPH_API_RESOURCE as string,
    },
    retries: {
      runMode: 10,
      openMode: 0,
    },
  },
});
