// Copyright 2023 Paion Data. All rights reserved.

/* global Cypress, cy, before */

describe('Settings', () => {
  before(function() {
    cy.visit(Cypress.config('url'))
      .title()
      .should('include', 'Neo4j Browser')
    cy.wait(3000)
  })

  it('should be able to set max frames', () => {
    // write some commands
    cy.executeCommand('RETURN 1')
    cy.executeCommand('RETURN 2')
    cy.executeCommand('RETURN 3')

    // change settings to 1, make sure it is cut to 1
    cy.get('[data-testid="navigationSettings"]').click()
    cy.get('input[data-testid="setting-maxFrames"]')
      .clear()
      .type('1')
    // close settings again
    cy.get('[data-testid="navigationSettings"]').click()

    cy.get('[data-testid="frame"]').should('have.length', 1)
    cy.get('[data-testid="frame"]').should('contain', 'RETURN 3')

    // write some commands, make sure not more than one frame at a time
    cy.executeCommand('RETURN 1')
    cy.executeCommand('RETURN 2')

    cy.get('[data-testid="frame"]').should('have.length', 1)

    // reload page
    cy.reload()
    cy.get('[data-testid="frame"]').should('have.length', 1, { timeout: 3000 })

    // write some commands, make sure not more than one frame at a time
    cy.executeCommand('RETURN 1')
    cy.executeCommand('RETURN 2')

    cy.get('[data-testid="frame"]').should('have.length', 1)

    // change settings to 3, then write commands and make sure it will be set to 3 frames at most
    cy.get('[data-testid="navigationSettings"]').click()
    cy.get('input[data-testid="setting-maxFrames"]')
      .clear()
      .type('3')
    // close settings again
    cy.get('[data-testid="navigationSettings"]').click()
    cy.executeCommand('RETURN 1')
    cy.executeCommand('RETURN 2')
    cy.executeCommand('RETURN 3')
    cy.executeCommand('RETURN 4')

    cy.get('[data-testid="frame"]').should('have.length', 3)
  })
})
