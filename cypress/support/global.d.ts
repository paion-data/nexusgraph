// Copyright 2023 Paion Data. All rights reserved.
declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Login via UI
     *
     * @example cy.login({username: "user", password: "password"})
     */
    login({ username, password }: Record<string, string>): Chainable<void>;
    initialConfig(): Chainable<void>;
    setBrowserLanguage(language: string, languages: string[], accept_languages: string[]): Chainable<void>;
  }
}
