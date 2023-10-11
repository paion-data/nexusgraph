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
import type { EditorState, LexicalEditor } from "lexical";

export default function editorContentParser(editorState: EditorState, editor: LexicalEditor): string[] {
  const lines: string[] = [];

  editorState.read(() => {
    const jsonObject = JSON.parse(JSON.stringify(editor.getEditorState()));
    const rawLines: any[] = jsonObject.root.children[0].children;
    rawLines.forEach((line) => {
      if (line.text !== undefined) {
        lines.push(line.text);
      }
    });
  });

  return lines;
}
