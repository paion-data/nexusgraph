// Copyright 2023 Paion Data. All rights reserved.

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
