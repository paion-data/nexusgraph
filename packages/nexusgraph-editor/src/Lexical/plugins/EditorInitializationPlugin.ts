// Copyright 2023 Paion Data. All rights reserved.
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { container, TYPES } from "../../../../nexusgraph-app/inversify.config";
import { AstraiosClient } from "../../../../nexusgraph-astraios";
import { GlobalState, initialEditorContent } from "../../../../nexusgraph-redux";

export default function EditorInitializationPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  const userId = useSelector((state: GlobalState) => state.oAuth.userInfo["sub"]);

  const astraiosClient: AstraiosClient = container.get<AstraiosClient>(TYPES.AstraiosClient);

  useEffect(() => {
    getFirstNoteContent().then((editorContent) => {
      if (editorContent != initialEditorContent) {
        const newState = editor.parseEditorState(JSON.stringify(editorContent));
        editor.setEditorState(newState);
      }
    });
  }, []);

  function getFirstNoteContent(): Promise<Record<any, any>> {
    return astraiosClient.getNoteList(userId).then((noteList) => {
      if (noteList[0]) {
        return astraiosClient.getFirstNote(noteList[0].id).then((firstNote) => {
          return JSON.parse(firstNote.editorContent);
        });
      }
      return initialEditorContent as Record<any, any>;
    });
  }

  return null;
}
