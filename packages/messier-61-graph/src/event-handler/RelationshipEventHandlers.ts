// Copyright 2023 Paion Data. All rights reserved.
import type { BaseType, Selection } from "d3-selection";

import type { RelationshipModel } from "../models/Relationship";
import { REL_MOUSE_OVER, REL_MOUSE_OUT, RELATIONSHIO_CLICKED } from "./GraphEventHandlerModel";

export function relationshipEventHandlers(
  selection: Selection<SVGGElement, RelationshipModel, BaseType, unknown>,
  trigger: (event: string, rel: RelationshipModel) => void
): Selection<SVGGElement, RelationshipModel, BaseType, unknown> {
  function onRelationshipClick(event: Event, rel: RelationshipModel): void {
    event.stopPropagation();
    trigger(RELATIONSHIO_CLICKED, rel);
  }

  function onRelMouseOver(_event: Event, rel: RelationshipModel): void {
    trigger(REL_MOUSE_OVER, rel);
  }

  function onRelMouseOut(_event: Event, rel: RelationshipModel): void {
    trigger(REL_MOUSE_OUT, rel);
  }

  return selection
    .on(RELATIONSHIO_CLICKED, onRelationshipClick)
    .on(REL_MOUSE_OVER, onRelMouseOver)
    .on(REL_MOUSE_OUT, onRelMouseOut);
}
