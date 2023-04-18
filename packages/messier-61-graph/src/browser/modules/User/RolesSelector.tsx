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
import React from 'react'

import { StyledSelect } from './styled'

const RolesSelector = ({
  roles = [],
  onChange = null,
  selectedValue = 0,
  id
}: any) => {
  let options = [
    <option key="-1" value={0}>
      {' '}
    </option>
  ]
  if (roles.length > 0) {
    options = options.concat(
      (roles as any[]).map((role, i) => {
        return (
          <option key={i} value={role}>
            {role}
          </option>
        )
      })
    )

    const args = {
      ...(id && { id, name: id })
    }

    return (
      <StyledSelect
        className="roles-selector"
        placeholder="Select role"
        value={selectedValue}
        onChange={onChange}
        {...args}
      >
        {options}
      </StyledSelect>
    )
  } else {
    return null
  }
}
export default RolesSelector
