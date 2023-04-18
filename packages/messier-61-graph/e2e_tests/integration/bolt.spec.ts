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

describe('Bolt connections', () => {
  before(function () {
    cy.visit(Cypress.config('url')).title().should('include', 'Neo4j Browser')
    cy.wait(3000)
  })
  it('can show connection error', () => {
    const password = 'unlikely password'
    cy.connect('neo4j', password, undefined, false)
  })
  it('show "no connection" error', () => {
    cy.executeCommand(':clear')
    cy.executeCommand('RETURN 1')
    cy.resultContains('No connection found, did you connect to Neo4j')
  })
  it('does not show the "Reconnect" banner when trying to connect', () => {
    cy.connect('neo4j', 'x', 'bolt://localhost:7685', false) // Non open port
    cy.wait(10000)
    cy.get('[data-testid="reconnectBanner"]').should('not.exist')
    cy.get('[data-testid="disconnectedBanner"]').should('be.visible')
    cy.get('[data-testid="main"]', { timeout: 1000 })
      .and('contain', 'Database access not available')
      .should('not.contain', 'Connection lost')
  })
  if (Cypress.config('serverVersion') >= 3.5 && isEnterpriseEdition()) {
    it('send tx metadata with queries', () => {
      cy.executeCommand(':clear')
      const password = Cypress.config('password')
      cy.connect('neo4j', password)

      cy.executeCommand(':queries')
      if (Cypress.config('serverVersion') < 5.0) {
        cy.resultContains('dbms.listQueries')
      } else {
        cy.resultContains('SHOW TRANSACTIONS')
      }
    })
  }

  if (isEnterpriseEdition()) {
    it('users with no role can connect and shows up in sidebar', () => {
      cy.executeCommand(':clear')
      const password = Cypress.config('password')
      cy.connect('neo4j', password)

      cy.createUser('noroles', 'password123', true)
      cy.executeCommand(':server disconnect')
      cy.executeCommand(':clear')
      cy.executeCommand(':server connect')

      // Make sure initial pw set works
      cy.setInitialPassword(
        'password1234',
        'password123',
        'noroles',
        Cypress.config('boltUrl'),
        true
      )

      // Try regular connect
      cy.executeCommand(':server disconnect')
      cy.connect('noroles', 'password1234')

      // Check sidebar
      cy.get('[data-testid="navigationDBMS"]').click()
      cy.get('[data-testid="user-details-username"]').should(
        'contain',
        'noroles'
      )
      if (Cypress.config('serverVersion') <= 4.0) {
        cy.get('[data-testid="user-details-roles"]').should('contain', '-')
      }
      if (Cypress.config('serverVersion') === 4.1) {
        cy.get('[data-testid="user-details-roles"]').should('contain', 'PUBLIC')
      }
      cy.get('[data-testid="navigationDBMS"]').click()

      cy.executeCommand(':server disconnect')
      cy.executeCommand(':server connect')
      cy.connect('neo4j', password)
      cy.dropUser('noroles')
    })
  }
})
