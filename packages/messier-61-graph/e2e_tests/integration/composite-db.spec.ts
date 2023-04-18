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
import { isAura, isEnterpriseEdition } from '../support/utils'

describe('composite database', () => {
  before(function () {
    cy.visit(Cypress.config('url')).title().should('include', 'Neo4j Browser')
    cy.wait(3000)
    cy.ensureConnection()
  })

  if (
    Cypress.config('serverVersion') >= 5.0 &&
    !isAura() &&
    isEnterpriseEdition()
  ) {
    it('can query composite db and show results', () => {
      cy.executeCommand(':clear')
      const query = `create database compdb1;create database compdb2;use compdb1 create (:Poke {{}name: "Treecko"{}})-[:EVOLVES_INTO]->(:Poke {{}name: "Grovyle"{}});CREATE COMPOSITE DATABASE both;CREATE ALIAS both.cd1 FOR DATABASE compdb1;CREATE ALIAS both.cd2 FOR DATABASE compdb2;`

      cy.executeCommand(query)
      cy.get('[data-testid="multi-statement-list-icon"]')
        .last()
        .invoke('attr', 'title')
        .should('equal', 'Status: success')

      cy.executeCommand('SHOW DATABASES')
      cy.contains('both')
      cy.resultContains('"both"')

      cy.executeCommand(':use both')
      cy.executeCommand(':clear')
      cy.executeCommand(
        "CALL {{} USE both.cd1 MATCH path=(p:Poke)-[:EVOLVES_INTO]->(m) where p.name = 'Treecko' return path as p limit 10 {}} return p;"
      )
      cy.waitForCommandResult()

      cy.get('[data-testid="vizInspector"]', { timeout: 5000 }).contains(
        'EVOLVES_INTO'
      )

      cy.get('circle.b-outline', { timeout: 10000 }).eq(0).should('be.visible')

      // cleanup
      cy.executeCommand(`
    drop alias both.cd1 for database;
    drop alias both.cd2 for database;
    drop database compdb1;
    drop database compdb2;
    drop database both;
     `)

      cy.executeCommand(':use neo4j')
      cy.executeCommand(':clear')
    })
  }
})
