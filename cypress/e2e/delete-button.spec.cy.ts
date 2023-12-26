// Copyright 2023 Paion Data. All rights reserved.
describe("Delete button removes displaying graph both from UI and database", () => {
  before(() => {
    cy.openApp();
  });

  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("if user has no graph (e.g. first-time login or graph list is empty), button is disabled", () => {
    cy.get('[data-testid="deleteButton"]').should("not.exist");
  });

  it("when user creates a graph, button becomes active", () => {
    cy.newGraph();

    cy.get('[data-testid="deleteButton"]').should("exist");
  });

  it("when user deletes the graph, the button becomes in-active again", () => {
    cy.get('[data-testid="deleteButton"]').click();

    cy.get('[data-testid^="graphListItem-"]').should("not.exist");
    cy.get("svg").find(`[aria-label^="graph-node"]`).should("not.exist");

    cy.get('[data-testid="deleteButton"]').should("not.exist");
  });
});
