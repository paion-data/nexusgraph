// Copyright 2023 Paion Data. All rights reserved.

export default class TextareaContentParser {
  public parse(text: string): string[] {
    const textareaLines = text.split("。").filter((text) => text !== "");
    return textareaLines;
  }
}
