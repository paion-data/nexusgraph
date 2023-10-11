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

import { selectAllAndDelete } from '../support/commands'

/* global Cypress, cy, before */

describe('Cypher Editor', () => {
  before(function () {
    cy.visit(Cypress.config('url'))
    cy.get('input[data-testid="boltaddress"]', { timeout: 40000 })
    cy.ensureConnection()
  })

  it('can autocomplete', () => {
    cy.executeCommand('create (:AutocompeleteLabel)')
    cy.getEditor().type(':')
    cy.getEditor().contains(':play')
    cy.getEditor().contains(':config')
    cy.getEditor().contains(':guide')

    cy.getEditor().type('{backspace}call dbms.listC')
    cy.getEditor().contains('listConfig')

    // It can take a little while for the label meta-data to update in the background
    cy.getEditor().type(selectAllAndDelete)
    cy.executeCommand('return extraTimeForMetadataupdate')
    cy.resultContains('extraTimeForMetadataupdate')
    cy.wait(5000)

    cy.getEditor().type(selectAllAndDelete)
    cy.getEditor().type('MATCH (:')
    cy.getEditor().contains(':AutocompeleteLabel')

    cy.getEditor().type(selectAllAndDelete)
    // cleanup
    cy.executeCommand('match (n:AutocompeleteLabel) delete n;')
  })
})
