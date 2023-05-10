// Copyright 2023 Paion Data. All rights reserved.

/* global Cypress, cy, before */

const GREY = 'rgb(165, 171, 182)' // Default color for nodes and relationships
const ORANGE = 'rgb(247, 151, 103)'
const PURPLE = 'rgb(201, 144, 192)' // Default first color for a new node label

describe('Viz rendering', () => {
  before(function () {
    cy.visit(Cypress.config('url')).title().should('include', 'Neo4j Browser')
    cy.wait(3000)
    cy.ensureConnection()
  })

  it('shows legend with rel types + node labels on first render', () => {
    cy.executeCommand(':clear')
    cy.executeCommand(
      'CREATE (a:TestLabel)-[:CONNECTS]->(b:TestLabel) RETURN a, b'
    )
    cy.get('svg[class="neod3viz"]', { timeout: 5000 }).contains(
      'CONNECTS'
    )
    cy.executeCommand('MATCH (a:TestLabel) DETACH DELETE a')
  })

  it('can zoom in with button', () => {
    cy.executeCommand(':clear')
    cy.executeCommand(`CREATE (a:TestLabel {name: 'testNode'}) RETURN a`, {
      parseSpecialCharSequences: false
    })

    const zoomOutButton = cy.get(`[aria-label="zoom-out"]`)
    zoomOutButton.click({ force: true })
    zoomOutButton.wait(3000)

    // Check that zoom in button increases the size of the node in the graph view
    cy.get('svg')
      .find(`[aria-label^="graph-node"]`)
      .then($el => $el[0].getBoundingClientRect().width)
      .then(width => {
        const originalWidth = width
        expect(originalWidth).to.be.greaterThan(0)

        const zoomInButton = cy.get(`[aria-label="zoom-in"]`)
        zoomInButton.click()

        cy.get('svg')
          .find(`[aria-label^="graph-node"]`)
          .then($el => $el[0].getBoundingClientRect().width)
          .then(newWidth => {
            return expect(newWidth).to.be.greaterThan(originalWidth)
          })
      })
  })
  it('disables zoom in button after limit is reached', () => {
    cy.executeCommand(':clear')
    cy.executeCommand(`CREATE (a:TestLabel {name: 'testNode'}) RETURN a`, {
      parseSpecialCharSequences: false
    })

    // Multiple zoom will result in zoom reaching scale limit and the button to be disabled
    const zoomInButton = cy.get(`[aria-label="zoom-in"]`)
    zoomInButton.click({ force: true })
    zoomInButton.click({ force: true })
    zoomInButton.click({ force: true })
    zoomInButton.click({ force: true })
    zoomInButton.click({ force: true })

    cy.get(`[aria-label="zoom-in"]`).should('be.disabled')
  })
  it('can zoom out with just mouse wheel in fullscreen', () => {
    cy.executeCommand(':clear')
    cy.executeCommand(`CREATE (a:TestLabel {name: 'testNode'}) RETURN a`, {
      parseSpecialCharSequences: false
    })

    // Enter fullscreen
    cy.get('article').find(`[title='Fullscreen']`).click()
    cy.get(`#svg-vis`).trigger('wheel', { deltaY: 3000 })

    cy.get(`[aria-label="zoom-out"]`).should('be.disabled')

    // Leave fullscreen
    cy.get('article').find(`[title='Close fullscreen']`).click()
  })
  it('can not zoom out with just mouse wheel when not in fullscreen', () => {
    cy.executeCommand(':clear')
    cy.executeCommand(`CREATE (a:TestLabel {name: 'testNode'}) RETURN a`, {
      parseSpecialCharSequences: false
    })

    cy.get(`#svg-vis`).trigger('wheel', { deltaY: 3000 })

    cy.get(`[aria-label="zoom-out"]`).should('be.enabled')
  })
  it('displays wheel zoom info message which can be closed', () => {
    cy.executeCommand(':clear')
    cy.executeCommand(
      'CREATE (a:TestLabel)-[:CONNECTS]->(b:TestLabel) RETURN a, b'
    )

    cy.get(`#svg-vis`).trigger('wheel', { deltaY: 3000 })

    cy.get('[data-testid=wheelZoomInfoCheckbox]').should('exist')

    cy.get('[data-testid=wheelZoomInfoCheckbox]').click()

    cy.get('[data-testid=wheelZoomInfoCheckbox]').should('not.exist')
  })
  it('can zoom out when holding down shift and scrolling', () => {
    cy.executeCommand(':clear')
    cy.executeCommand(`CREATE (a:TestLabel {name: 'testNode'}) RETURN a`, {
      parseSpecialCharSequences: false
    })

    cy.get('#svg-vis').trigger('wheel', { deltaY: 3000, shiftKey: true })
    cy.get(`[aria-label="zoom-out"]`).should('be.disabled')
  })
})
