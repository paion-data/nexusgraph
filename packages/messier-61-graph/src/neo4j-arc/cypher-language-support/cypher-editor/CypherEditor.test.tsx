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
import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { CypherEditor } from './CypherEditor'

const noOp = () => undefined

describe('Monaco', () => {
  it('renders a component that functions as a textbox', () => {
    const { getByRole, queryByDisplayValue } = render(
      <CypherEditor
        enableMultiStatementMode={true}
        fontLigatures={true}
        useDb={null}
        history={[]}
        onChange={noOp}
        onExecute={noOp}
        isFullscreen={false}
        id="id"
        sendCypherQuery={(() => {}) as any}
      />
    )

    const value = 'hello world'
    fireEvent.input(getByRole('textbox'), { target: { value } })

    expect(queryByDisplayValue(value)).toBeDefined()
  })
})
