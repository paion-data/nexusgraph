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

const EditorArea = '[data-testid="activeEditor"]'
const { viewportWidth, viewportHeight } = Cypress.config()
const MainEditorMaxHeight = 286
const SideBarWidth = 60
const MainEditorPadding = 10
const MainEditorWidth = viewportWidth - SideBarWidth - 2 * MainEditorPadding
const FrameEditorMaxHeight = 276
const FrameEditorWidth = viewportWidth - 225
const FrameEditorFullscreenWidth = viewportWidth - 135
const FrameMaxHeight = 618
const FrameFullscreenHeight = viewportHeight - 3

describe('Neo4j Browser', () => {
  before(function () {
    cy.visit(Cypress.config('url')).title().should('include', 'Neo4j Browser')
    cy.wait(3000)
    const password = Cypress.config('password')
    cy.connect('neo4j', password)
  })

  it('can fullscreen main editor with shortcut', () => {
    const { viewportWidth, viewportHeight } = Cypress.config()

    cy.get(EditorArea).type('{shift}\n'.repeat(20))
    cy.get(EditorArea).invoke('height').should('equal', MainEditorMaxHeight)

    cy.get(EditorArea).invoke('width').should('equal', MainEditorWidth)

    // Go to fullscreen
    cy.get(EditorArea).type('{esc}')

    cy.get(EditorArea).invoke('height').should('equal', viewportHeight)

    cy.get(EditorArea).invoke('width').should('equal', viewportWidth) // editor is now full width

    // we can leave fullscreen
    cy.get(EditorArea).type('{esc}')
    cy.get(EditorArea).invoke('height').should('equal', MainEditorMaxHeight)

    cy.get(EditorArea).invoke('width').should('equal', MainEditorWidth)
  })

  it('can fullscreen main editor by clicking fullscreen icon', () => {
    const { viewportWidth, viewportHeight } = Cypress.config()

    cy.get(EditorArea).type('{shift}\n'.repeat(20))
    cy.get(EditorArea).invoke('height').should('equal', MainEditorMaxHeight)

    cy.get(EditorArea).invoke('width').should('equal', MainEditorWidth)

    cy.get('[data-testid="editor-fullscreen"]').should('exist')

    cy.get('[data-testid="editor-fullscreen"]').click()

    cy.get(EditorArea).invoke('height').should('equal', viewportHeight)

    cy.get(EditorArea).invoke('width').should('equal', viewportWidth)

    cy.get('[data-testid="editor-fullscreen"]').click()
    cy.get(EditorArea).invoke('height').should('equal', MainEditorMaxHeight)

    cy.get(EditorArea).invoke('width').should('equal', MainEditorWidth)
  })

  it('re-usable frame can also use fullscreen', () => {
    cy.executeCommand(':clear')
    cy.executeCommand('return 1')
    cy.get('[data-testid="frameCommand"]').contains('return 1').click()

    cy.get('[id^=monaco-]').eq(1).type('{shift}\n'.repeat(20))

    cy.get('[id^=monaco-]')
      .eq(1)
      .invoke('height')
      .should('equal', FrameEditorMaxHeight)

    cy.get('[id^=monaco-]')
      .eq(1)
      .closest('article')
      .invoke('height')
      .should('equal', FrameMaxHeight)

    cy.get('[id^=monaco-]')
      .eq(1)
      .invoke('width')
      .should('equal', FrameEditorWidth) // normal reusable-editor width

    // goto fullscreen
    cy.get('[id^=monaco-]').eq(1).type('{esc}')

    cy.get('[id^=monaco-]')
      .eq(1)
      .invoke('height')
      .should('equal', FrameEditorMaxHeight) // reusable keeps the same height on fullscren but content take up whole screen

    cy.get('[id^=monaco-]')
      .eq(1)
      .closest('article')
      .invoke('height')
      .should('equal', FrameFullscreenHeight)

    cy.get('[id^=monaco-]')
      .eq(1)
      .invoke('width')
      .should('equal', FrameEditorFullscreenWidth)

    cy.get('[title="Close fullscreen"]').click()

    cy.get('[id^=monaco-]')
      .eq(1)
      .invoke('height')
      .should('equal', FrameEditorMaxHeight)

    cy.get('[id^=monaco-]')
      .eq(1)
      .invoke('width')
      .should('equal', FrameEditorWidth)

    // frame height back to normal as well
    cy.get('[id^=monaco-]')
      .eq(1)
      .closest('article')
      .invoke('height')
      .should('equal', FrameMaxHeight)
  })

  it('can collapse and un-collapse frame', () => {
    cy.executeCommand(':clear')
    cy.executeCommand(
      'CREATE (a:TestLabel)-[:CONNECTS]->(b:TestLabel) RETURN a, b'
    )
    cy.get('button[title="Collapse"]').click()

    cy.get('[data-testid="cypherFrameSidebarVisualization"]').should(
      'not.be.visible'
    )

    cy.get('button[title="Expand"]').click()

    cy.get('[data-testid="cypherFrameSidebarVisualization"]').should('exist')
  })
  it('can collapse in fullscreen to leave fullscreen', () => {
    cy.executeCommand(':clear')
    cy.executeCommand(
      'CREATE (a:TestLabel)-[:CONNECTS]->(b:TestLabel) RETURN a, b'
    )
    cy.get('button[title="Fullscreen"]').click()
    cy.get('button[title="Collapse"]').click()

    cy.get('[data-testid="cypherFrameSidebarVisualization"]').should(
      'not.be.visible'
    )

    cy.get('button[title="Expand"]').click()

    cy.get('[data-testid="cypherFrameSidebarVisualization"]').should('exist')
  })
  it('can remove the frame by pressing the x button', () => {
    cy.executeCommand(':clear')
    cy.executeCommand(
      'CREATE (a:TestLabel)-[:CONNECTS]->(b:TestLabel) RETURN a, b'
    )

    cy.get('[data-testid="cypherFrameSidebarVisualization"]').should('exist')

    cy.get('button[title="Close"]').click()

    cy.get('[data-testid="cypherFrameSidebarVisualization"]').should(
      'not.exist'
    )
  })
  it('can pin and unpin frame', () => {
    cy.executeCommand(':clear')
    cy.executeCommand('RETURN 1')
    cy.get('button[title="Pin at top"]').click()
    cy.executeCommand('RETURN 2')

    cy.get('[data-testid="frameCommand"]').first().contains('RETURN 1')

    cy.get('button[title="Pin at top"]').first().click()
    cy.executeCommand('RETURN 3')

    cy.get('[data-testid="frameCommand"]').first().contains('RETURN 3')
  })
})
