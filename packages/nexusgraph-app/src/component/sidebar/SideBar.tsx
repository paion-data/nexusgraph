// Copyright 2023 Paion Data. All rights reserved.
import { GraphMetaData, selectGraphData } from "../../../../nexusgraph-redux";
import { NewGraphButton } from "./new-graph-button";
import { StyledGraphListItem } from "./styled";

interface SideBarProps {
  onClick: (graphId: string | undefined) => void;
  graphList: GraphMetaData[];
}

export default function SideBar(props: SideBarProps): JSX.Element {
  const graphId = selectGraphData().id;

  return (
    <>
      <NewGraphButton />
      {props.graphList.map((metaData) => (
        <StyledGraphListItem
          data-testid={`graphListItem-${metaData.id}`}
          onClick={() => props.onClick(metaData.id)}
          displayedItem={metaData.id == graphId}
        >
          {metaData.name}
        </StyledGraphListItem>
      ))}
    </>
  );
}
