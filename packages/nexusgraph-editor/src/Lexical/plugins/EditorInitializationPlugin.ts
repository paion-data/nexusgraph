// Copyright 2023 Paion Data. All rights reserved.
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CommandPayloadType, createCommand, LexicalEditor } from "lexical";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { GlobalState } from "../../../../nexusgraph-redux";

export default function EditorInitializationPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const editorReduxState: string = useSelector((state: GlobalState) => JSON.stringify(state.note.editorContent));

  const EDITOR_CONTENT_UPDATE = createCommand<any>();

  function updateEditorState(editor: LexicalEditor, payload: CommandPayloadType<typeof EDITOR_CONTENT_UPDATE>) {
    const newState = editor.parseEditorState(JSON.parse(editorReduxState));
    editor.setEditorState(newState);
  }

  useEffect(() => {
    editor.registerCommand(
      EDITOR_CONTENT_UPDATE,
      (payload) => {
        updateEditorState(editor, payload);
        return true;
      },
      0
    );
    editor.dispatchCommand(EDITOR_CONTENT_UPDATE, undefined);
  }, []);

  return null;
}
