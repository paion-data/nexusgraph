// Copyright 2023 Paion Data. All rights reserved.
import { useEffect, useState } from "react";
import { selectGraphData } from "../../../nexusgraph-redux";
import { StyledInput } from "./styled";

export default function GraphTitle(): JSX.Element {
  const graphData = selectGraphData();

  const [inputValue, setInputValue] = useState(graphData.name);

  useEffect(() => {
    setInputValue(graphData.name);
  }, [graphData.id]);

  return (
    <StyledInput
      data-testid="graphTitle"
      id="titleInput"
      value={inputValue}
      onChange={(event) => {
        setInputValue(event.target.value);
      }}
    />
  );
}
