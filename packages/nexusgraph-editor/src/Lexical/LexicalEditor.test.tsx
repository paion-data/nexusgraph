/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import React from "react";
import { render } from "@testing-library/react";
import LexicalEditor from "./LexicalEditor";

test("[Sanity Check] Loads editor without error", () => {
  render(<LexicalEditor lexicalEditorConfig={getTestEditorConfig()} />);
});

function getTestEditorConfig(): object {
  return {
    theme: {
      ltr: "ltr",
      rtl: "rtl",
      placeholder: "editor-placeholder",
      paragraph: "editor-paragraph",
    },
    onError(error: any) {
      throw error;
    },
  };
}
