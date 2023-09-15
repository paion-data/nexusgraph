// Copyright 2023 Paion Data. All rights reserved.

import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";

import { EditorState } from "lexical";
import { useSelector } from "react-redux";
import { GlobalState } from "../../../nexusgraph-redux";
import styles from "./LexicalEditor.module.css";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import OnChangePlugin from "./plugins/NexusgraphOnChangePlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { Paragraph } from "./plugins/ToolbarPlugin/styled";
import ExampleTheme from "./themes/ExampleTheme";

export default function LexicalEditor(): JSX.Element {
  const editor = useSelector((state: GlobalState) => state.note.editorContent as EditorState);

  const editorConfig: InitialConfigType = {
    editorState: JSON.stringify(editor),
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

  // editorConfig.editorState =  JSON.stringify(editor)
  console.log("editorConfig.editorState ", editorConfig.editorState);

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
