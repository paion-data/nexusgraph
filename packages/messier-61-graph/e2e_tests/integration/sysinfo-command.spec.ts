// Copyright 2023 Paion Data. All rights reserved.

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
