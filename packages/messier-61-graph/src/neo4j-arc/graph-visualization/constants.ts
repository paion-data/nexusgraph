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
import { NodeModel } from './models/Node'
import { RelationshipModel } from './models/Relationship'

export const MAX_PRECOMPUTED_TICKS = 300
export const EXTRA_TICKS_PER_RENDER = 10

// Friction.
export const VELOCITY_DECAY = 0.4
// Temperature of the simulation. It's a value in the range [0,1] and it
// decreases over time. Can be seen as the probability that a node will move.
export const DEFAULT_ALPHA = 1
// Temperature the simulation tries to converge to.
export const DEFAULT_ALPHA_TARGET = 0
// Temperature at which the simulation is stopped.
export const DEFAULT_ALPHA_MIN = 0.05
// The lower this value, the lower the movement of nodes that aren't being
// dragged. This also affects the perceived elasticity of relationships, a lower
// value will cause neighboring nodes to take more time to follow the node that
// is being dragged.
export const DRAGGING_ALPHA = 0.8
// When dragging we set alphaTarget to a value greater than alphaMin to prevent
// the simulation from stopping.
export const DRAGGING_ALPHA_TARGET = 0.09

export const LINK_DISTANCE = 45

export const FORCE_LINK_DISTANCE = (relationship: RelationshipModel): number =>
  relationship.source.radius + relationship.target.radius + LINK_DISTANCE * 2
export const FORCE_COLLIDE_RADIUS = (node: NodeModel): number =>
  node.radius + 25
export const FORCE_CHARGE = -400
export const FORCE_CENTER_X = 0.03
export const FORCE_CENTER_Y = 0.03

export const ZOOM_MIN_SCALE = 0.1
export const ZOOM_MAX_SCALE = 2
export const ZOOM_FIT_PADDING_PERCENT = 0.05
