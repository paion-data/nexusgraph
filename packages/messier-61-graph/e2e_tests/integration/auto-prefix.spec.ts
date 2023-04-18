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
describe(':auto prefix in browser', () => {
  before(() => {
    cy.visit(Cypress.config('url')).title().should('include', 'Neo4j Browser')
    cy.wait(3000)
    cy.ensureConnection()
  })
  beforeEach(() => {
    cy.executeCommand(':clear')
  })

  if (Cypress.config('serverVersion') < 5) {
    it('shows help link when running period commit without :auto', () => {
      cy.executeCommand('USING PERIODIC COMMIT RETURN "Verdanturf"')
      cy.getFrames().contains('ERROR')
      cy.getFrames().contains(':auto')
    })

    it('adding :auto enables running periodic commit', () => {
      cy.executeCommand(':auto USING PERIODIC COMMIT RETURN "Laverre";')
      // the only valid PERIODIC COMMIT queries require csv files on
      // the server, so as a shortcut we're just looking for a new error message
      cy.getFrames().contains('ERROR')
      cy.getFrames().contains(/LOAD/i)
    })
  }

  if (Cypress.config('serverVersion') >= 5) {
    it('shows help link when running CALL IN TRANSACTIONS without :auto', () => {
      cy.executeCommand(`CALL {{} RETURN 2 as x {}} IN TRANSACTIONS RETURN 2;`)
      cy.getFrames().contains('ERROR')
      cy.getFrames().contains(':auto')
    })

    it('adding :auto enables running CALL IN TRANSACTIONS', () => {
      cy.executeCommand(
        `:auto CALL {{} RETURN 2 as x {}} IN TRANSACTIONS RETURN 2;`
      )
      cy.getFrames().should('not.contain', 'ERROR')
      cy.getFrames().contains('Started streaming 1 rec')
    })

    it('newline is allowed after :auto', () => {
      cy.executeCommand(':clear')
      cy.executeCommand(
        `:auto{shift}{enter}CALL {{} RETURN 2 as x {}} IN TRANSACTIONS RETURN 2;`
      )
      cy.getFrames().should('not.contain', 'ERROR')
      cy.getFrames().contains('Started streaming 1 rec')
    })
  }

  it('can use :auto command in multi-statements', () => {
    cy.executeCommand('create ();')
    cy.executeCommand(':clear')
    const query = `:auto CREATE (t:MultiStmtTest {{}name: "Pacifidlog"}) RETURN t;:auto CREATE (t:MultiStmtTest {{}name: "Wyndon"}) RETURN t;`
    cy.executeCommand(query)
    cy.get('[data-testid="frame"]', { timeout: 10000 }).should('have.length', 1)
    const frame = cy.get('[data-testid="frame"]', { timeout: 10000 }).first()
    frame.find('[data-testid="multi-statement-list"]').should('have.length', 1)
    frame
      .get('[data-testid="multi-statement-list-title"]')
      .should('have.length', 2)
    frame.get('[data-testid="multi-statement-list-title"]').eq(0).click()
    frame
      .get('[data-testid="multi-statement-list-content"]', { timeout: 10000 })
      .contains('SUCCESS')
    frame.get('[data-testid="multi-statement-list-title"]').eq(1).click()
    frame
      .get('[data-testid="multi-statement-list-content"]', { timeout: 10000 })
      .contains('SUCCESS')
    cy.executeCommand('match (n: MultiStmtTest) return n.name')
    cy.get('[role="cell"]').contains('Pacifidlog')
    cy.get('[role="cell"]').contains('Wyndon')
    cy.executeCommand('match (n: MultiStmtTest) delete n')
  })
})
