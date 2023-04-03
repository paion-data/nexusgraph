// Copyright 2023 Paion Data. All rights reserved.
import React, { useState } from "react";
import { ClickableUrls } from "./ClickableUrls";
import {
  AlternatingTable,
  CopyCell,
  KeyCell,
  StyledExpandValueButton,
  StyledInlineList,
  ValueCell,
} from "../styles/PropertiesTable.styled";
import { ClipboardCopier } from "./ClipboardCopier";
import { ShowMoreOrAll } from "./ShowMoreOrAll";
import { VizItemProperty } from "../models/VizItemProperty";

export const ELLIPSIS = "\u2026";
export const WIDE_VIEW_THRESHOLD = 900;
//The maximum width for a small number of characters passed in
export const MAX_LENGTH_NARROW = 150;
//The maximum width of a large number of characters passed in
export const MAX_LENGTH_WIDE = 300;

interface ExpandableValueProps {
  value: string;
  width: number;
  type: string;
}

function ExpandableValue({ value, width, type }: ExpandableValueProps) {
  const [expanded, setExpanded] = useState(false);

  const maxLength = width > WIDE_VIEW_THRESHOLD ? MAX_LENGTH_WIDE : MAX_LENGTH_NARROW;

  const handleExpandClick = () => {
    setExpanded(true);
  };

  let valueShown = expanded ? value : value.slice(0, maxLength);
  const valueIsTrimmed = valueShown.length !== value.length;
  valueShown += valueIsTrimmed ? ELLIPSIS : "";

  return (
    <>
      {type.startsWith("Array") && "["}
      <ClickableUrls text={valueShown} />
      {valueIsTrimmed && <StyledExpandValueButton onClick={handleExpandClick}>{" Show all"}</StyledExpandValueButton>}
      {type.startsWith("Array") && "]"}
    </>
  );
}

interface PropertiesViewProps {
  visibleProperties: VizItemProperty[];
  onMoreClick: (numMore: number) => void;
  totalNumItems: number;
  moreStep: number;
  nodeInspectorWidth: number;
}

export function PropertiesTable({
  visibleProperties,
  totalNumItems,
  onMoreClick,
  moreStep,
  nodeInspectorWidth,
}: PropertiesViewProps): JSX.Element {
  return (
    <>
      <StyledInlineList>
        <AlternatingTable>
          <tbody data-testid="viz-details-pane-properties-table">
            {visibleProperties.map(({ key, type, value }) => (
              <tr key={key} title={type}>
                <KeyCell>
                  <ClickableUrls text={key} />
                </KeyCell>
                <ValueCell>
                  <ExpandableValue value={value} width={nodeInspectorWidth} type={type} />
                </ValueCell>
                <CopyCell>
                  <ClipboardCopier titleText={"Copy key and value"} textToCopy={`${key}: ${value}`} iconSize={12} />
                </CopyCell>
              </tr>
            ))}
          </tbody>
        </AlternatingTable>
      </StyledInlineList>
      <ShowMoreOrAll total={totalNumItems} shown={visibleProperties.length} moreStep={moreStep} onMore={onMoreClick} />
    </>
  );
}
