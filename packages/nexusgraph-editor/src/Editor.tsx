/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import LexicalEditor from "./Lexical/LexicalEditor";
import { EditorButtonGroup } from "./editor-button-group/EditorButtonGroup";

export default function Editor(): JSX.Element {
  return (
    <>
      <EditorButtonGroup></EditorButtonGroup>
      <LexicalEditor />
    </>
  );
}
