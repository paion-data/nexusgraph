/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
