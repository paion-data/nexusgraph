// Copyright 2023 Paion Data. All rights reserved.
describe("Graph browser stats panel E2E tests", () => {
  it("Panel can reflect the INITIAL graph rendering stats ", () => {
    cy.initialConfig();

    cy.intercept("POST", Cypress.env("entityExtractionServer"), { fixture: "single-rdf-pair-graph.json" });
    cy.wait("@astraiosGraphqlRequest");
    cy.get(".editor-paragraph").clear();
    cy.get(".editor-paragraph").type("testText").wait(6000);
    cy.get('[data-testid="property-details-overview-node-label-*"]').should("have.text", "* (2)");
  });
});

export {};
