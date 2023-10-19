// Copyright 2023 Paion Data. All rights reserved.
import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    supportFile: "cypress/support/commands.ts",
    env: {
      userEmail: process.env.TEST_USER_NAME as string,
      password: process.env.TEST_USER_PASSWORD as string,
      logtoEndpointUrl: process.env.LOGTO_ENDPOINT_URL as string,
      nodeEnv: process.env.NODE_ENV as string,
      entityExtractionServer: (process.env.THERESA_API_URL as string) + "entityExtraction",
      nodeExpand: (process.env.THERESA_API_URL as string) + "expand/",
      astraiosGraphqlEndpoint: process.env.ASTRAIOS_API_RESOURCE as string,
    },
  },
});
