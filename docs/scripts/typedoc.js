/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
const TypeDoc = require("typedoc");

async function main() {
  const app = await TypeDoc.Application.bootstrap({
    entryPoints: ["../packages/"],
    exclude: "../**/*+(test|env.d|setupTests).*",
    entryPointStrategy: "expand",
    tsconfig: "../tsconfig.json",
    media: "static/img/typedoc",
  });

  app.options.addReader(new TypeDoc.TSConfigReader());
  app.options.addReader(new TypeDoc.TypeDocReader());

  const project = await app.convert();

  if (!project) {
    throw new Error(`app.convert() was not successful`); // early return
  }

  const outputDir = "./build/api";
  app.generateDocs(project, outputDir);
  app.generateJson(project, outputDir + "/documentation.json");
}

main().catch(console.error);

