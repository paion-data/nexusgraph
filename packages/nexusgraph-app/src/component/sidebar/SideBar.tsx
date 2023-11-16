// Copyright 2023 Paion Data. All rights reserved.
import { GraphMetaData } from "../../../../nexusgraph-redux";
import { NewGraphButton } from "./new-graph-button";
import { StyledGraphListItem } from "./styled";

interface SideBarProps {
  onClick: (graphId: string | undefined) => void;
  graphList: GraphMetaData[];
}

export default function SideBar(props: SideBarProps): JSX.Element {
  return (
    <>
      <NewGraphButton />
      {props.graphList.map((metaData) => (
        <StyledGraphListItem id={"graphListItem-" + metaData.id} onClick={() => props.onClick(metaData.id)}>
          {metaData.name}
        </StyledGraphListItem>
      ))}
    </>
  );
}
