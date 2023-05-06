// Copyright 2023 Paion Data. All rights reserved.

import { selectAllAndDelete } from '../support/commands'

/* global Cypress, cy, before */

describe('Cypher Editor', () => {
  before(function () {
    cy.visit(Cypress.config('url'))
    cy.get('input[data-testid="boltaddress"]', { timeout: 40000 })
    cy.ensureConnection()
  })

  it('can autocomplete', () => {
    cy.executeCommand('create (:AutocompeleteLabel)')
    cy.getEditor().type(':')
    cy.getEditor().contains(':play')
    cy.getEditor().contains(':config')
    cy.getEditor().contains(':guide')

    cy.getEditor().type('{backspace}call dbms.listC')
    cy.getEditor().contains('listConfig')

    // It can take a little while for the label meta-data to update in the background
    cy.getEditor().type(selectAllAndDelete)
    cy.executeCommand('return extraTimeForMetadataupdate')
    cy.resultContains('extraTimeForMetadataupdate')
    cy.wait(5000)

    cy.getEditor().type(selectAllAndDelete)
    cy.getEditor().type('MATCH (:')
    cy.getEditor().contains(':AutocompeleteLabel')

    cy.getEditor().type(selectAllAndDelete)
    // cleanup
    cy.executeCommand('match (n:AutocompeleteLabel) delete n;')
  })
})
