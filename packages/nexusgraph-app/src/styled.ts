// Copyright 2023 Paion Data. All rights reserved.
import styled from "styled-components";

const LEFT_MARGIN_ALIGNMENT = "1.5vh";

export const StyledApp = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#f7b5ce, #94ddca);
  display: flex;
  flex-direction: column;
`;

export const StyledHeader = styled.div`
  order: 1;
  display: flex;
  flex-direction: row;

  margin: 2vh ${LEFT_MARGIN_ALIGNMENT} 2vh 1.5vh;

  height: 2vh;
`;

export const StyledBody = styled.div`
  order: 2;
  display: flex;
  flex-direction: row;

  margin: 3vh ${LEFT_MARGIN_ALIGNMENT} 2vh 1.5vh;

  height: 95vh;
`;

export const StyledFooter = styled.div`
  order: 3;
  display: flex;
  flex-direction: row;
  margin: 2vh ${LEFT_MARGIN_ALIGNMENT} 1.5vh 1.5vh;

  height: 6vh;
`;

export const StyledUserIcon = styled.div`
  flex-shrink: 1;
  order: 1;
  display: flex;

  height: 5vh;
`;

export const StyledGraphTitle = styled.div`
  flex-shrink: 1;
  order: 2;
  display: flex;
  height: 6vh;

  padding-left: 45%;
  padding-right: 50%;
`;

export const StyledSidebar = styled.div`
  flex-shrink: 1;
  aspect-ratio: 1 / 1.618;
  height: 30vw;
  min-width: 110px;

  margin-right: 0.75vw;
  border-radius: 1rem;
  border-style: solid;
  border-width: 3px;
  border-color: #fff;
  background-color: transparent;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
`;

export const StyledGraphBrowser = styled.div`
  flex-shrink: 1;
  aspect-ratio: 1.618;
  margin-left: 0.75vw;
  background-color: transparent;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  border-style: solid;
  border-width: 3px;
  border-color: #fff;
  overflow: hidden;
`;

export const StyledAppLogo = styled.div`
  flex-shrink: 1;
  order: 1;
  display: flex;

  height: 5vh;
`;

export const StyledAppName = styled.div`
  flex-shrink: 1;
  order: 2;
  display: flex;

  padding-left: 1vh;

  height: 5vh;

  white-space: pre;
  font-size: 3vh;
  font-weight: bold;
  color: #fff;
  display: inline-flex;
`;

export const StyledSpinner = styled.div`
  position: absolute;
  left: 50%;
  margin-left: -60px;
  top: 50%;
  margin-top: -60px;
  border: 16px solid pink;
  border-top: 16px deeppink solid;
  border-radius: 50%;
  height: 120px;
  width: 120px;

  border-color: transparent #ffbfcb #ffbfcb;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
