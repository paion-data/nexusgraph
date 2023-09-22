// Copyright 2023 Paion Data. All rights reserved.
import LexicalEditor from "./Lexical/LexicalEditor";
import NoteTitleInput from "./NoteTitleInput";

export default function Editor(): JSX.Element {
  return (
    <>
      <NoteTitleInput />
      <LexicalEditor />
    </>
  );
}
