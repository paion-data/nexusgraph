// Copyright 2023 Paion Data. All rights reserved.
import { useEffect } from "react";

import { registerCodeHighlighting } from "@paiondata/lexical-code";
import { useLexicalComposerContext } from "@paiondata/lexical-react/LexicalComposerContext";

export default function CodeHighlightPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return registerCodeHighlighting(editor);
  }, [editor]);
  return null;
}
