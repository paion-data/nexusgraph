// Copyright 2023 Paion Data. All rights reserved.
import type {EditorState, LexicalEditor} from 'lexical';

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import useLayoutEffect from './useLayoutEffect.ts';

export function OnChangePlugin({
  ignoreHistoryMergeTagChange = true,
  ignoreSelectionChange = false,
  updateGraph,
  onChange,
}: {
  ignoreHistoryMergeTagChange?: boolean;
  ignoreSelectionChange?: boolean;
  updateGraph: (graphData: any) => void
  onChange: (
    editorState: EditorState,
    updateGraph: (graphData: any) => void,
    editor: LexicalEditor,
    tags: Set<string>
  ) => void;
}): null {
  const [editor] = useLexicalComposerContext();

  useLayoutEffect((): any => {
    if (onChange) {
      return editor.registerUpdateListener(
        ({editorState, dirtyElements, dirtyLeaves, prevEditorState, tags}) => {
          if (
            (ignoreSelectionChange &&
              dirtyElements.size === 0 &&
              dirtyLeaves.size === 0) ||
            (ignoreHistoryMergeTagChange && tags.has('history-merge')) ||
            prevEditorState.isEmpty()
          ) {
            return;
          }

          onChange(editorState, updateGraph, editor, tags);
        },
      );
    }
  }, [editor, ignoreHistoryMergeTagChange, ignoreSelectionChange, onChange]);

  return null;
}
