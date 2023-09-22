// Copyright 2023 Paion Data. All rights reserved.
import styled from "styled-components";

export const EditorMenuExpandButton = styled.button<{
  menuExpanded: boolean;
}>`
  background-color: transparent;
  border: none;
  box-shadow: inset 2px 2px 5px #fff;
  cursor: pointer;
  position: absolute;
  left: 0px;
  top: 15%;
  z-index: 2;
  width: 25px;
  height: 30px;
  text-align: center;
  ${(props) =>
    !props.menuExpanded &&
    `background: ${props.theme.editorBackground};
       box-shadow: ${props.theme.standardShadow};
       & svg {
        position: absolute;
        top: 2px;
        left: 0px;
        margin:1px;
      }
    `}
  ${(props) =>
    props.menuExpanded &&
    `background-color: transparent;
      border: none;
      box-shadow: inset 2px 2px 5px #fff;
      width: 5%;
      height: 30px;
      & svg {
        position: absolute;
        top: 2px;
        left: 0px;
        margin: 1px 20% 1px 20%;
      }
      `}
  color: #fff;
`;

export const EditorMenuContainer = styled.div<{
  paneWidth: string;
  shouldAnimate: boolean;
}>`
  position: absolute;
  left: 0px;
  top: 15%;
  box-shadow: inset 2px 2px 5px #fff;
  bottom: 8px;
  z-index: 1;
  width: ${(props) => props.paneWidth};
  height: 82%;
  ${(props) => props.shouldAnimate && "transition: 0.2s ease-out;"}
  background: rgba(180, 180, 180, 0.1);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-style: solid;
  border-width: 1px;
  border-color: rgba(108, 216, 248, 0.5);
  box-shadow: ${(props) => props.theme.standardShadow};
  overflow: hidden;
  & button {
    display: flex;
    width: 50%;
    height: 50%;
    overflow: hidden;
    background: transparent;
    border: none;
    color: #FFF;
    padding: 0px;
    margin: 20px 23%;
    &:hover {
      box-shadow: inset 10px 5px 20px rgba(137, 225, 252, 0.3);
    }
  }

  & .bottomButton {
    position: absolute;
    left: 8%;
    bottom: 5%; 
  }

  & svg {
    width: 90%;
    margin: 1px;
  }

  & .plus {
    background: rgba(108, 216, 248, 0.5);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    margin: 50px 12% 20px 12%;
    width: 72%;
    height: 72%;
    stroke: #FFF;
    stroke-width: 2px;   
    & svg {
      width: 80%;
      margin: 3px;
    }
  }
  }

  ${(props) =>
    props.paneWidth !== "0%" &&
    `overflow: visible;

    & .squares {
      &:focus {
        > ul li {
          display: flex;
          flex-direction: column;
          position: absolute;
          left: 10%;
          top: 0%;
          width: 100px;
          height: 100%;
          color: #fff;
          box-shadow: inset 2px 2px 5px #fff;
          background: rgba(180, 180, 180, 0.8);
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
          overflow: scroll;
        }
      }
    }
      `}
  }
`;

export const DirectoryDropdownList = styled.ul`
  display: flex;
  position: absolute;
  background-color: ${(props) => props.theme.secondaryBackground};
  top: 0%;
  left: 100%;
  margin: 0;
  height: 99%;
  width: 0px;
`;

export const DirectoryDropdownContent = styled.li`
  display: none;
  position: absolute;
  right: 0px;
  background-color: ${(props) => props.theme.secondaryBackground};
  color: ${(props) => props.theme.secondaryButtonText};
  width: 135px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  z-index: 2;
  text-align: left;
  line-height: 30px;
  padding: 5px 0;
`;

export const DropdownItem = styled.a`
  background-color: ${(props) => props.theme.secondaryBackground};
  color: ${(props) => props.theme.secondaryButtonText};
  width: 100%;
  display: inline-block;
  padding: 0 10px;
  &:hover {
    color: ${(props) => props.theme.secondaryButtonTextHover};
    text-decoration: none;
    background-color: ${(props) => props.theme.secondaryButtonBackgroundHover};
  }
`;
