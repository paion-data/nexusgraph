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
import { isAura, getDesktopContext } from '../support/utils'

let appContextListener: any

describe('Neo4j Desktop environment', () => {
  before(() => {
    cy.visit(Cypress.config('url'), {
      onBeforeLoad: win => {
        win.neo4jDesktopApi = {
          getContext: () =>
            Promise.resolve(getDesktopContext(Cypress.config, 'host')),
          onContextUpdate: (fn: any) => (appContextListener = fn.bind(fn))
        }
      }
    })
  })
  // No need to test these in Aura
  if (!isAura()) {
    it('can auto connect using host + post fields', () => {
      const frames = cy.get('[data-testid="frameCommand"]', { timeout: 10000 })
      frames.should('have.length', 2)

      // Auto connected = :play start
      frames.first().contains(':play start')
      cy.wait(1000)
    })
    it('switches connection when that event is triggered using host + port fields', () => {
      cy.executeCommand(':clear')
      cy.wait(1000).then(() => {
        appContextListener(
          { type: 'GRAPH_ACTIVE', id: 'test' },
          getDesktopContext(Cypress.config, 'host')
        )
      })

      const frames = cy.get('[data-testid="frameCommand"]', { timeout: 10000 })
      frames.should('have.length', 1)

      frames.first().contains(':server switch success')

      cy.get('[data-testid="frame"]', { timeout: 10000 })
        .first()
        .should('contain', 'Connection updated')
    })

    it('displays disconnected banner and connection failed frame when initial state is INACTIVE', () => {
      cy.visit(Cypress.config('url'), {
        onBeforeLoad: win => {
          win.neo4jDesktopApi = {
            getContext: () =>
              Promise.resolve(
                getDesktopContext(Cypress.config, 'host', 'INACTIVE')
              )
          }
        }
      })

      const frames = cy.get('[data-testid="frameCommand"]', { timeout: 10000 })
      frames.should('have.length', 1)

      frames.first().contains(':server switch fail')

      cy.get('[data-testid="disconnectedBanner"]', { timeout: 10000 })
        .first()
        .should('contain', 'Database access not available.')
    })
  }
})
