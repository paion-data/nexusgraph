// Copyright 2023 Paion Data. All rights reserved.
Cypress.Commands.add("login", ({ userEmail, password }, isDryRun = true) => {
  if (!isDryRun) {
    cy.origin(
      Cypress.env("logtoEndpointUrl").concat("/sign-in"),
      { args: { userEmail, password } },
      ({ userEmail, password }) => {
        cy.visit("http://localhost:3000", { failOnStatusCode: false });

        cy.get('input[name="identifier"]').type(userEmail);
        cy.get('button[type="submit"]').click();
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();
      }
    );
  }
});

Cypress.Commands.add("newGraph", () => {
  cy.intercept("POST", Cypress.env("entityExtractionServer"), { fixture: "single-rdf-tuple-from-theresa.json" });

  cy.get("button[id='newGraphButton']")
    .click({ force: true })
    .get("[data-testid='newGraphMethodButton-NLP']")
    .click({ force: true })
    .get("textarea", { timeout: 10000 })
    .click({ force: true })
    .type("我爱中国")
    .get("[data-testid='newGraphButton-NLP']", { timeout: 10000 })
    .click({ force: true })
    .get('[data-testid^="graphListItem-"]', { timeout: 10000 })
    .should("exist")
    .get("svg")
    .find(`[aria-label^="graph-node"]`)
    .should("exist");
});

Cypress.Commands.add("interceptAstraios", () => {
  cy.intercept("POST", Cypress.env("astraiosGraphqlEndpoint"), { fixture: "astraios-graphql-response.json" }).as(
    "astraiosGraphqlRequest"
  );
});
