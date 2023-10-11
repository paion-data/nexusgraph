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
