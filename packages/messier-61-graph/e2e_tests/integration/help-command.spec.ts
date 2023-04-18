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

describe('Help command', () => {
  before(function() {
    cy.visit(Cypress.config('url'))
      .title()
      .should('include', 'Neo4j Browser')
    cy.wait(3000)
  })
  it('can `:help` command', () => {
    cy.executeCommand(':clear')
    const query = ':help'
    cy.executeCommand(query)

    let frame = cy.getFrames()

    // Make sure first loads
    frame
      .should('have.length', 1)
      .should('contain', 'Neo4j Browser is a command shell')

    // Click a help topic
    frame.contains('help commands').click()

    frame = cy.getFrames()

    // Make sure it loads in same frame
    frame
      .should('have.length', 1)
      .should('contain', 'In addition to composing and running Cypher queries')

    // Click back in stack
    cy.getPrevInFrameStackBtn().click()
    frame = cy.getFrames()

    // Make sure we're back
    frame
      .should('have.length', 1)
      .should('contain', 'Neo4j Browser is a command shell')

    // Click forward
    cy.getNextInFrameStackBtn().click()
    frame = cy.getFrames()
    frame
      .should('have.length', 1)
      .should('contain', 'In addition to composing and running Cypher queries')

    // Click new topic
    frame.contains('help auto').click()
    frame = cy.getFrames()

    frame
      .should('have.length', 1)
      .should(
        'contain',
        'Execute a Cypher query within an auto-committing transaction'
      )

    // Then click back twice
    cy.getPrevInFrameStackBtn().click()
    cy.getPrevInFrameStackBtn().click()
    frame = cy.getFrames()

    // And we should be back
    frame
      .should('have.length', 1)
      .should('contain', 'Neo4j Browser is a command shell')

    // Click something else
    frame.contains('play concepts').click()

    // We should now have two frames
    cy.getFrames().should('have.length', 2)
  })
})
