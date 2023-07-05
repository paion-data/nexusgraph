// Copyright 2023 Paion Data. All rights reserved.
import styled from "styled-components";

export const AppWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export const GraphBrowserWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 64.5vw;
  height: 99.3vh;
  background: rgba(198, 216, 239, 0.2);
  border-radius: 1rem;
  border-style: solid;
  border-width: 2px;
  border-color: rgba(175, 195, 219, 0.8);
`;

export const EditorWrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 35%;
  height: 100vh;
  background-color: #31333b;
  border-radius: 1rem;
`;

export const EditorCaption = styled.div`
  position: relative;
  left: 5%;
  top: 0px;
  width: 100px;
  height: 60px;
  font-size: 26px;
  color: #fff;
`;
