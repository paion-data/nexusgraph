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
import React from "react";
import { LexicalEditor } from "./Lexical";
import editorConfig from "./Lexical/LexicalEditorConfig";

/**
 * A {@link Editor} is an abstraction layer for
 *
 * An Editor instance requires the following 2 functional arguments:
 *
 * 1. **transformer** A function that translates the most up-to-date
 * [editor content](https://qubitpi.github.io/lexical/docs/concepts/editor-state) into a format consumed by another
 * module. For example, the other module can be the {@link messier-61-graph!Graph} module, which consumes the some input
 * of type {@link messier-61-graph!GraphData}; in this case, the `transformer` function
 * simply takes `editorContentLines` as the most up-to-date editor content, parses it, and construct a
 * {@link messier-61-graph!GraphData} instance as its return value
 * 2. **exporter** A function that takes the output of the `transformer` and load it into somewhere else. For example,
 * in our {@link messier-61-graph!Graph} module example mentioned above, the `exporter` can simply be a
 * [set function of a state variable](https://qubitpi.github.io/reactjs.org/reference/react/useState#setstate). This
 * allows us to implement some "realtime graph editing" where user enters some text in Editor; that text can be parsed
 * by the `transformer` to generate some knowledge graph data; then the data gets _immediately_ loaded into the Graph
 * module for rendering
 *
 * @returns An knowledge graph editor
 */
export default function Editor({
  transformer,
  exporter,
}: {
  transformer: (editorContentLines: string[]) => any;
  exporter: (exportLocation: any) => void;
}): JSX.Element {
  return <LexicalEditor lexicalEditorConfig={editorConfig} transformer={transformer} exporter={exporter} />;
}
