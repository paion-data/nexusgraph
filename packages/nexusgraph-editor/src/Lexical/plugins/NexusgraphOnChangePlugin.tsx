/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useDispatch } from "react-redux";
import { UPDATE_EDITOR_STATE, UPDATE_NOTE_EDITOR_CONTENT } from "../../../../nexusgraph-provider";

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
  const dispatch = useDispatch();

  useEffect(() => {
    return editor.registerTextContentListener(() => {
      const updateEditorState = () => {
        const editorState = JSON.parse(JSON.stringify(editor.getEditorState()));

        dispatch({ type: UPDATE_EDITOR_STATE, payload: editorState });
        dispatch({ type: UPDATE_NOTE_EDITOR_CONTENT, payload: JSON.stringify(editorState) });
      };

      const t = setInterval(updateEditorState, Number(String(process.env.ENTITY_EXTRACTION_CALL_DELAY_IN_MS)));

      return () => clearInterval(t);
    });
  }, []);

  return null;
}
