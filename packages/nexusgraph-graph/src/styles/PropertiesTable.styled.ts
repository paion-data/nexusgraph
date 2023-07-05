// Copyright 2023 Paion Data. All rights reserved.
import styled from "styled-components";

export const panelMinWidth = 200;

export const AlternatingTable = styled.table`
  tr:nth-child(even) {
    background: ${(props) => props.theme.alteringTableRowBackground};
  }
  tr:nth-child(odd) {
    background: ${(props) => props.theme.editorBackground};
  }
  font-size: 13px;
  width: 100%;
`;

export const CopyCell = styled.td`
  padding: 2px 5px;
  display: flex;
  justify-content: flex-end;
`;

export const KeyCell = styled.td`
  font-weight: 700;
  vertical-align: top;
  padding: 2px;
  width: 30%;
`;

export const PaneTitle = styled.div`
  margin-bottom: 10px;
`;

export const PaneHeader = styled.div`
  font-size: 16px;
  margin-top: 10px;
  flex: 0 0 auto;
`;

export const StyledExpandValueButton = styled.button`
  border: none;
  outline: none;
  background-color: inherit;
  color: ${(props) => props.theme.link};
`;

export const StyledInlineList = styled.ul`
  list-style: none;
  word-break: break-word;
`;

export const StyledNodeInspectorContainer = styled.div<{
  width: number;
  shouldAnimate: boolean;
}>`
  position: absolute;
  right: 0;
  top: 3px;
  z-index: 1;
  width: ${(props) => props.width}px;
  ${(props) => props.shouldAnimate && "transition: 0.2s ease-out;"}
  max-width: 95%;
  height: 100%;
  background: ${(props) => props.theme.editorBackground};
  color: ${(props) => props.theme.primaryText};
  font-family: ${(props) => props.theme.drawerHeaderFontFamily};
  box-shadow: ${(props) => props.theme.standardShadow};
`;

export const ValueCell = styled.td`
  padding: 2px;
  white-space: pre-wrap;
  vertical-align: top;
`;
