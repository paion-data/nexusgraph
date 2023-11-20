// Copyright 2023 Paion Data. All rights reserved.
describe("'Integration'-style tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("deleting graph when there is only 1 graph", () => {
    cy.newGraph()
      .get('[data-testid="deleteButton"]')
      .click({ force: true })
      .get('[data-testid^="graphListItem-"]')
      .should("not.exist")
      .get("svg")
      .find(`[aria-label^="graph-node"]`)
      .should("not.exist");
  });

  it("deleting the last graph when there are multiple graphs", () => {
    cy.newGraph()
      .newGraph()
      .get('[data-testid="deleteButton"]')
      .click({ force: true })
      .get('[data-testid^="graphListItem-"]')
      .should("exist")
      .get("svg")
      .find(`[aria-label^="graph-node"]`)
      .should("exist");
  });
});
