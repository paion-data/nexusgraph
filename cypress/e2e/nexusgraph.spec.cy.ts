// Copyright 2023 Paion Data. All rights reserved.
describe("nexusgraph basic test", () => {
  beforeEach(() => {
    cy.initialConfig();
  });

  it("Enter text in the editor and the corresponding node is generated in the graph", () => {
    cy.get(".editor-paragraph").type("China").wait(5000);
    cy.get(".node").should("contain", "China").should("have.length", 6);
  });

  it('Click the menu "Expand" button to expand the neighbor node', () => {
    cy.get(".editor-paragraph").type("China").wait(5000);

    cy.get('[aria-label="graph-nodeBeijing"]').click();

    cy.intercept("POST", Cypress.env("nodeExpand"), {
      fixture: "nodeExpandData.json",
    }).as("nodeExpandData");

    cy.get('g[class="node selected"] path:first').click();

    cy.get(".node").should("contain", "Shanghai");
  });
});

export {};
