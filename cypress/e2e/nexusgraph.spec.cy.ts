/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
describe("nexusgraph basic test", () => {
  it("Enter text in the editor and the corresponding node is generated in the graph", () => {
    cy.visit("http://localhost:8080/", { failOnStatusCode: false }).wait(1000);

    cy.intercept("GET", "/entityExtraction?text=China", { fixture: "getEditorData.json" }).as("getEditorData");

    cy.get(".editor-paragraph").type("China").wait(1000);
    cy.get(".node").should("contain", "China").should("have.length", 6);
  });

  it('Click the menu "Expand" button to expand the neighbor node', () => {
    cy.visit("http://localhost:8080/", { failOnStatusCode: false });

    cy.intercept("GET", "/entityExtraction?text=China", { fixture: "getEditorData.json" }).as("getEditorData");

    cy.get(".editor-paragraph").type("China").wait(1000);

    cy.get('[aria-label="graph-nodeBeijing"]').click();

    cy.intercept("GET", "/expand?node=%7B%22fields%22:%7B%22name%22:%22Beijing%22%7D,%22id%22:%22Beijing%22%7D", {
      fixture: "nodeExpandData.json",
    }).as("nodeExpandData");

    cy.get('g[class="node selected"] path:first').click().wait(1000);

    cy.get(".node").should("contain", "Shanghai");
  });
});

export {};
