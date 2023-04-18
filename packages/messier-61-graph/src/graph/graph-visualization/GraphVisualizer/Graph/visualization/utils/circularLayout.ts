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
