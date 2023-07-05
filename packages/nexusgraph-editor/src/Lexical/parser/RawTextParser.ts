/*
 * Copyright 2023 Paion Data. All rights reserved.
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
