// Copyright 2023 Paion Data. All rights reserved.
import TextareaContentParser from "./TextareaContentParser";

it("The textarea processor breaks sentences based on periods in the text", () => {
  const text = "《易經﹒序卦傳》有天地，然後萬物生焉。盈天地之間者，唯萬物，故受之以屯；屯者盈也，屯者物之始生也。";
  const parser = new TextareaContentParser();
  parser.parse(text);
  expect(parser.parse(text)).toStrictEqual([
    "《易經﹒序卦傳》有天地，然後萬物生焉",
    "盈天地之間者，唯萬物，故受之以屯；屯者盈也，屯者物之始生也",
  ]);
});
