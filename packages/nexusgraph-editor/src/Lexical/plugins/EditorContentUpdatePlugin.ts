/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CommandPayloadType, createCommand, EditorState, LexicalEditor } from "lexical";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { GlobalState } from "../../../../nexusgraph-redux";

type Props = Readonly<{
  onClear?: () => void;
}>;

export default function EditorContentUpdatePlugin({ onClear }: Props): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const editorReduxState = useSelector((state: GlobalState) => state.note.editorContent as EditorState);

  const EDITOR_CONTENT_UPDATE = createCommand<any>();

  function handleMyCommand(editor: LexicalEditor, payload: CommandPayloadType<typeof EDITOR_CONTENT_UPDATE>) {
    const newState = editor.parseEditorState(
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"china","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
      // JSON.stringify(editorReduxState),
    );
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
  }, []);

  return null;
}
