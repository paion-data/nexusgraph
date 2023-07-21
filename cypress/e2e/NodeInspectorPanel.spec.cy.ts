// Copyright 2023 Paion Data. All rights reserved.

describe("Graph browser stats panel E2E tests", () => {
  it("Panel can reflect the INITIAL graph rendering stats", () => {
    cy.visit("http://localhost:8080/").wait(1000);

    cy.intercept(
      "POST",
      "*/v1/data/entityExtraction",
      {
        fixture: "single-rdf-pair-graph.json"
      }
    );

    cy.get(".editor-paragraph").type("testText").wait(2000);
    cy.get('[data-testid="property-details-overview-node-label-*"]').should("have.text", "* (2)");
  });
});

export {};
