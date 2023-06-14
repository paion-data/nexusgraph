/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
const TypeDoc = require("typedoc");

const app = new TypeDoc.Application();

app.options.addReader(new TypeDoc.TSConfigReader());
app.options.addReader(new TypeDoc.TypeDocReader());

app.bootstrap({
  entryPoints: ["../packages/"],
  exclude: "../**/*+(test|env.d|setupTests).*",
  entryPointStrategy: "expand",
  tsconfig: "../tsconfig.json",
  media: "static/img/typedoc",
});

const project = app.convert();

if (!project) {
  throw new Error(`app.convert() was not successful`); // early return
}

const outputDir = "./build/api";
app.generateDocs(project, outputDir);
app.generateJson(project, outputDir + "/documentation.json");
