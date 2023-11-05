// Copyright 2023 Paion Data. All rights reserved.
import { useState } from "react";
import { GraphBrowser } from "../../nexusgraph-graph";
import logo from "../public/logo.svg";
import user from "../public/user.svg";
import Alert from "./component/Alert";
import GraphNameInput from "./component/GraphNameInput";
import CreateButton from "./component/sidebar/CreateButton";
import {
  AppHeader,
  AppLogo,
  AppName,
  Sidebar,
  StyledApp,
  StyledBody,
  StyledFooter,
  StyledGraphBrowser,
  StyledGraphTitle,
  UserIcon,
} from "./styled";

/**
 * The component that defines the entire nexus graph app.
 *
 * @returns a React DOM object
 */
export default function App(): JSX.Element {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <StyledApp>
      <AppHeader>
        <UserIcon>
          <img src={user} alt="User" />
        </UserIcon>
        <StyledGraphTitle>
          <GraphNameInput />
          {/* <ExportButton /> */}
        </StyledGraphTitle>
      </AppHeader>

      <StyledBody>
        <Sidebar>
          <CreateButton setShowAlert={setShowAlert} />
        </Sidebar>
        <StyledGraphBrowser id="graphBrowser">
          <Alert showAlert={showAlert} setShowAlert={setShowAlert} />
          <GraphBrowser />
        </StyledGraphBrowser>
      </StyledBody>

      <StyledFooter>
        <AppLogo>
          <img src={logo} alt="Logo" />
        </AppLogo>
        <AppName>Nexus Graph</AppName>
      </StyledFooter>
    </StyledApp>
  );
}
