// Copyright 2023 Paion Data. All rights reserved.
import styled from "styled-components";

export const AppWrapper = styled.div`
  position: flex;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#f7b5ce, #94ddca);
  display: flex;
  flex-direction: column;
`;

export const AppHeader = styled.div`
  order: 1;
  display: flex;
  flex-direction: row;
  height: 100px;
  padding: 1.5% 1.5% 0% 1.5%;
`;

export const AppBody = styled.div`
  order: 2;
  display: flex;
  flex-direction: row;
  height: 85vh;
  padding: 1.5%;
`;

export const AppCaption = styled.div`
  margin: 20px 0% 0% 30px;
  flex-shrink: 1;
  width: 100px;
  height: 60px;
  white-space: pre;
  font-size: 41px;
  font-weight: bold;
  color: #fff;
  display: inline-flex;
`;

export const GraphBrowserWrapper = styled.div`
  flex-shrink: 1;
  width: 80%;
  height: 100%;
  margin-left: 1%;
  background-color: transparent;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  border-style: solid;
  border-width: 3px;
  border-color: #fff;
  overflow: hidden;
`;

export const IconWapper = styled.div`
  width: 100px;
  height: 100%;
`;

export const Sidebar = styled.div`
  flex-shrink: 1;
  width: 20%;
  height: 100%;
  margin-right: 1%;
  border-radius: 1rem;
  border-style: solid;
  border-width: 3px;
  border-color: #fff;
  background-color: transparent;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
`;
