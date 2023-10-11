/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
const editorConfig = {
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

export default editorConfig;
