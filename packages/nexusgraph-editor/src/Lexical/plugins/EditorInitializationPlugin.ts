// Copyright 2023 Paion Data. All rights reserved.
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { container, TYPES } from "../../../../nexusgraph-app/inversify.config";
import { AstraiosClient } from "../../../../nexusgraph-astraios";
import { initialEditorContent, selectNote, selectOAuth } from "../../../../nexusgraph-redux";

export default function EditorInitializationPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  const userId = selectOAuth().userInfo["sub"];

  const astraiosClient: AstraiosClient = container.get<AstraiosClient>(TYPES.AstraiosClient);

  useEffect(() => {
    getFirstNoteContent().then((editorContent) => {
      if (editorContent != initialEditorContent) {
        const newState = editor.parseEditorState(JSON.stringify(editorContent));
        editor.setEditorState(newState);
      }
    });
  }, []);

  const note = selectNote();
  useEffect(() => {
    const newState = editor.parseEditorState(JSON.stringify(note.editorContent));
    editor.setEditorState(newState);
  }, [note.id]);

  function getFirstNoteContent(): Promise<Record<any, any>> {
    return astraiosClient.getNoteList(userId).then((noteList) => {
      if (noteList[0]) {
        return astraiosClient.getNoteById(noteList[0].id).then((firstNote) => {
          return JSON.parse(firstNote.editorContent);
        });
      }
      return initialEditorContent as Record<any, any>;
    });
  }

  return null;
}
