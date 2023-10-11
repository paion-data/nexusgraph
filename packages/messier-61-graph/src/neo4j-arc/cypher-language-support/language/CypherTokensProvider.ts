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
import { CypherLexer } from '@neo4j-cypher/antlr4'
import { languages } from 'monaco-editor/esm/vs/editor/editor.api'
import { createCypherLexer } from '@neo4j-cypher/editor-support'

class CypherState implements languages.IState {
  clone() {
    return new CypherState()
  }

  equals() {
    return true
  }
}

export class CypherTokensProvider implements languages.TokensProvider {
  getInitialState(): CypherState {
    return new CypherState()
  }

  tokenize(line: string): languages.ILineTokens {
    const lexer = createCypherLexer(line) as unknown as CypherLexer

    return {
      endState: new CypherState(),
      tokens: lexer
        .getAllTokens()
        .filter(token => token !== null && token.type !== -1)
        .map(token => ({
          scopes:
            (
              CypherLexer.symbolicNames[token.type] ??
              CypherLexer.literalNames[token.type] ??
              ''
            ).toLowerCase() + '.cypher',
          startIndex: token.column
        }))
        .sort((a, b) => (a.startIndex > b.startIndex ? 1 : -1))
    }
  }
}
