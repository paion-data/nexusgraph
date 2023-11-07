// Copyright 2023 Paion Data. All rights reserved.
import { useDispatch } from "react-redux";
import { AstraiosClient } from "../../../../nexusgraph-astraios";
import { GraphMetaData, selectOAuth, updateGraphData } from "../../../../nexusgraph-redux";
import { StyledGraphListItem } from "./styled";

const astraiosClient = new AstraiosClient();

export type GraphItemProps = {
  graphMetaData: GraphMetaData;
};

export default function GraphItem(props: GraphItemProps): JSX.Element {

  const dispatch = useDispatch()

  const accessToken = selectOAuth().accessToken

  const onClick = () => {
    const graphId = props.graphMetaData.id
    
    astraiosClient.getGraphById(graphId, accessToken).then(response => {
      dispatch(updateGraphData(response.data.data))
    })
  }

  return (
    <StyledGraphListItem onClick={onClick}>{props.graphMetaData.name}</StyledGraphListItem>
  );
}