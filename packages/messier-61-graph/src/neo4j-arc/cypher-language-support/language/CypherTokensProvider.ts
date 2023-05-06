// Copyright 2023 Paion Data. All rights reserved.
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
