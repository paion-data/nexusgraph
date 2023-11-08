// Copyright 2023 Paion Data. All rights reserved.
import { GraphMetaData } from "../../../../nexusgraph-redux";
import NewGraphButton from "./NewGraphButton";
import { StyledGraphListItem } from "./styled";

export type SideBarProps = {
  graphList: GraphMetaData[];
  setShowAlert: (showAlert: boolean) => void;
};

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
