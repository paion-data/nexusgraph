// Copyright 2023 Paion Data. All rights reserved.
import { some } from 'lodash-es'

import { RelatableAction } from '../relatable.types'

export default function isActionAvailable(
  availableActions: RelatableAction[],
  name: string
): boolean {
  return some(availableActions, ([actionName]) => actionName === name)
}
