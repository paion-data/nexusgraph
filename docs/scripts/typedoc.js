/*
 * Copyright Jiaqi Liu
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
  const app = new TypeDoc.Application();

  // Ask TypeDoc to load tsconfig.json and typedoc.json files
  app.options.addReader(new TypeDoc.TSConfigReader());
  app.options.addReader(new TypeDoc.TypeDocReader());

  app.bootstrap({
    // typedoc options
    entryPoints: [
      "../packages/messier-61-app/index.tsx",
      "../packages/messier-61-app/App.tsx",

      "../packages/messier-61-editor/index.ts",
      "../packages/messier-61-editor/Lexical/index.ts",
      "../packages/messier-61-editor/Lexical/LexicalEditorConfig.ts",
      "../packages/messier-61-editor/Lexical/EditorContentParser.tsx",
      "../packages/messier-61-editor/Lexical/plugins/Messier61OnChangePlugin.tsx",

      "../packages/messier-61-external-brain/index.ts",
      "../packages/messier-61-external-brain/ExternalBrain.tsx",
      "../packages/messier-61-external-brain/Transformer.tsx",

      "../packages/messier-61-graph/index.ts",
      "../packages/messier-61-graph/Graph.tsx",
      "../packages/messier-61-graph/GraphDataMaker.ts",
      "../packages/messier-61-graph/GraphDecorator.test.ts",
      "../packages/messier-61-graph/D3Graph/index.ts",
      "../packages/messier-61-graph/D3Graph/D3Graph.tsx",

      "../packages/messier-61-home/index.ts",

      "../packages/messier-61-nlp/BasicSVOParser.ts",
    ],
    entryPointStrategy: "expand",
    tsconfig: "../tsconfig.json",
    media: "static/img/typedoc",
  });

  const project = app.convert();

  // Project has converted correctly
  if (project) {
    const outputDir = "./build/api";

    // Rendered docs
    await app.generateDocs(project, outputDir);
    // Alternatively generate JSON output
    await app.generateJson(project, outputDir + "/documentation.json");
  }
}

main().catch(console.error);
