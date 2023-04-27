// Copyright 2023 Paion Data. All rights reserved.
import ExampleTheme from "./ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import React, { useCallback } from "react";
import { $getRoot, $getSelection, EditorState } from 'lexical';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { addEditorNodeAndRel } from "./AddEditorNodesAndRels";
import { addNodesAndRels } from "shared/modules/graphEditor/graphEditorDuck";
import { withBus } from "react-suber";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { InputContainer, PlaceholderContainer } from "./styles/EditorContainer.styled";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";

export type EditorProps = {
  updateGraph: (graphData: any) => void
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  namespace: 'MyEditor',

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

function Editor(props: EditorProps): JSX.Element {
  const onChange = function (editorState: EditorState): void {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();

      addEditorNodeAndRel(editorState)

      props.updateGraph(addEditorNodeAndRel(editorState))
    })
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <InputContainer>
                <ContentEditable style={{ outline: 0 }} className="editor-input" />
              </InputContainer>
            }
            placeholder={
              <PlaceholderContainer>
                <Placeholder />
              </PlaceholderContainer>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          {/* <OnChangePlugin updateGraph={props.updateGraph} onChange={onChange2} /> */}
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  updateGraph: (graphData: any) => {
    dispatch(addNodesAndRels(graphData))
  }
})

export default withBus(
  connect(null, mapDispatchToProps)(Editor)
)
