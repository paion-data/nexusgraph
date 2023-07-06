import { GraphEditorState } from "../../../../nexusgraph-graph";
export interface NaturalLanguageProcessor {
  /**
   * Given an array of editor lines, this method performs entity extration on them and converts the extracted entities
   * to the format of {@link GraphEditorState}.
   *
   * @param editorLines   The specified editor contents to perform entity extration
   */
  entityExtraction(editorLines: string[]): GraphEditorState;
}
