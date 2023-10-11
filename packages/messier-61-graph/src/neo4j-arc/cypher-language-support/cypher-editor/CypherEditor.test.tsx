// Copyright 2023 Paion Data. All rights reserved.
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
