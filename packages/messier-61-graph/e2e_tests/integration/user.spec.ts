// Copyright 2023 Paion Data. All rights reserved.

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
