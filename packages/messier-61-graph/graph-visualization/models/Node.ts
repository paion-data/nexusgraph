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
import type { VizItemProperty } from "./VizItemProperty";

export interface NodeCaptionLine {
  node: NodeModel;
  text: string;
  baseline: number;
  remainingWidth: number;
}

export class NodeModel {
  id: string;
  labels: string[];
  propertyList: VizItemProperty[];
  propertyMap: Record<string, string>;

  radius: number;
  caption: NodeCaptionLine[];
  selected: boolean;
  expanded: boolean;
  minified: boolean;
  contextMenu?: { menuSelection: string; menuContent: string; label: string };

  x: number;
  y: number;
  fx: number | null = null;
  fy: number | null = null;

  hoverFixed: boolean;
  initialPositionCalculated: boolean;

  constructor(id: string, labels: string[], properties: Record<string, string>, propertyTypes: Record<string, string>) {
    this.id = id;
    this.labels = labels;
    this.propertyMap = properties;
    this.propertyList = Object.keys(properties).map((key: string) => ({
      key,
      type: propertyTypes[key],
      value: properties[key],
    }));

    this.radius = 0;
    this.caption = [];
    this.selected = false;
    this.expanded = false;
    this.minified = false;

    this.x = 0;
    this.y = 0;
    this.hoverFixed = false;
    this.initialPositionCalculated = false;
  }

  toJson(): Record<string, string> {
    return this.propertyMap;
  }
}
