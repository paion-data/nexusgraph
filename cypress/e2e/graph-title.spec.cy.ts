// Copyright 2023 Paion Data. All rights reserved.
describe("Graph title dynamics", () => {
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
});
