// Copyright 2023 Paion Data. All rights reserved.
import { isAura, isEnterpriseEdition } from '../support/utils'

/* global Cypress, cy, before */

const Editor = '[data-testid="activeEditor"] textarea'
const Carousel = '[data-testid="carousel"]'
const SubmitQueryButton = '[data-testid="editor-Run"]'

describe('Neo4j Browser', () => {
  before(function () {
    cy.visit(Cypress.config('url')).title().should('include', 'Neo4j Browser')
    cy.wait(3000)
  })

  it(':server disconnect frame is rerunnable', () => {
    cy.get('[data-testid="disconnectedBannerCode"]').click()
    cy.get('[data-testid="frameCommand"]').contains(':server connect').click()
    cy.typeInFrame(':play movies{enter}', 0)
    cy.get('[data-testid="frame"]').contains('the Bacon Path')
  })

  it('can connect', () => {
    const password = Cypress.config('password')
    cy.connect('neo4j', password)
  })

  it('can empty the db', () => {
    cy.executeCommand(':clear')
    const query = 'MATCH (n) DETACH DELETE n'
    cy.executeCommand(query)
    cy.waitForCommandResult()
    cy.get('[data-testid="frameCommand"]', { timeout: 10000 }).contains(query)
    cy.get('[data-testid="frameStatusbar"]', { timeout: 100000 })
      .first()
      .contains(/completed/i)
  })

  it('can run cypher statement', () => {
    cy.executeCommand(':clear')
    const query = 'RETURN 1'
    cy.executeCommand(query)
    cy.waitForCommandResult()
    cy.get('[data-testid="frameCommand"]', { timeout: 10000 }).contains(query)
    cy.get('[data-testid="frameStatusbar"]', { timeout: 10000 })
      .first()
      .should('contain', 'Started streaming')
  })

  it('shows error frame for unknown command', () => {
    cy.executeCommand(':clear')
    const query = ':unknown'
    cy.executeCommand(query)
    cy.get('[data-testid="frameCommand"]', { timeout: 10000 }).contains(query)
    cy.get('[data-testid="frame"]', { timeout: 10000 })
      .first()
      .should('contain', 'Error')
  })

  it('can exec cypher from `:play movies`', () => {
    cy.executeCommand(':clear')
    const query = ':play movies'
    cy.executeCommand(query)
    cy.get('[data-testid="frameCommand"]').contains(query)
    cy.get(Carousel).find('[data-testid="nextSlide"]').click()
    cy.get(Carousel).find('[data-testid="nextSlide"]').click()
    cy.get(Carousel).find('[data-testid="previousSlide"]').click()
    cy.get(Carousel).find('.code').click()
    cy.get(SubmitQueryButton).click()
    cy.waitForCommandResult()
    cy.get('[data-testid="frameCommand"]', { timeout: 10000 }).contains(
      'Keanu Reeves'
    )
  })

  it('can display meta items from side drawer', () => {
    cy.executeCommand(':clear')
    cy.get('[data-testid="navigationEditor"]').click()

    cy.executeCommand('MATCH (n) RETURN DISTINCT labels(n);')
    cy.contains('Movie')
    cy.get('[data-testid="sidebarMetaItem"]', { timeout: 30000 }).should(
      'have.length.above',
      9
    )
    cy.get('[data-testid="navigationEditor"]').click()
  })

  it('does not show trial banner since we have licence or community', () => {
    cy.get(Editor).type(`RETURN 1{enter}`, { force: true })

    cy.get('#MAIN_WRAPPER_DOM_ID')
      .contains('30 days has expired')
      .should('not.exist')
    cy.get('#MAIN_WRAPPER_DOM_ID')
      .contains(' This is a time limited trial')
      .should('not.exist')
  })
})
