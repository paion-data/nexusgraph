// Copyright 2023 Paion Data. All rights reserved.
import { NodeModel } from '../../../../models/Node'

export default function circularLayout(
  nodes: NodeModel[],
  center: { x: number; y: number },
  radius: number
): void {
  const unlocatedNodes = nodes.filter(node => !node.initialPositionCalculated)

  unlocatedNodes.forEach((node, i) => {
    node.x =
      center.x + radius * Math.sin((2 * Math.PI * i) / unlocatedNodes.length)

    node.y =
      center.y + radius * Math.cos((2 * Math.PI * i) / unlocatedNodes.length)

    node.initialPositionCalculated = true
  })
}
