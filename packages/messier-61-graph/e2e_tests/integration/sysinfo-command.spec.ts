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

import { isEnterpriseEdition } from '../support/utils'

describe(':sysinfo command', () => {
  before(function () {
    cy.visit(Cypress.config('url')).title().should('include', 'Neo4j Browser')
    cy.wait(3000)
    cy.ensureConnection()
  })
  beforeEach(() => {
    cy.executeCommand(':clear')
  })

  if (isEnterpriseEdition()) {
    if (Cypress.config('serverVersion') >= 4.1) {
      it('sysinfo shows store size', () => {
        cy.executeCommand(':sysinfo')

        cy.get('[data-testid="Database"]').should('not.have.text', '-')
      })
    }

    it('sysinfo shows Id allocation', () => {
      cy.executeCommand(
        'CREATE (a:TestLabel)-[:CONNECTS]->(b:TestLabel) RETURN a, b'
      )

      cy.executeCommand(':sysinfo')

      cy.get('[data-testid="Relationship Type ID"]').should(
        'not.have.text',
        '-'
      )

      // Clear
      cy.executeCommand('MATCH (a:TestLabel) DETACH DELETE a')
    })
  }
})
