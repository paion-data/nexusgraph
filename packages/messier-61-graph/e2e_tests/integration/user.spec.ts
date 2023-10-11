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

import { isAura, isEnterpriseEdition } from '../support/utils'

/* global Cypress, cy, before */

describe('User: ', () => {
  before(function () {
    cy.visit(Cypress.config('url'))
    cy.get('input[data-testid="boltaddress"]', { timeout: 40000 })
    const password = Cypress.config('password')
    cy.connect('neo4j', password)
  })
  if (!isAura()) {
    // usermanagement in frames disabled on aura
    it("Doesn't throw when listing users", () => {
      cy.executeCommand(':clear')
      cy.executeCommand(':server user list')
      cy.get('[data-testid="frame"]', { timeout: 10000 }).should(
        'contain',
        isEnterpriseEdition() ? 'Username' : 'Unable to display'
      )
    })
    // Only on enterprise
    if (isEnterpriseEdition()) {
      it('Add User', () => {
        cy.executeCommand(':clear')
        cy.executeCommand(':server user add')
        cy.addUser('Bob', 'password2', 'editor', false)
        cy.executeCommand(':clear')
        cy.executeCommand(':server user list')
        cy.get('.user-info > .username').should('have.length', 2)
        cy.get('.user-info > .username').contains('Bob')
      })

      it('Add User with forced pw change', () => {
        cy.executeCommand(':clear')
        cy.executeCommand(':server user add')
        cy.addUser('Rob', 'password2', 'editor', true)
        cy.executeCommand(':clear')
        cy.executeCommand(':server user list')
        cy.get('.user-info > .username').should('have.length', 3)
        cy.get('.user-info > .username').contains('Rob')
        cy.dropUser('Bob')
        cy.dropUser('Rob')
      })
    }
  }
})
