/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { Editor } from "../../messier-61-editor";
import { GraphBrowser } from "../../messier-61-graph";
import { AppWrapper, EditorCaption, EditorWrapper, GraphBrowserWrapper } from "./styled";

export default function App(): JSX.Element {
  return (
    <AppWrapper>
      <EditorWrapper>
        <EditorCaption>
          <h1>Editor</h1>
        </EditorCaption>
        <Editor />
      </EditorWrapper>
      <GraphBrowserWrapper>
        <GraphBrowser />
      </GraphBrowserWrapper>
    </AppWrapper>
  );
}
