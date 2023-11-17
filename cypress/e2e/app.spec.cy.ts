// Copyright 2023 Paion Data. All rights reserved.
describe("'Integration'-style tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("deleting graph when there is only 1 graph", () => {
    cy.newGraph();

    cy.get('[data-testid="deleteButton"]').click({ force: true });
    cy.get('[data-testid^="graphListItem-"]').should("not.exist");
    cy.get("svg").find(`[aria-label^="graph-node"]`).should("not.exist");
  });

  it("deleting the last graph when there are multiple graphs", () => {
    cy.newGraph();
    cy.newGraph();

    cy.get('[data-testid="deleteButton"]').click({ force: true });
    cy.get('[data-testid^="graphListItem-"]').should("exist");
    cy.get("svg").find(`[aria-label^="graph-node"]`).should("exist");
  });
});
