// Copyright 2023 Paion Data. All rights reserved.
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
