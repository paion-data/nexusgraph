// Copyright 2023 Paion Data. All rights reserved.
import styled from "styled-components";

export const StyledGraphListItem = styled.button<{ displayedItem: boolean }>`
  position: relative;
  width: 40%;
  aspect-ratio: 1.618 / 1;
  border-radius: 1rem;
  border: none;
  margin: 5%;
  color: #f9bfd5;
  background: rgba(256, 256, 256, 0.6);
  cursor: pointer;
  word-wrap: break-word;
  font-size: 20px;
  & svg {
    height: 30%;
    stroke-width: 1px;
    stroke: #f9bfd5;
  }

  ${(props) => props.displayedItem && "border-style: solid; border-width: 3px; border-color: rgba(245, 95, 145, 0.45);"}

  &:hover {
    border-style: solid;
    border-width: 3px;
    border-color: rgba(245, 95, 145, 0.45);
  }
`;
