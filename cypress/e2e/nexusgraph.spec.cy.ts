/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
describe("nexusgraph basic test", () => {
  beforeEach(() => {
    cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);

    if (Cypress.env("nodeEnv") === "development") {
      cy.intercept("POST", "http://localhost:3000/entityExtraction", { fixture: "getEditorData.json" });
    } else {
      cy.intercept("POST", "/v1/data/entityExtraction", { fixture: "getEditorData.json" }).as("getEditorData");
    }
  });

  it("Enter text in the editor and the corresponding node is generated in the graph", () => {
    cy.get(".editor-paragraph").type("China");
    cy.get(".node").should("contain", "China").should("have.length", 6);
  });

  it('Click the menu "Expand" button to expand the neighbor node', () => {
    cy.get(".editor-paragraph").type("China");

    cy.get('[aria-label="graph-nodeBeijing"]').click();

    if (Cypress.env("nodeEnv") == "development") {
      cy.intercept("POST", "http://localhost:3000/expand", {
        fixture: "nodeExpandData.json",
      }).as("nodeExpandData");
    } else {
      cy.intercept("POST", "/v1/data/expand", {
        fixture: "nodeExpandData.json",
      }).as("nodeExpandData");
    }

    cy.get('g[class="node selected"] path:first').click();

    cy.get(".node").should("contain", "Shanghai");
  });
});

export {};
