/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import type { NodeModel } from "./Node";
import type { VizItemProperty } from "./VizItemProperty";
import { ArcArrow } from "../ArcArrow";
import { LoopArrow } from "../LoopArrow";
import { StraightArrow } from "../StraightArrow";

export type RelationshipCaptionLayout = "internal" | "external";

export class RelationshipModel {
  id: string;
  propertyList: VizItemProperty[];
  propertyMap: Record<string, string>;
  source: NodeModel;
  target: NodeModel;
  type: string;

  naturalAngle: number;
  caption: string;
  captionLength: number;
  captionHeight: number;
  captionLayout: RelationshipCaptionLayout;
  shortCaption: string | undefined;
  shortCaptionLength: number | undefined;
  selected: boolean;
  centreDistance: number;
  arrow: ArcArrow | LoopArrow | StraightArrow | undefined;

  constructor(
    id: string,
    source: NodeModel,
    target: NodeModel,
    type: string,
    properties: Record<string, string>,
    propertyTypes: Record<string, string>
  ) {
    this.id = id;
    this.source = source;
    this.target = target;
    this.type = type;
    this.propertyMap = properties;
    this.propertyList = Object.keys(this.propertyMap).reduce(
      (accumulation: VizItemProperty[], key) =>
        accumulation.concat([{ key, type: propertyTypes[key], value: properties[key] }]),
      []
    );

    this.selected = false;
    this.naturalAngle = 0;
    this.caption = "";
    this.captionLength = 0;
    this.captionHeight = 0;
    this.captionLayout = "internal";
    this.centreDistance = 0;
  }

  public toJson(): Record<string, string> {
    return this.propertyMap;
  }

  public isLoop(): boolean {
    return this.source === this.target;
  }
}
