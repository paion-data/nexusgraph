// Copyright 2023 Paion Data. All rights reserved.
Cypress.Commands.add("login", ({ username, password }) => {
  cy.origin(
    Cypress.env("logtoEndpointUrl").concat("/sign-in"),
    { args: { username, password } },
    ({ username, password }) => {
      cy.visit("https://app.nexusgraph.com/", { failOnStatusCode: false });

      cy.get('input[name="identifier"]').type(username);
      cy.get('button[type="submit"]').click();
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
    }
  );
});
