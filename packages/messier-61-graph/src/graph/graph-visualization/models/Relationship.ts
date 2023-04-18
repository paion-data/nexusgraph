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
import { VizItemProperty } from 'neo4j-arc/common'
import { ArcArrow } from '../utils/ArcArrow'
import { LoopArrow } from '../utils/LoopArrow'
import { StraightArrow } from '../utils/StraightArrow'
import { NodeModel } from './Node'

export type RelationshipCaptionLayout = 'internal' | 'external'
export class RelationshipModel {
  id: string
  propertyList: VizItemProperty[]
  propertyMap: Record<string, string>
  source: NodeModel
  target: NodeModel
  type: string
  isNode = false
  isRelationship = true

  naturalAngle: number
  caption: string
  captionLength: number
  captionHeight: number
  captionLayout: RelationshipCaptionLayout
  shortCaption: string | undefined
  shortCaptionLength: number | undefined
  selected: boolean
  centreDistance: number
  internal: boolean | undefined
  arrow: ArcArrow | LoopArrow | StraightArrow | undefined

  constructor(
    id: string,
    source: NodeModel,
    target: NodeModel,
    type: string,
    properties: Record<string, string>,
    propertyTypes: Record<string, string>
  ) {
    this.id = id
    this.source = source
    this.target = target
    this.type = type
    this.propertyMap = properties
    this.propertyList = Object.keys(this.propertyMap || {}).reduce(
      (acc: VizItemProperty[], key) =>
        acc.concat([{ key, type: propertyTypes[key], value: properties[key] }]),
      []
    )

    this.selected = false
    // These values are overriden as part of the initial layouting of the graph
    this.naturalAngle = 0
    this.caption = ''
    this.captionLength = 0
    this.captionHeight = 0
    this.captionLayout = 'internal'
    this.centreDistance = 0
  }

  toJSON(): Record<string, string> {
    return this.propertyMap
  }

  isLoop(): boolean {
    return this.source === this.target
  }
}
