// Copyright 2023 Paion Data. All rights reserved.

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
