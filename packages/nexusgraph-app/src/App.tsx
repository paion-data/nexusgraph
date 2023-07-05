/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { Editor } from "../../nexusgraph-editor";
import { GraphBrowser } from "../../nexusgraph-graph";
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
