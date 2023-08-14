/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
describe("nexusgraph basic test", () => {
  beforeEach(() => {
    cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  });

  it("Enter text in the editor and the corresponding node is generated in the graph", () => {
    cy.intercept("POST", "/v1/data/entityExtraction", { fixture: "getEditorData.json" }).as("getEditorData");

    cy.get(".editor-paragraph").type("China");
    cy.get(".node").should("contain", "China").should("have.length", 6);
  });

  it('Click the menu "Expand" button to expand the neighbor node', () => {
    cy.intercept("POST", "/v1/data/entityExtraction", { fixture: "getEditorData.json" }).as("getEditorData");

    cy.get(".editor-paragraph").type("China");

    cy.get('[aria-label="graph-nodeBeijing"]').click();

    cy.intercept("POST", "/v1/data/expand", {
      fixture: "nodeExpandData.json",
    }).as("nodeExpandData");

    cy.get('g[class="node selected"] path:first').click();

    cy.get(".node").should("contain", "Shanghai");
  });
});

export {};
