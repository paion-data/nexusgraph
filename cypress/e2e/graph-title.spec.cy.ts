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

  it("When user update title, new title is reflected in both sidebar list as well as after being refreshed", () => {
    cy.get('[data-testid="graphTitle"]').click({ force: true }).clear().type("Modified Title");

    cy.get('[data-testid="graphTitle"]').click({ force: true }).should("have.value", "Modified Title");

    cy.reload();
    cy.get('[data-testid^="graphListItem-"]').contains("Modified Title"); // making sure the edit gets persisted
  });
});
