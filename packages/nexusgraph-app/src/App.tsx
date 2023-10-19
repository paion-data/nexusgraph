// Copyright 2023 Paion Data. All rights reserved.
import { useState } from "react";
import { GraphBrowser } from "../../nexusgraph-graph";
import { t } from "../../nexusgraph-i18n";
import logo from "../public/logo.svg";
import Alert from "./component/Alert";
import NoteTitleInput from "./note-title-input/NoteTitleInput";
import useReduxHook from "./ReduxHook";
import CreateButton from "./sidebar/CreateButton";
import { AppBody, AppCaption, AppHeader, AppWrapper, GraphBrowserWrapper, IconWapper, Sidebar } from "./styled";

/**
 * The component that defines the entire nexus graph app.
 *
 * @returns a React DOM object
 */
export default function App(): JSX.Element {
  useReduxHook();
  // useAstraiosClientHook();

  const [showAlert, setShowAlert] = useState(false);
  const alertContent = t("alertContent");

  return (
    <AppWrapper>
      <AppHeader>
        <IconWapper>
          <img src={logo} alt="Logo" />
        </IconWapper>
        <AppCaption>Nexus Graph</AppCaption>
      </AppHeader>
      <AppBody>
        <Sidebar>
          <CreateButton setShowAlert={setShowAlert} />
        </Sidebar>
        <GraphBrowserWrapper id="graphBrowser">
          <Alert showAlert={showAlert} setShowAlert={setShowAlert} alertContent={alertContent} x={"5vw"} y={"10vh"} />
          <NoteTitleInput />
          <GraphBrowser />
        </GraphBrowserWrapper>
      </AppBody>
    </AppWrapper>
  );
}
