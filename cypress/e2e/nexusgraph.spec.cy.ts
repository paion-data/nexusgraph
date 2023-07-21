/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
describe("nexusgraph basic test", () => {
  it("Enter text in the editor and the corresponding node is generated in the graph", () => {
    cy.visit("http://localhost:8080/", { failOnStatusCode: false }).wait(1000);

    cy.intercept("POST", "/v1/data/entityExtraction", { fixture: "getEditorData.json" }).as("getEditorData");

    cy.get(".editor-paragraph").type("China").wait(1000);
    cy.get(".node").should("contain", "China").should("have.length", 6);
  });

  it('Click the menu "Expand" button to expand the neighbor node', () => {
    cy.visit("http://localhost:8080/", { failOnStatusCode: false });

    cy.intercept("POST", "/v1/data/entityExtraction", { fixture: "getEditorData.json" }).as("getEditorData");

    cy.get(".editor-paragraph").type("China").wait(1000);

    cy.get('[aria-label="graph-nodeBeijing"]').click();

    cy.intercept("POST", "/v1/data/expand", {
      fixture: "nodeExpandData.json",
    }).as("nodeExpandData");

    cy.get('g[class="node selected"] path:first').click().wait(1000);

    cy.get(".node").should("contain", "Shanghai");
  });
});

export {};
