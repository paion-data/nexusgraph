// Copyright 2023 Paion Data. All rights reserved.

export default class LexicalEditorStateParser {
  /**
   * Given a JSON object representing the current [editor state](https://lexical.dev/docs/concepts/editor-state), this
   * function converts it into a list of strings with each element representing a line of content in the editor.
   *
   * Empty lines gets filtered out.
   *
   * @param jsonObject  The JSON representation of the Lexical editor state. It is expected to follow the standard
   * Lexical editor state structure. For example, suppose the editor has 2 lines:
   *
   * This is line 1
   * This is line 2 and some important texts
   *
   * with "important" being bolded; then the editor state is:
   *
   * ```json
   * "root":{
   *   "children":[
   *     {
   *       "children":[
   *         {
   *           ...,
   *           "text":"This is line 1",
   *           ...
   *         }
   *       ],
   *       "direction":"ltr",
   *       ...
   *     },
   *     {
   *       "children":[
   *         {
   *           ...
   *           "format":0,
   *           "text":"This is line 2 and some ",
   *           ...
   *         },
   *         {
   *           ...,
   *           "format":1,
   *           "text":"important",
   *           ...
   *         },
   *         {
   *           ...,
   *           "format":0,
   *           "text":" texts",
   *           ...
   *         }
   *       ],
   *       "direction":"ltr",
   *       ...
   *     }
   *   ],
   *   "direction":"ltr",
   *   ...
   * }
   * ```
   *
   * @returns a new list of editor lines
   */
  public parse(jsonObject: any): string[] {
    const lines: string[] = [];

    jsonObject.root.children.forEach((lineChild: any) => {
      const line: string = this.parseLine(lineChild);
      if (line.length > 0) {
        lines.push(this.parseLine(lineChild));
      }
    });

    return lines;
  }

  /**
   * Converts a [TextNode](https://lexical.dev/docs/concepts/nodes#textnode) into a string.
   *
   * If the TextNode encodes an empty line, this method returns an empty string
   *
   * For example, the following TextNode
   *
   * ```json
   * {
   *   "children":[
   *     {
   *       ...
   *       "format":0,
   *       "text":"This is line 2 and some ",
   *       ...
   *     },
   *     {
   *       ...,
   *       "format":1,
   *       "text":"important",
   *       ...
   *     },
   *     {
   *       ...,
   *       "format":0,
   *       "text":" texts",
   *       ...
   *     }
   *   ],
   *   "direction":"ltr",
   *   ...
   * }
   * ```
   *
   * is converted to "This is line 2 and some important texts"
   *
   * @param lineChild
   *
   * @returns a string representatin of the TextNode in its current immutable state
   */
  private parseLine(lineChild: any): string {
    if (lineChild.children.length == 0) {
      return "";
    }

    let line = "";

    lineChild.children.forEach((part: any) => {
      line = line + part.text;
    });

    return line;
  }
}
