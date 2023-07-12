/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import React from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import styles from "./LexicalEditor.module.css";
import { RemoteNaturalLanguageProcessor } from "./processor/RemoteNaturalLanguageProcessor";
import { EditorState } from "lexical";
import { useDispatch } from "react-redux";
import { UPDATE_GRAPH } from "../../../nexusgraph-graph/src/shared/editor/editorDuck";
import parse from "./parser/RawTextParser";

import ExampleTheme from "./themes/ExampleTheme";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";

const editorConfig = {
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error: any) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode
  ]
};

function Placeholder(): JSX.Element {
  return <div className={styles["editor-placeholder"]}>Enter some plain text...</div>;
}

export default function LexicalEditor(): JSX.Element {

  const dispatch = useDispatch();
  const naturalLanguageProcessor = new RemoteNaturalLanguageProcessor();

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
    <LexicalComposer initialConfig={editorConfig}>
      <div className={styles["editor-container"]}>
        <ToolbarPlugin />
        <RichTextPlugin
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
