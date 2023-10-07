// Copyright 2023 Paion Data. All rights reserved.
import { GraphBrowser } from "../../nexusgraph-graph";
import logo from "../public/logo.svg";
import useAstraiosClientHook from "./AstraiosClientHook";
import NoteTitleInput from "./note-title-input/NoteTitleInput";
import useReduxHook from "./ReduxHook";
import { AppBody, AppCaption, AppHeader, AppWrapper, GraphBrowserWrapper, IconWapper, Sidebar } from "./styled";

/**
 * The component that defines the entire nexus graph app.
 *
 * @returns a React DOM object
 */
export default function App(): JSX.Element {
  useReduxHook();
  useAstraiosClientHook();

  return (
    <AppWrapper>
      <AppHeader>
        <IconWapper>
          <img src={logo} alt="Logo" />
        </IconWapper>
        <AppCaption>Nexus Graph</AppCaption>
      </AppHeader>
      <AppBody>
        <Sidebar />
        <GraphBrowserWrapper id="graphBrowser">
          <NoteTitleInput />
          <GraphBrowser />
        </GraphBrowserWrapper>
      </AppBody>
    </AppWrapper>
  );
}
