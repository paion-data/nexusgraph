// Copyright 2023 Paion Data. All rights reserved.
declare namespace Cypress {
  interface Chainable<Subject> {
    openApp(): Chainable<void>;
    login(userEmail: string, password: string): Chainable<void>;
    newGraph(): Chainable<void>;
    deleteAllGraphs(): Chainable<void>;
    interceptAstraios(): Chainable<void>;
    setBrowserLanguage(language: string, languages: string[], acceptLanguages: string[]): Chainable<void>;
  }
}
