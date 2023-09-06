// Copyright 2023 Paion Data. All rights reserved.
describe("Graph browser stats panel E2E tests", () => {
  it("Panel can reflect the INITIAL graph rendering stats ", () => {
    if (Cypress.env("nodeEnv") == "production") {
      cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
    } else {
      cy.visit("http://localhost:8080/", { failOnStatusCode: false });
    }

    cy.intercept("POST", "http://localhost:3000/entityExtraction", { fixture: "single-rdf-pair-graph.json" });

    cy.get(".editor-paragraph").type("testText").wait(6000);
    cy.get('[data-testid="property-details-overview-node-label-*"]').should("have.text", "* ( o_O )");
  });
});

export {};
