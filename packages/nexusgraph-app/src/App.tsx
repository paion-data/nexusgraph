// Copyright 2023 Paion Data. All rights reserved.
import { Editor } from "../../nexusgraph-editor";
import { GraphBrowser } from "../../nexusgraph-graph";
import { AppWrapper, EditorCaption, EditorWrapper, GraphBrowserWrapper } from "./styled";

/**
 * The component that defines the entire nexus graph app.
 *
 * @returns
 */
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
