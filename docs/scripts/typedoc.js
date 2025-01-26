/**
 * Copyright 2025 Jiaqi Liu. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
