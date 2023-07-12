// Copyright 2023 Paion Data. All rights reserved.
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { RemoteNaturalLanguageProcessor } from "../processor/RemoteNaturalLanguageProcessor";
import { useDispatch } from "react-redux";
import { GraphEditorState, UPDATE_GRAPH } from "../../../../nexusgraph-graph/src/shared/editor/editorDuck";
import { TextNode } from "lexical";

const NON_EXISTING_PREVIOUS_LINE = "";

function shouldFireRequest(previousLine: string | null, currentLine: string): boolean {
  return previousLine != NON_EXISTING_PREVIOUS_LINE && currentLine.length == 1;
}

function getPreviousLineOrEmpty(currentLine: TextNode): string {
  /* eslint-disable @typescript-eslint/ban-ts-comment */
  if (currentLine.getParent() != null) {
    // @ts-ignore: Object is possibly 'null'.
    if (currentLine.getParent().getPreviousSibling() != null) {
      // @ts-ignore: Object is possibly 'null'.
      return currentLine.getParent().getPreviousSibling().getTextContent();
    }
  }
  /* eslint-enable @typescript-eslint/ban-ts-comment */

  return NON_EXISTING_PREVIOUS_LINE;
}

function onChange(editor: any, naturalLanguageProcessor: any, dispatch: any) {
  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(TextNode, (node: TextNode) => {
      const currentLine: string = node.getTextContent();
      const previousLine: string = getPreviousLineOrEmpty(node);

      if (shouldFireRequest(previousLine, currentLine)) {
        const editorLines: string[] = [previousLine];
        if (editorLines.length > 0) {
          naturalLanguageProcessor.entityExtraction(editorLines).then((graphEditorState: GraphEditorState) => {
            dispatch({ type: UPDATE_GRAPH, payload: graphEditorState });
          });
        }
      }
    });
    return () => {
      removeTransform();
    };
  }, [editor]);
}

/**
 * {@link NexusgraphOnChangePlugin} implements the real-time capturing of editor content.
 *
 * When user enters arbitrary text into the Editor, the
 * [side effect](https://react.dev/reference/react/useEffect) of this component gets
 * immediately triggered.
 *
 * @returns a standar lexical plugin
 */
export default function NexusgraphOnChangePlugin(): null {
  const dispatch = useDispatch();
  const [editor] = useLexicalComposerContext();
  const naturalLanguageProcessor = new RemoteNaturalLanguageProcessor();

  onChange(editor, naturalLanguageProcessor, dispatch);

  return null;
}
