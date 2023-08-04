// Copyright 2023 Paion Data. All rights reserved.

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";

import styles from "./LexicalEditor.module.css";
import { Paragraph } from "./plugins/styled";
import { CustomQuoteNode } from "./plugins/nodes/CustomQuoteNode";
import ExampleTheme from "./themes/ExampleTheme";
import OnChangePlugin from "./plugins/NexusgraphOnChangePlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";

export const editorConfig = {
  // The editor theme
  namespace: "editor",
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
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    CodeNode,
    CodeHighlightNode,
    CustomQuoteNode,
    {
      replace: QuoteNode,
      with: () => {
        return new CustomQuoteNode();
      },
    },
  ],
};

export default function LexicalEditor(): JSX.Element {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={styles["editor-container"]}>
        <ToolbarPlugin />
        <Paragraph>
          <RichTextPlugin
            contentEditable={<ContentEditable className={styles["editor-input"]} />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <OnChangePlugin />
          <ListPlugin />
          <LinkPlugin />
        </Paragraph>
      </div>
    </LexicalComposer>
  );
}

function Placeholder(): JSX.Element {
  return <div className={styles["editor-placeholder"]}>请输入文本......</div>;
}
