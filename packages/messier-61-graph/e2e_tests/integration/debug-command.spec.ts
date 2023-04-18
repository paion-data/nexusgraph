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

/* global Cypress, cy, before */

import { isAura } from '../support/utils'

describe(':debug command', () => {
  before(function () {
    cy.visit(Cypress.config('url')).title().should('include', 'Neo4j Browser')
    cy.wait(3000)
  })
  it('can `:debug` command when not connected', () => {
    cy.executeCommand(':clear')
    const query = ':debug'
    cy.executeCommand(query)

    const frame = cy.getFrames()

    frame
      .should('have.length', 1)
      .should('contain', 'serverConfig')
      .should('contain', '"serverConfigReadable": false')
      .should('contain', '"allowOutgoingConnections": false')
  })
  // Now connect
  it('can connect', () => {
    const password = Cypress.config('password')
    cy.connect('neo4j', password)
  })

  // disable these tests for Aura since with the remote connection :debug sometimes doesn't get the real results right away
  if (!isAura()) {
    it('can `:debug` command when connected', () => {
      cy.executeCommand(':clear')
      const query = ':debug'
      cy.executeCommand(query)

      const frame = cy.getFrames()

      frame
        .should('have.length', 1)
        .should('contain', 'serverConfig')
        .should('contain', '"serverConfigReadable": true')
        .should('contain', '"authEnabled": true')
    })
  }
})
