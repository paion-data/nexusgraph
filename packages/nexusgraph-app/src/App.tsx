// Copyright 2023 Paion Data. All rights reserved.
import { Editor } from "../../nexusgraph-editor";
import { GraphBrowser } from "../../nexusgraph-graph";
import { OAuth2 } from "../../nexusgraph-oauth2/src/useOAuth2";
import logo from "../public/app-logo.svg";
import { EditorButtonGroup } from "./editor-button-group/EditorButtonGroup";
import useReduxHook from "./ReduxHook";
import { AppWrapper, EditorCaption, EditorGlassCover, EditorWrapper, GraphBrowserWrapper, IconWapper } from "./styled";

export interface AppProps {
  oauthContext: OAuth2;
}

/**
 * The component that defines the entire nexus graph app.
 *
 * @returns a React DOM object
 */
export default function App(props: AppProps): JSX.Element {
  useReduxHook();

  return (
    <AppWrapper>
      <EditorWrapper>
        <EditorGlassCover>
          <IconWapper>
            <img src={logo} alt="Logo" />
          </IconWapper>
          <EditorCaption className="h1">Nexus Graph</EditorCaption>
          <EditorButtonGroup />
          <Editor />
        </EditorGlassCover>
      </EditorWrapper>
      <GraphBrowserWrapper>
        <GraphBrowser />
      </GraphBrowserWrapper>
    </AppWrapper>
  );
}
