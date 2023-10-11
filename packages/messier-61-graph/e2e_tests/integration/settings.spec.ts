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

describe('Settings', () => {
  before(function() {
    cy.visit(Cypress.config('url'))
      .title()
      .should('include', 'Neo4j Browser')
    cy.wait(3000)
  })

  it('should be able to set max frames', () => {
    // write some commands
    cy.executeCommand('RETURN 1')
    cy.executeCommand('RETURN 2')
    cy.executeCommand('RETURN 3')

    // change settings to 1, make sure it is cut to 1
    cy.get('[data-testid="navigationSettings"]').click()
    cy.get('input[data-testid="setting-maxFrames"]')
      .clear()
      .type('1')
    // close settings again
    cy.get('[data-testid="navigationSettings"]').click()

    cy.get('[data-testid="frame"]').should('have.length', 1)
    cy.get('[data-testid="frame"]').should('contain', 'RETURN 3')

    // write some commands, make sure not more than one frame at a time
    cy.executeCommand('RETURN 1')
    cy.executeCommand('RETURN 2')

    cy.get('[data-testid="frame"]').should('have.length', 1)

    // reload page
    cy.reload()
    cy.get('[data-testid="frame"]').should('have.length', 1, { timeout: 3000 })

    // write some commands, make sure not more than one frame at a time
    cy.executeCommand('RETURN 1')
    cy.executeCommand('RETURN 2')

    cy.get('[data-testid="frame"]').should('have.length', 1)

    // change settings to 3, then write commands and make sure it will be set to 3 frames at most
    cy.get('[data-testid="navigationSettings"]').click()
    cy.get('input[data-testid="setting-maxFrames"]')
      .clear()
      .type('3')
    // close settings again
    cy.get('[data-testid="navigationSettings"]').click()
    cy.executeCommand('RETURN 1')
    cy.executeCommand('RETURN 2')
    cy.executeCommand('RETURN 3')
    cy.executeCommand('RETURN 4')

    cy.get('[data-testid="frame"]').should('have.length', 3)
  })
})
