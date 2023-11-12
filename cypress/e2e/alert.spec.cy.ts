// Copyright 2023 Paion Data. All rights reserved.
beforeEach(() => {
  cy.visit("http://localhost:3000/");
});

it("Displays the alert when nlp data is recognized as null", () => {
  cy.intercept("POST", Cypress.env("entityExtractionServer"), {
    body: { links: [], nodes: [] },
  });

  cy.newGraph();

  cy.get("div[id='alert']").should("exist");
});

it("Alert is not displayed when nlp data is recognized as not null", () => {
  cy.intercept("POST", Cypress.env("entityExtractionServer"), { fixture: "single-rdf-tuple-from-theresa.json" });

  cy.newGraph();

  cy.get("div[id='alert']").should("not.empty");
});
