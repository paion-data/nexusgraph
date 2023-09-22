// Copyright 2023 Paion Data. All rights reserved.
import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    supportFile: "cypress/support/commands.ts",
    env: {
      username: process.env.TEST_USER_NAME as string,
      password: process.env.TEST_USER_PASSWORD as string,
      logtoEndpointUrl: process.env.LOGTO_ENDPOINT_URL as string,
      nodeEnv: process.env.NODE_ENV as string,
      entityExtractionServer: process.env.ENTITY_EXTRACTION_API_URL as string,
      astraiosGraphqlEndpoint: process.env.ASTRAIOS_GRAPHQL_API_ENDPOINT as string,
    },
  },
});
