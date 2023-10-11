/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { NodeModel } from "./Node";
import type { VizItemProperty } from "./VizItemProperty";

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

  toJson(): Record<string, string> {
    return this.propertyMap;
  }

  isLoop(): boolean {
    return this.source === this.target;
  }
}
