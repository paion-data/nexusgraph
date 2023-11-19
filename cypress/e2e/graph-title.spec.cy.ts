// Copyright 2023 Paion Data. All rights reserved.
describe("Graph title", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("if user has no graph (e.g. first-time login or graph list is empty), title section is not shown", () => {
    cy.get('[data-testid="graphTitle"]').should("not.exist");
  });

  it("when user creates a graph, title section shows up", () => {
    cy.newGraph();

    cy.get('[data-testid="graphTitle"]').should("exist");
  });

  it("reflects the updated title immediately in sidebase list when user update title", () => {
    cy.get('[data-testid="graphTitle"]')
      .click({ force: true })
      .clear()
      .type("Modified Title")
      .get('[data-testid^="graphListItem-"]')
      .contains("Modified Title");
  });

  it("still preserves the updated title after a page reloadl; i.e. change gets persisted into database", () => {
    cy.get('[data-testid="graphTitle"]')
      .click({ force: true })
      .clear()
      .type("Yet Another Modified Title")
      .reload()
      .get('[data-testid^="graphListItem-"]')
      .contains("Yet Another Modified Title");
  });
});
