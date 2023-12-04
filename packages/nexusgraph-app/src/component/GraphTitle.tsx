// Copyright 2023 Paion Data. All rights reserved.
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { selectGraphData } from "../../../nexusgraph-redux";
import { StyledInput } from "./styled";

export const INITIAL_GRAPH_NAME = "Unamed Graph";

interface GraphTitleProps {
  graphId: string;
  onChange: (graphId: string, newTitle: string) => void;
}

export default function GraphTitle(props: GraphTitleProps): JSX.Element {
  const { t } = useTranslation();

  const initialGraphName = t("Unamed Graph");

  const graphData = selectGraphData();

  const [inputValue, setInputValue] = useState(graphData.name ? graphData.name : initialGraphName);

  useEffect(() => {
    setInputValue(graphData.name ? graphData.name : initialGraphName);
  }, [graphData.id]);

  return (
    <StyledInput
      data-testid="graphTitle"
      value={inputValue}
      onChange={(event) => {
        setInputValue(event.target.value);
        props.onChange(props.graphId, event.target.value);
      }}
    />
  );
}
