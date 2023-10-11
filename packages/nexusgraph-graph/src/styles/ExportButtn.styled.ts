// Copyright 2023 Paion Data. All rights reserved.
import styled from "styled-components";

export const StyledGraphExport = styled.button`
  position: absolute;
  right: 6%;
  top: 6%;
  z-index: 20;
  color: #fff;
  cursor: pointer;
  background-color: transparent;
  border: none;
  width: 50px;
  height: 50px;
  text-align: center;
  overflow: unset;

  & svg {
    width: 100%;
    stroke-width: 0.5px;
    stroke: #fff;
    stroke-linecap: round;
  }

  &:focus {
    position: absolute;
    > ul li {
      display: block;
      color: #fff;
      background-color: transparent;
      border: none;
      box-shadow: inset 2px 2px 5px #fff;
    }
  }
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

export const DropdownList = styled.ul`
  z-index: 2;
`;

export const DropdownContent = styled.li`
  display: none;
  position: absolute;
  margin-top: 15px;
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
