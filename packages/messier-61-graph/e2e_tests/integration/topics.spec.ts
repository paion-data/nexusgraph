// Copyright 2023 Paion Data. All rights reserved.

/* global cy, before, Cypress */

describe('Help topics', () => {
  before(function() {
    cy.visit(Cypress.config('url'))
      .title()
      .should('include', 'Neo4j Browser')
    cy.wait(3000)
  })
  it(':help commands has contents', () => {
    cy.executeCommand(':clear')
    const query = ':help commands'
    cy.executeCommand(query)
    cy.get('[data-testid="frameCommand"]', { timeout: 10000 }).contains(query)
    cy.get('[data-testid="frameContents"]', { timeout: 10000 })
      .first()
      .should('contain', ':help style')
  })
  it('has :help style', () => {
    cy.executeCommand(':clear')
    const query = ':help style'
    cy.executeCommand(query)
    cy.get('[data-testid="frameCommand"]', { timeout: 10000 }).contains(query)
    cy.get('[data-testid="frameContents"]', { timeout: 10000 })
      .first()
      .should('contain', 'style command')
  })
})
