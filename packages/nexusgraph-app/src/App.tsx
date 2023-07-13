// Copyright 2023 Paion Data. All rights reserved.
import { Editor } from "../../nexusgraph-editor";
import { GraphBrowser } from "../../nexusgraph-graph";
import { AppWrapper, EditorCaption, EditorWrapper, EditorGlassCover, GraphBrowserWrapper, IconWapper } from "./styled";
/**
 * The component that defines the entire nexus graph app.
 *
 * @returns
 */
export default function App(): JSX.Element {
  return (
    <AppWrapper>
      <EditorWrapper>
        <EditorGlassCover>
          <IconWapper>
            <img className="img" src={require("../public/app-logo.png")} alt="error" width={150} height={150} />
          </IconWapper>
          <EditorCaption className="h1">NexusGraph</EditorCaption>
          <Editor />
        </EditorGlassCover>
      </EditorWrapper>
      <GraphBrowserWrapper>
        <GraphBrowser />
      </GraphBrowserWrapper>
    </AppWrapper>
  );
}
