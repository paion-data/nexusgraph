// Copyright 2023 Paion Data. All rights reserved.
import { GraphMetaData } from "../../../../nexusgraph-redux";
import { NewGraphButton } from "./new-graph-button";
import { StyledGraphListItem } from "./styled";

interface SideBarProps {
  graphList: GraphMetaData[];
  setShowAlert: (showAlert: boolean) => void;
}

export default function SideBar(props: SideBarProps): JSX.Element {
  return (
    <>
      <NewGraphButton setShowAlert={props.setShowAlert} />
      {props.graphList.map((metaData) => (
        <StyledGraphListItem>{metaData.name}</StyledGraphListItem>
      ))}
    </>
  );
}
