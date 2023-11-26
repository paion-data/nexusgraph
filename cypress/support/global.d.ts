// Copyright 2023 Paion Data. All rights reserved.
declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Login via UI
     *
     * @example cy.login({username: "user", password: "password"})
     */
    login({ userEmail, password }: Record<string, string>, isDryRun?: boolean): Chainable<void>;
    newGraph(): Chainable<void>;
    interceptAstraios(): Chainable<void>;
  }
}
