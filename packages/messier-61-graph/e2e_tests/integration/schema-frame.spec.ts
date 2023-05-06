// Copyright 2023 Paion Data. All rights reserved.

/* global Cypress, cy, before */

describe('Schema Frame', () => {
  before(function () {
    cy.visit(Cypress.config('url')).title().should('include', 'Neo4j Browser')
    cy.wait(3000)
  })
  it('can connect', () => {
    const password = Cypress.config('password')
    cy.connect('neo4j', password)
  })
  describe('renders schema', () => {
    before(function () {
      cy.executeCommand(
        'CREATE (n:SchemaTest {{}prop1: "foo", prop2: "bar"{}})'
      )

      if (Cypress.config('serverVersion') >= 4.0) {
        cy.executeCommand(
          'CREATE INDEX compositeIndex FOR (n:SchemaTest) ON (n.prop1, n.prop2)'
        )
      } else {
        cy.executeCommand('CREATE INDEX ON :SchemaTest(prop1, prop2)')
      }

      if (Cypress.config('serverVersion') >= 4.4) {
        cy.executeCommand(
          'CREATE CONSTRAINT testConstraint FOR (n:SchemaTest) REQUIRE n.prop1 IS UNIQUE'
        )
      } else {
        cy.executeCommand(
          'CREATE CONSTRAINT ON (n:SchemaTest) ASSERT n.prop1 IS UNIQUE'
        )
      }
    })
    after(function () {
      if (Cypress.config('serverVersion') >= 4.0) {
        cy.executeCommand('DROP INDEX compositeIndex')
      } else {
        cy.executeCommand('DROP INDEX ON :SchemaTest(prop1, prop2)')
      }

      if (Cypress.config('serverVersion') >= 4.4) {
        cy.executeCommand('DROP CONSTRAINT testConstraint')
      } else {
        cy.executeCommand(
          'DROP CONSTRAINT ON (n:SchemaTest) ASSERT n.prop1 IS UNIQUE'
        )
      }
      cy.executeCommand('MATCH (n:SchemaTest ) DETACH DELETE n')
    })

    it('renders indexes correctly', () => {
      cy.executeCommand(':clear')
      cy.executeCommand(':schema')

      // Headers
      if (Cypress.config('serverVersion') >= 4.0) {
        cy.get('[data-testid="frameContents"]')
          .should('contain', 'Index Name')
          .and('contain', 'LabelsOrTypes')
          .and('contain', 'Properties')
          .and('contain', 'State')
      } else {
        cy.get('[data-testid="frameContents"]').should('contain', 'Indexes')
      }

      // Index info
      if (Cypress.config('serverVersion') >= 4.0) {
        cy.get('[data-testid="frameContents"]').should(
          'contain',
          'compositeIndex'
        )
      }

      cy.get('[data-testid="frameContents"]')
        .should('contain', 'SchemaTest')
        .and('contain', 'prop1')
        .and('contain', 'prop2')
    })

    it('renders constraints correctly', () => {
      cy.executeCommand(':clear')
      cy.executeCommand(':schema')

      if (Cypress.config('serverVersion') >= 4.2) {
        // Headers
        cy.get('[data-testid="frameContents"]')
          .should('contain', 'Constraint Name')
          .and('contain', 'Type')
          .and('contain', 'EntityType')
          .and('contain', 'LabelsOrTypes')
          .and('contain', 'Properties')

        // Constraint info
        cy.get('[data-testid="frameContents"]')
          .should('contain', 'UNIQUENESS')
          .and('contain', 'NODE')
          .and('contain', '"SchemaTest"')
          .and('contain', '"prop1"')
      } else {
        cy.get('[data-testid="frameContents"]')
          .should('contain', 'Constraints')
          .and('contain', ':SchemaTest')
      }
    })
  })
})
