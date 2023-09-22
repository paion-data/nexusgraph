// Copyright 2023 Paion Data. All rights reserved.
beforeEach(() => {
  cy.intercept("POST", Cypress.env("astraiosGraphqlEndpoint"), { fixture: "astraiosGraphqlResponse.json" });

  if (Cypress.env("nodeEnv") == "production") {
    cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  } else {
    cy.visit("http://localhost:8080/", { failOnStatusCode: false });
  }
  cy.intercept("POST", Cypress.env("entityExtractionServer"), { fixture: "getEditorData.json" });

  cy.get(".editor-paragraph").type("China").wait(10000);
  cy.get(".node").should("contain", "China");
});

it("Export the graph in PNG format", () => {
  cy.get("button[data-testid='export-dropdown']").click();
  cy.get('a[data-testid="exportPNGButton"]').click().wait(5000);
  cy.readFile("cypress/downloads/graph.png").should("exist");
});

it("Export the graph in SVG format", () => {
  cy.get("button[data-testid='export-dropdown']").click();
  cy.get('a[data-testid="exportSVGButton"]').click().wait(5000);
  cy.readFile("cypress/downloads/graph.svg").should("exist");
});
