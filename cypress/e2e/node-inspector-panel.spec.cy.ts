// Copyright 2023 Paion Data. All rights reserved.
describe("Graph browser stats panel E2E tests", () => {
  it("Panel can reflect the INITIAL graph rendering stats ", () => {
    cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);

    cy.intercept("POST", "http://localhost:3000/entityExtraction", { fixture: "single-rdf-pair-graph.json" });

    cy.get(".editor-paragraph").type("testText");
    cy.get('[data-testid="property-details-overview-node-label-*"]').should("have.text", "* (2)");
  });
});

export {};
