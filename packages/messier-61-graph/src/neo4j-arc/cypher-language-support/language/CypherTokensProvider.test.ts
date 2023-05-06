// Copyright 2023 Paion Data. All rights reserved.
import { CypherTokensProvider } from './CypherTokensProvider'

describe('CypherTokensProvider', () => {
  it('takes a line of cypher and returns a set of tokens', () => {
    const cypher = 'RETURN 1'

    const expectedTokens = [
      { scopes: 'return.cypher', startIndex: 0 },
      { scopes: 'sp.cypher', startIndex: 6 },
      { scopes: 'decimalinteger.cypher', startIndex: 7 }
    ]

    const actualTokens = new CypherTokensProvider().tokenize(cypher).tokens

    expect(actualTokens).toEqual(expectedTokens)
  })
})
