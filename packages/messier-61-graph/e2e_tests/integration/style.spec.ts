// Copyright 2023 Paion Data. All rights reserved.

/* global Cypress, cy, before */

describe(':style', () => {
  before(function() {
    cy.visit(Cypress.config('url'))
      .title()
      .should('include', 'Neo4j Browser')
    cy.wait(3000)
  })
  it('can connect', () => {
    const password = Cypress.config('password')
    cy.connect('neo4j', password)
  })
  it('print the current style', () => {
    cy.executeCommand(':clear')
    cy.executeCommand('CREATE (n:Style) RETURN n') // To generate any style

    cy.waitForCommandResult()

    const query = ':style'
    cy.executeCommand(query)
    cy.get('[data-testid="frameCommand"]', { timeout: 10000 }).contains(query)
    cy.get('[data-testid="frameContents"]', { timeout: 10000 })
      .first()
      .should('contain', 'node {')
      .should('contain', 'relationship {')
      .should('contain', '"<type>"')
  })
  it('can reset style with button', () => {
    cy.executeCommand(':clear')
    cy.executeCommand(':style')
    // can't trigger hover with cypress so we can't know it's visible
    cy.get('[data-testid="exportGraSSButton"]').should('exist')
    cy.get('[data-testid="styleResetButton"]', { timeout: 10000 })
      .first()
      .click()
    cy.get('[data-testid="frameContents"]', { timeout: 10000 })
      .first()
      .should('contain', 'No style generated or set yet')
  })
})
