/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import React from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import styles from "./LexicalEditor.module.css";
import { RemoteNaturalLanguageProcessor } from "./processor/RemoteNaturalLanguageProcessor";
import { EditorState } from "lexical";
import { useDispatch } from "react-redux";
import { UPDATE_GRAPH } from "../../../nexusgraph-graph/src/shared/editor/editorDuck";
import parse from "./parser/RawTextParser";

export default function LexicalEditor({ lexicalEditorConfig }: { lexicalEditorConfig: any }): JSX.Element {

  const dispatch = useDispatch();
  const naturalLanguageProcessor = new RemoteNaturalLanguageProcessor();

  function Placeholder(): JSX.Element {
    return <div className={styles["editor-placeholder"]}>Enter some plain text...</div>;
  }
  
  const onChange = function (editorState: EditorState): void {
    editorState.read(() => {
      const jsonObject = JSON.parse(JSON.stringify(editorState));
      const editorLines: string[] = parse(jsonObject);
      if (editorLines.length > 0) {
        naturalLanguageProcessor.entityExtraction(editorLines).then((graphEditorState) => {
          dispatch({ type: UPDATE_GRAPH, payload: graphEditorState });
        });
      }
    });
  }



  return (
    <LexicalComposer initialConfig={lexicalEditorConfig}>
      <div className={styles["editor-container"]}>
        <PlainTextPlugin
          contentEditable={<ContentEditable className={styles["editor-input"]} />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <OnChangePlugin onChange={onChange}/>
      </div>
    </LexicalComposer>
  );
}
