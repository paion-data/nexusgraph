// Copyright 2023 Paion Data. All rights reserved.
import LexicalEditorStateParser from "./LexicalEditorStateParser";

import happyPathJson from "./json/LexicalEditorStateParser-basic.json";
import withEmptyLineJson from "./json/LexicalEditorStateParser-with-empty-line.json";
import happyPathJsonParseLine from "./json/LexicalEditorStateParser-parseLine-basic.json";

let parser;

beforeEach(() => {
  parser = new LexicalEditorStateParser();
});

describe("Parser consumes the entire editing area contents", () => {
  test("Happy path JSON-encoded editor content gets parsed to list, each element of which is a line in editor", () => {
    expect(parser.parse(happyPathJson)).toStrictEqual([
      "This is heading 1",
      "This is line 1",
      "This is line 2 with important text",
    ]);
  });

  test("Empty lines in editor get filtered out by the parser", () => {
    expect(parser.parse(withEmptyLineJson)).toStrictEqual(["This is line 1", "This is line 3"]);
  });

  test("A single TextNode mixing with formatting child nodes gets converted to a single line", () => {
    expect(parser["parseLine"](happyPathJsonParseLine)).toEqual("This is a line with formatted text");
  });

  test("TextNode of an empty line gets converted to empty string", () => {
    expect(
      parser["parseLine"]({
        children: [],
        direction: "ltr",
      })
    ).toEqual("");
  });
});
