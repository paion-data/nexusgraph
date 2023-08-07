// Copyright 2023 Paion Data. All rights reserved.
Cypress.Commands.add("login", ({ username, password }) => {
  cy.intercept("GET", "http://localhost:8080/").as("userLogin");
  cy.origin(
    Cypress.env("logtoEndpointUrl").concat("/sign-in"),
    { args: { username, password } },
    ({ username, password }) => {
      cy.visit("http://localhost:8080/", { failOnStatusCode: false });

      cy.get('input[name="identifier"]').type(username);
      cy.get('button[type="submit"]').click();
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
    }
  );
  cy.wait("@userLogin");
});
