/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import React from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import OnChangePlugin from "./plugins/Messier61OnChangePlugin";

import styles from "./LexicalEditor.module.css";

export default function LexicalEditor({
  lexicalEditorConfig,
  transformer,
  exporter,
}: {
  lexicalEditorConfig: any;
  transformer: (editorContentLines: string[]) => any;
  exporter: (exportLocation: any) => void;
}): JSX.Element {
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
        <OnChangePlugin transformer={transformer} exporter={exporter} />
      </div>
    </LexicalComposer>
  );
}

function Placeholder(): JSX.Element {
  return <div className={styles["editor-placeholder"]}>Enter some plain text...</div>;
}
