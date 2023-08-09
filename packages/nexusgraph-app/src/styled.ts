// Copyright 2023 Paion Data. All rights reserved.
import styled from "styled-components";

export const AppWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: rgb(55, 59, 61);
`;

export const GraphBrowserWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 62vw;
  height: 94vh;
  margin: 1.5%;
  background-color: transparent;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  border-style: solid;
  border-width: 5px;
  border-color: rgba(108, 216, 248, 0.3);
  box-shadow: inset 8px 5px 20px rgba(137, 225, 252, 0.6);
`;

export const EditorWrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 33%;
  height: 94%;
  margin: 1.5% 1% 1.5% 1.5%;
  border-radius: 1rem;
  border-style: solid;
  border-width: 5px;
  border-color: rgba(108, 216, 248, 0.3);
  background-color: transparent;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  box-shadow: inset 10px 5px 20px rgba(137, 225, 252, 0.6);
`;

export const EditorCaption = styled.div`
  position: relative;
  left: 7%;
  top: 0px;
  width: 100px;
  height: 60px;
  white-space: pre;
  font-size: 41px;
  font-weight: bold;
  color: #fff;
  text-shadow: 1px 1px 2px #237295, 0 0 1em #34c7f4, 0 0 0.2em #34c7f4;
  display: inline-block;
`;

export const IconWapper = styled.span`
  position: relative;
  left: 3%;
  top: 20px;
`;

export const EditorGlassCover = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  overflow: hidden;
`;
