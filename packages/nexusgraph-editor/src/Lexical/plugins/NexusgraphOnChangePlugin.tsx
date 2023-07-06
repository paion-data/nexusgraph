/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { useEffect } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import parse from "../parser/RawTextParser";
import { RemoteNaturalLanguageProcessor } from "../processor/RemoteNaturalLanguageProcessor";

/**
 * {@link NexusgraphOnChangePlugin} implements the real-time capturing of editor content.
 *
 * When user enters arbitrary text into the Editor, the
 * [side effect](https://react.dev/reference/react/useEffect) of this component gets
 * immediately triggered.
 *
 * The side effects performs the following two operations:
 *
 * 1. Extracts each line of text and put them into a list
 * 2. Sends the list of texts to a Machine-Learning WS, which transforms the texts to a knowledge graph data
 * 3. Sends the knowledge graph data to Redux store for graphing component to consume
 *
 * @returns a standar lexical plugin
 */
export default function NexusgraphOnChangePlugin(): null {
  const [editor] = useLexicalComposerContext();

  const naturalLanguageProcessor = new RemoteNaturalLanguageProcessor();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const jsonObject = JSON.parse(JSON.stringify(editor.getEditorState()));
        const editorLines: string[] = parse(jsonObject);
        naturalLanguageProcessor.entityExtraction(editorLines);

        // @fannifanni
        // TODO - 将图数据送入 Redux Store
      });
    });
  }, [editor, parse]);

  return null;
}
