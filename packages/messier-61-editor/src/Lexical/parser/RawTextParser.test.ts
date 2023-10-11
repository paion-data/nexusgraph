/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import parse from "./RawTextParser";

import happyPathJson from "./json/raw-text-parser-happy-path.json";

test("Happy path JSON-encoded editor content gets parsed to list, each element of which is a line in editor", () => {
  expect(parse(happyPathJson)).toStrictEqual(["I love apple", "I drink coffee", "He likes google"]);
});
