// Copyright 2023 Paion Data. All rights reserved.
import {
  schemeWithEncryptionFlag,
  schemeWithInvertedEncryptionFlag,
  stripScheme,
  isEnterpriseEdition,
  isAura
} from '../support/utils'

/* global Cypress, cy, before */

const getBoltUrlField = () => cy.get('input[data-testid="boltaddress"]')
const getBoltSchemeSelect = () =>
  cy.get('select[data-testid="bolt-scheme-select"]')
const getFirstFrameStatusbar = () =>
  cy.get('[data-testid="frameStatusbar"]').first()
const getFirstFrameCommand = () =>
  cy.get('[data-testid="frameCommand"]').first()

describe('Connect form', () => {
  before(function () {
    cy.visit(Cypress.config('url')).title().should('include', 'Neo4j Browser')
    cy.wait(3000)
    cy.disconnect()
  })

  if (!isAura()) {
    it('extracts the scheme from the bolt url entered', () => {
      // Bolt is not pickable on aura
      const scheme = schemeWithEncryptionFlag('bolt')
      const host = 'localhost:1212'
      getBoltUrlField()
        .clear()
        .type(scheme + host)

      getBoltUrlField().should('have.value', host)
      getBoltSchemeSelect().should('have.value', scheme)
    })
  }
  it('extracts the scheme from the bolt url entered with encryption flag', () => {
    const input = schemeWithInvertedEncryptionFlag('neo4j')
    const output = schemeWithEncryptionFlag('neo4j')
    const host = 'localhost:7687'
    getBoltUrlField()
      .clear()
      .type(input + host)

    getBoltUrlField().should('have.value', host)
    getBoltSchemeSelect().should('have.value', output)
  })
  if (!isAura()) {
    it('aliases bolt+routing:// to neo4j://', () => {
      getBoltSchemeSelect().select(schemeWithEncryptionFlag('bolt'))
      const scheme = 'bolt+routing://'
      const aliasScheme = schemeWithEncryptionFlag('neo4j')
      const host = 'localhost:7687'
      getBoltUrlField()
        .clear()
        .type(scheme + host)

      getBoltUrlField().should('have.value', host)
      getBoltSchemeSelect().should('have.value', aliasScheme)
    })

    it('can connect with bolt:// protocol', () => {
      cy.executeCommand(':clear')
      const boltUrl = 'bolt://' + stripScheme(Cypress.config('boltUrl'))
      cy.connect('neo4j', Cypress.config('password'), boltUrl)
      cy.executeCommand('RETURN "Hello World";')
      cy.contains('Hello World')
      cy.reload()
      cy.executeCommand('RETURN "Hello again";')
      cy.contains('Hello again')
      cy.executeCommand(':server disconnect')
    })
    // Check auto switching protocols for non supporting neo4j://
    if (Cypress.config('serverVersion') < 4.0) {
      it('browser auto-connects with bolt:// protocol after neo4j:// failed with routing issues', () => {
        cy.executeCommand(':clear')
        const boltUrl = 'neo4j://' + stripScheme(Cypress.config('boltUrl'))
        cy.connect('neo4j', Cypress.config('password'), boltUrl, false)
        getFirstFrameStatusbar().should(
          'contain',
          `Automatic retry using the "${schemeWithEncryptionFlag('bolt')}"`
        )
        getFirstFrameStatusbar().should(
          'not.contain',
          `Automatic retry using the "${schemeWithEncryptionFlag('bolt')}"`
        )
        cy.wait(7000) // auto retry is in 5 secs
        getFirstFrameCommand().contains(':play start')
        cy.executeCommand(':server disconnect')
        cy.executeCommand(':clear')
      })
    }
  }
  if (Cypress.config('serverVersion') >= 4.1) {
    it('can connect with the neo4j:// scheme', () => {
      cy.executeCommand(':clear')
      const boltUrl = 'neo4j://' + stripScheme(Cypress.config('boltUrl'))
      cy.connect('neo4j', Cypress.config('password'), boltUrl)
      cy.executeCommand(':server disconnect')
    })

    if (isEnterpriseEdition()) {
      it('shows correct metadata when using db field', () => {
        cy.connect('neo4j', Cypress.config('password'))
        cy.executeCommand(':use system')
        cy.createDatabase('sidebartest')
        cy.executeCommand(':use sidebartest')
        cy.executeCommand('create (:TestLabel)')
        cy.executeCommand(':use neo4j')
        cy.executeCommand('create (:MovieLabel)')

        cy.executeCommand(':server disconnect')
        cy.visit('/?dbms=bolt://localhost:7687&db=sidebartest')
        cy.get('[data-testid=username]').clear().type('neo4j')
        cy.get('[data-testid=password]')
          .type(Cypress.config('password'))
          .type('{enter}')
        cy.get('[data-testid="navigationDBMS"]').click()
        cy.get('[data-testid="sidebarMetaItem"]', { timeout: 30000 }).contains(
          'TestLabel'
        )
        cy.get('[data-testid="navigationDBMS"]').click()

        // unknown db leads to default db
        cy.executeCommand(':server disconnect')
        cy.visit('/?dbms=bolt://username@localhost:7687&db=unknowndb')

        cy.get('[data-testid=username]')
          .should('have.value', 'username')
          .clear()
          .type('neo4j')
        cy.get('[data-testid=password]')
          .type(Cypress.config('password'))
          .type('{enter}')
        cy.get('[data-testid="navigationDBMS"]').click()
        cy.get('[data-testid="sidebarMetaItem"]', { timeout: 30000 }).contains(
          'MovieLabel'
        )
        cy.get('[data-testid="navigationDBMS"]').click()

        cy.executeCommand('match (n:MovieLabel) delete n')
        cy.executeCommand(':use system')
        cy.executeCommand('DROP DATABASE sidebartest')
        cy.executeCommand(':use neo4j')
      })
    }

    if (!isAura()) {
      it('extracts params and prefills form', () => {
        cy.disconnect()
        cy.visit('/?dbms=bolt://username@localhost:7687&db=system')

        cy.get('[data-testid=database]').should('have.value', 'system')
        cy.get('[data-testid=username]')
          .should('have.value', 'username')
          .clear()
          .type('neo4j')
        cy.get('[data-testid=password]')
          .type(Cypress.config('password'))
          .type('{enter}')

        cy.get('[data-testid="navigationDBMS"]').click()
        cy.get('[data-testid="database-selection-list"]').contains('system')
        cy.executeCommand(':use neo4j')
      })
    }
  }
})
