// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import Editor from "./Editor";
import { StyledEditorContainer } from "./styles/EditorContainer.styled";
import { StyledDrawer } from "browser-components/TabNavigation/styled";
import DBMSInfo from "../DBMSInfo/DBMSInfo";

export function EditorContainer(): JSX.Element {
  return (
    <StyledDrawer>
      <h1>Editor</h1>
      <StyledEditorContainer>
        <Editor />
      </StyledEditorContainer>
      <DBMSInfo />
    </StyledDrawer>
  )
}
