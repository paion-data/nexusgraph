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
import { useEffect } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import parse from "../parser/RawTextParser";

/**
 * {@link Messier61OnChangePlugin} implements the real-time capturing of editor content.
 *
 * When user enters arbitrary text into the Editor, the
 * [side effect](https://qubitpi.github.io/reactjs.org/reference/react/useEffect) of this component gets
 * immediately triggered.
 *
 * The side effects performs the following two operations:
 *
 * 1. Extracts each line of text and put them into a list
 * 2. Apply the `transformer` logic (@see {@link messier-61-editor!Editor}) to the list and turn it into a custome
 *    format
 * 3. "Export" the transformed result using some follow-up logic (@see {@link messier-61-editor!Editor}), such as
 *    performing some side effect in another module
 *
 * @returns a standar lexical plugin
 *
 * @see [Lexical Plugin](https://qubitpi.github.io/lexical/docs/react/plugins)
 */
export default function Messier61OnChangePlugin({
  transformer,
  exporter,
}: {
  transformer: (editorContentLines: string[]) => any;
  exporter: (exportLocation: any) => void;
}): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const jsonObject = JSON.parse(JSON.stringify(editor.getEditorState()));
        exporter(transformer(parse(jsonObject)));
      });
    });
  }, [editor, parse, transformer, exporter]);

  return null;
}
