// Copyright 2023 Paion Data. All rights reserved.
import type { BaseType, Selection } from "d3-selection";

import type { RelationshipModel } from "../models/Relationship";
import { REL_MOUSE_OVER, REL_MOUSE_OUT, RELATIONSHIO_CLICKED } from "./GraphEventHandlerModel";

export function relationshipEventHandlers(
  selection: Selection<SVGGElement, RelationshipModel, BaseType, unknown>,
  trigger: (event: string, rel: RelationshipModel) => void
): Selection<SVGGElement, RelationshipModel, BaseType, unknown> {
  const onRelationshipClick = (event: Event, rel: RelationshipModel) => {
    event.stopPropagation();
    trigger(RELATIONSHIO_CLICKED, rel);
  };

  const onRelMouseOver = (_event: Event, rel: RelationshipModel) => {
    trigger(REL_MOUSE_OVER, rel);
  };

  const onRelMouseOut = (_event: Event, rel: RelationshipModel) => {
    trigger(REL_MOUSE_OUT, rel);
  };

  return selection.on("click", onRelationshipClick).on("mouseover", onRelMouseOver).on("mouseout", onRelMouseOut);
}
