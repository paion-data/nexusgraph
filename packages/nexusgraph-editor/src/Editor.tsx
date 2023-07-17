/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { LexicalEditor } from "./Lexical";
import editorConfig from "./Lexical/LexicalEditorConfig";

export default function Editor(): JSX.Element {
  return <LexicalEditor lexicalEditorConfig={editorConfig} />;
}
