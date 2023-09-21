// Copyright 2023 Paion Data. All rights reserved.
beforeEach(() => {
  if (Cypress.env("nodeEnv") == "production") {
    cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  } else {
    cy.intercept("POST", "http://localhost:8080/v1/data/", { fixture: "astraiosGraphqlResponse.json" }).wait(5000);

    cy.visit("http://localhost:8080/", { failOnStatusCode: false });
  }
  cy.intercept("POST", "http://localhost:3000/entityExtraction", { fixture: "getEditorData.json" });

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
