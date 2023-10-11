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

describe('Saved Scripts', () => {
  before(function () {
    cy.visit(Cypress.config('url')).title().should('include', 'Neo4j Browser')
    cy.wait(3000)
    cy.connect('neo4j', Cypress.config('password'))
  })

  it('can save a result as favorite', () => {
    cy.executeCommand(':clear')
    cy.executeCommand('RETURN 1')
    cy.get('[data-testid=frame-Favorite]').click()

    // saved in the list and can populate editor
    cy.get('[data-testid="navicon-RETURN 1"').click({ force: true })
    cy.get('[data-testid="contextMenuEdit"').click()

    cy.get('[data-testid="currentlyEditing"]').contains('RETURN 1')
    // Editing script updates name and content
    cy.get('[data-testid="activeEditor"] textarea')
      .type(
        Cypress.platform === 'darwin'
          ? '{cmd}a {backspace}'
          : '{ctrl}a {backspace}'
      )
      .type('// Guide{shift}{enter}:play movies', { force: true })
    cy.get('[data-testid=editor-Favorite]').click()

    cy.get('[data-testid="scriptTitle-Guide"]').should('exist')
    cy.get('[data-testid="currentlyEditing"]').contains('Guide')
    cy.get('[data-testid=savedScriptsButton-Run]').click()
    cy.getFrames().contains('Movie Graph')

    // can delete
    cy.get('[data-testid="navicon-Guide"').click({ force: true })
    cy.get('[data-testid="contextMenuDelete"').click()
  })

  it('it can drag and drop a favorite in a folder', () => {
    cy.get('[data-testid=editor-discard]').click()
    cy.executeCommand(':clear')
    cy.executeCommand(':help cypher')
    cy.get('[data-testid=frame-Favorite]').click()
    cy.get('[data-testid="scriptTitle-:help cypher"]').should('exist')

    cy.get('[data-testid="savedScriptsButton-New folder"]').click()
    cy.get('[data-testid=editSavedScriptFolderName]').type('fldr{enter}')

    cy.get('[data-testid="scriptTitle-:help cypher"]').trigger('dragstart')

    cy.get('[data-testid=expandFolder-fldr]').trigger('drop', {
      // this is to make react-dnd happy
      dataTransfer: { files: [] }
    })

    cy.wait(500)
    cy.get('[data-testid=expandFolder-fldr]').trigger('dragend')

    // moved script should be in the folder
    cy.get('[data-testid="scriptTitle-:help cypher"]').should('not.exist')
    cy.get('[data-testid=expandFolder-fldr]').click()
    cy.get('[data-testid="scriptTitle-:help cypher"]').should('exist')

    // cleanup and delete the folder as well
    cy.get('[data-testid=navicon-fldr]').click({ force: true })
    cy.get('[data-testid=contextMenuRename]').click()
    cy.get('[data-testid=expandFolder-fldr]').should('not.exist')
    cy.get('[data-testid=navigationFavorites]').click()
  })

  it('it can use bulk delete', () => {
    cy.get('[data-testid=navigationFavorites]').click()
    cy.get('[data-testid=createNewFavorite]').click().click().click()

    const mod = Cypress.platform === 'darwin' ? '{cmd}' : '{ctrl}'
    // workaround to get meta clicks
    cy.get('body').type(mod, { force: true, release: false })

    cy.get('[data-testid="scriptTitle-Untitled favorite"]')
      .should('have.length', 3)
      .click({ multiple: true })
    cy.get('body').type(mod) // release mod
    cy.get('[data-testid=savedScriptsButton-Remove]').click()
    cy.get('[data-testid="scriptTitle-Untitled favorite"]').should('not.exist')
  })
})
