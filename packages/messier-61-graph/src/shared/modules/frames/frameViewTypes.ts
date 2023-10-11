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

export const VISUALIZATION = 'VISUALIZATION'
export const PLAN = 'PLAN'
export const WARNINGS = 'WARNINGS'
export const ERRORS = 'ERRORS'
export const TABLE = 'TABLE'
export const CODE = 'CODE'
export const ERROR = 'ERROR'
export const TEXT = 'TEXT'

export type FrameView =
  | typeof VISUALIZATION
  | typeof PLAN
  | typeof WARNINGS
  | typeof ERRORS
  | typeof TABLE
  | typeof CODE
  | typeof ERROR
  | typeof TEXT
