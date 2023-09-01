/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
beforeEach(() => {
  if (process.env.NODE_ENV == "production") {
    cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  } else {
    cy.visit("http://localhost:8080/", { failOnStatusCode: false });
  }

  cy.get(".editor-paragraph").type("Jane").wait(10000);
  cy.get(".node").should("contain", "Jane");
});

it("Export the graph in PNG format", () => {
  cy.get("button[data-testid='export-dropdown']").click();
  cy.get('a[data-testid="exportPNGButton"]').click();
  cy.readFile("cypress/downloads/graph.png").should("exist");
});

it("Export the graph in SVG format", () => {
  cy.get("button[data-testid='export-dropdown']").click();
  cy.get('a[data-testid="exportSVGButton"]').click();
  cy.readFile("cypress/downloads/graph.svg").should("exist");
});
