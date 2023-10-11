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

/**
 * Given a JSON object representing the current [editor state](https://lexical.dev/docs/concepts/editor-state), this
 * function converts it into a list of strings with each element representing a line of content in the editor.
 *
 * @param jsonObject the specified JSON object
 *
 * @returns a new list
 */
export default function parse(jsonObject: any): string[] {
  const lines: string[] = [];

  const rawLines: any[] = jsonObject.root.children[0].children;
  rawLines.forEach((line) => {
    if (line.text !== undefined) {
      lines.push(line.text);
    }
  });

  return lines;
}
