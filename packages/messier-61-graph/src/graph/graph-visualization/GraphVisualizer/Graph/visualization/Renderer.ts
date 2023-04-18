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
import { BaseType, Selection } from 'd3-selection'

import { Visualization } from './Visualization'

const noOp = () => undefined
type RendererEventHandler<Datum> = (
  selection: Selection<SVGGElement, Datum, BaseType, unknown>,
  style: Visualization
) => void

export default class Renderer<Datum> {
  onGraphChange: RendererEventHandler<Datum>
  onTick: RendererEventHandler<Datum>
  name: string

  constructor({
    onGraphChange = noOp,
    onTick = noOp,
    name
  }: {
    onGraphChange?: RendererEventHandler<Datum>
    onTick?: RendererEventHandler<Datum>
    name: string
  }) {
    this.onGraphChange = onGraphChange
    this.onTick = onTick
    this.name = name
  }
}
