/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditorStateParser } from "../parser";
import { useDispatch } from "react-redux";

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
  const parser = new LexicalEditorStateParser();
  const dispatch = useDispatch();

  let editorLines: string[] = [];

  useEffect(() => {
    const updateGraph = () => {
      if (editorLines.length > 0) {
        const entityExtrationTexts: string[] = structuredClone(editorLines);
        editorLines = [];
        dispatch({ type: "editorLine/UPDATE_LINE", payload: entityExtrationTexts });
      }
    };

    const t = setInterval(updateGraph, Number(String(process.env.ENTITY_EXTRACTION_CALL_DELAY_IN_MS)));

    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    return editor.registerTextContentListener(() => {
      const jsonObject = JSON.parse(JSON.stringify(editor.getEditorState()));
      editorLines = parser.parse(jsonObject);
    });
  }, []);
  return null;
}
