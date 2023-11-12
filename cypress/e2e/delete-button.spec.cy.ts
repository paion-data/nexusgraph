// Copyright 2023 Paion Data. All rights reserved.
describe("Delete button removes displaying graph both from UI and database", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("if user has no graph (e.g. first-time login or graph list is empty), button is disabled", () => {
    cy.get(".trashIcon").should("be.disabled");
  });

  it("when user creates a graph, button becomes active", () => {
    cy.newGraph();

    cy.get('[id^="graphListItem-"]').should("exist");
    cy.get("svg").find(`[aria-label^="graph-node"]`).should("exist");

    cy.get(".trashIcon").should("be.enabled");
  });

  it("when user deletes the graph, the button becomes in-active again", () => {
    cy.get(".trashIcon").click();

    cy.get('[id^="graphListItem-"]').should("not.exist");
    cy.get("svg").find(`[aria-label^="graph-node"]`).should("not.exist");

    cy.get(".trashIcon").should("be.disabled");
  });
});
