// Copyright 2023 Paion Data. All rights reserved.
import React from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import NexusgraphOnChangePlugin from "./plugins/NexusgraphOnChangePlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import styles from "./LexicalEditor.module.css";

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
    LinkNode,
  ],
};

function Placeholder(): JSX.Element {
  return <div className={styles["editor-placeholder"]}>Enter some plain text...</div>;
}

export default function LexicalEditor(): JSX.Element {
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
        <NexusgraphOnChangePlugin />
        {/* <OnChangePlugin onChange={onChange}/> */}
      </div>
    </LexicalComposer>
  );
}
