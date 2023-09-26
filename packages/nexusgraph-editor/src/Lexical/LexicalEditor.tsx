// Copyright 2023 Paion Data. All rights reserved.
import { CodeHighlightNode, CodeNode } from "@paiondata/lexical-code";
import { AutoLinkNode, LinkNode } from "@paiondata/lexical-link";
import { ListItemNode, ListNode } from "@paiondata/lexical-list";
import { AutoFocusPlugin } from "@paiondata/lexical-react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@paiondata/lexical-react/LexicalCheckListPlugin";
import { InitialConfigType, LexicalComposer } from "@paiondata/lexical-react/LexicalComposer";
import { ContentEditable } from "@paiondata/lexical-react/LexicalContentEditable";
import LexicalErrorBoundary from "@paiondata/lexical-react/LexicalErrorBoundary";
import { HistoryPlugin } from "@paiondata/lexical-react/LexicalHistoryPlugin";
import { LinkPlugin } from "@paiondata/lexical-react/LexicalLinkPlugin";
import { ListPlugin } from "@paiondata/lexical-react/LexicalListPlugin";
import { RichTextPlugin } from "@paiondata/lexical-react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@paiondata/lexical-rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@paiondata/lexical-table";

import styles from "./LexicalEditor.module.css";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import EditorContentUpdatePlugin from "./plugins/EditorContentUpdatePlugin";
import OnChangePlugin from "./plugins/NexusgraphOnChangePlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { Paragraph } from "./plugins/ToolbarPlugin/styled";
import ExampleTheme from "./themes/ExampleTheme";

export default function LexicalEditor(): JSX.Element {
  const editorConfig: InitialConfigType = {
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
    ],
  };

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
          <CheckListPlugin />
          <CodeHighlightPlugin />
          <OnChangePlugin />
          <EditorContentUpdatePlugin />
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
