// Copyright 2023 Paion Data. All rights reserved.
import EditorTheme from "./EditorTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import React from "react";
import { EditorState } from 'lexical';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { getEditorNodesAndRels } from "./AddEditorNodesAndRels";
import { GraphEditorState, getEditorAction } from "shared/modules/graphEditor/graphEditorDuck";
import { withBus } from "react-suber";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { InputContainer, PlaceholderContainer } from "./styles/EditorContainer.styled";

export interface EditorProps {
  updateGraph: (graphData: GraphEditorState) => void
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  namespace: 'MyEditor',
  theme: EditorTheme,
  onError(error: any) {
    throw error;
  },
  nodes: [
    ListNode,
    ListItemNode,
    LinkNode
  ]
};

export function Editor(props: EditorProps): JSX.Element {
  const onChange = function (editorState: EditorState): void {
    editorState.read(() => {
      props.updateGraph(getEditorNodesAndRels(editorState))
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
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  updateGraph: (graphData: GraphEditorState) => {
    dispatch(getEditorAction(graphData))
  }
})

export default withBus(
  connect(null, mapDispatchToProps)(Editor)
)
