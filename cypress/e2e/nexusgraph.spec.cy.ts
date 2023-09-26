// Copyright 2023 Paion Data. All rights reserved.
describe("nexusgraph basic test", () => {
  beforeEach(() => {
    cy.intercept("POST", Cypress.env("astraiosGraphqlEndpoint"), { fixture: "astraiosGraphqlResponse.json" }).as(
      "astraiosGraphqlRequest"
    );

    if (Cypress.env("nodeEnv") == "production") {
      cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
    } else {
      cy.visit("http://localhost:3000/", { failOnStatusCode: false });
    }
    cy.intercept("POST", Cypress.env("entityExtractionServer"), { fixture: "getEditorData.json" });
    cy.wait("@astraiosGraphqlRequest");
    cy.get(".editor-paragraph").clear();
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
