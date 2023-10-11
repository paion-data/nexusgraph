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
