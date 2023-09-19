/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CommandPayloadType, createCommand, LexicalEditor } from "lexical";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { GlobalState } from "../../../../nexusgraph-redux";

type Props = Readonly<{
  onClear?: () => void;
}>;

export default function EditorContentUpdatePlugin({ onClear }: Props): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const editorReduxState: string = useSelector((state: GlobalState) => JSON.stringify(state.note.editorContent));

  const EDITOR_CONTENT_UPDATE = createCommand<any>();

  function handleMyCommand(editor: LexicalEditor, payload: CommandPayloadType<typeof EDITOR_CONTENT_UPDATE>) {
    const newState = editor.parseEditorState(JSON.parse(editorReduxState));
    editor.setEditorState(newState);
  }

  useEffect(() => {
    editor.registerCommand(
      EDITOR_CONTENT_UPDATE,
      (payload) => {
        handleMyCommand(editor, payload);
        return true;
      },
      0
    );
    editor.dispatchCommand(EDITOR_CONTENT_UPDATE, undefined);
  }, [editorReduxState]);

  return null;
}
