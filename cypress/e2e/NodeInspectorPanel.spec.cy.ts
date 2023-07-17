// Copyright 2023 Paion Data. All rights reserved.

describe("Graph browser stats panel E2E tests", () => {
  it("Panel can reflect the INITIAL graph rendering stats", () => {
    cy.visit("http://localhost:8080/").wait(1000);

    cy.intercept("GET", "/entityExtraction?text=testText", { fixture: "single-rdf-pair-graph.json" }).as(
      "getEditorData"
    );

    cy.get(".editor-paragraph").type("testText").wait(1000);
    cy.get('[data-testid="property-details-overview-node-label-*"]').should("have.text", "* (2)");
  });
});

export {};
