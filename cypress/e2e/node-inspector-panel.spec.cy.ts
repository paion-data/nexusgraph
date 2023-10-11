// Copyright 2023 Paion Data. All rights reserved.
describe("Graph browser stats panel E2E tests", () => {
  beforeEach(() => {
    cy.initialConfig();

    cy.intercept("POST", Cypress.env("entityExtractionServer"), { fixture: "single-rdf-pair-graph.json" });
    cy.wait("@astraiosGraphqlRequest");
    cy.get(".editor-paragraph").clear();
    cy.get(".editor-paragraph").type("testText").wait(6000);
  });

  it("Panel can reflect the INITIAL graph rendering stats ", () => {
    cy.get('[data-testid="property-details-overview-node-label-*"]').should("have.text", "* (2)");
  });

  it("Node details panel displays the URL parameters of the node", () => {
    cy.get('[aria-label="graph-node2"]').click();
    cy.get('[data-testid="viz-details-pane-properties-table"]').should("contain", "url");
    cy.get('[data-testid="url"]')
      .children("td")
      .children("span")
      .children("a")
      .should("have.attr", "href", "https://baidu.com/");
  });
});

export {};
