// Copyright 2023 Paion Data. All rights reserved.
const SELECT_ALL_NODES_BUTTON = '*'

describe('Entering the texts in editor generates the corresponding graph', () => {
  before(() => {
    cy.visit(Cypress.config('url')).title().should('include', 'Neo4j Browser')
    cy.wait(3000)
    const password = Cypress.config('password')
    cy.connect('neo4j', password)
    
    cy.get('button[name=Editor]').click()
    cy.get('div[class=editor-input]').clear()
  })

  it('A single sentence shows up as a single RDF tripple', () => {
    cy.get('div[class=editor-input]').type('i like dog')
    cy.contains(SELECT_ALL_NODES_BUTTON).click()

    cy.get('g[aria-label=graph-nodedog]', { timeout: 10000 }).should('contain', 'dog')
    cy.get('g[aria-label=graph-nodei]', { timeout: 10000 }).should('contain', 'i')
    cy.get('text[text-anchor="middle"]', { timeout: 10000 }).should('contain', 'like')
  })

  it('Multiple sentences gets transformed together into a single graph', () => {
    cy.get('div[class=editor-input]').type('i like dog').type('\ni love cat')

    cy.contains(SELECT_ALL_NODES_BUTTON).click()

    cy.get('g[aria-label=graph-nodedog]', { timeout: 10000 }).should('contain', 'dog')
    cy.get('g[aria-label=graph-nodei]', { timeout: 10000 }).should('contain', 'i')
    cy.get('g[aria-label=graph-nodecat]', { timeout: 10000 }).should('contain', 'cat')
    cy.get('text[text-anchor="middle"]', { timeout: 10000 }).should('contain', 'like')
    cy.get('text[text-anchor="middle"]', { timeout: 10000 }).should('contain', 'love')
  })

  it(("Duplicate subjects/objects are represented as single node in graph"), () => {
    cy.get('div[class=editor-input]').type('i love cat').type('\ni love cat')

    cy.contains(SELECT_ALL_NODES_BUTTON).click()

    cy.get('g[aria-label=graph-nodei]', { timeout: 10000 }).should('have.length', 1)
    cy.get('g[aria-label=graph-nodecat]', { timeout: 10000 }).should('have.length', 1)
    cy.get('svg[class=neod3viz]', { timeout: 10000 }).contains('love').should('have.length', 1)
  })
})
