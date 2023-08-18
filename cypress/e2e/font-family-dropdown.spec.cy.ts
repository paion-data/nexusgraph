// Copyright 2023 Paion Data. All rights reserved.
beforeEach(() => {
  cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  cy.intercept("POST", "/v1/data/entityExtraction", { fixture: "getEditorData.json" });
  cy.get(".editor-paragraph").type("China");
  cy.get('span[data-lexical-text = "true"]').type("{selectall}");

  cy.get('[aria-label = "Formatting options for font family"]').find(".text").should("have.text", "Arial");
});

afterEach(() => {
  cy.get('[aria-label = "Formatting options for font family"]').click();
  cy.contains("Arial").click();
  cy.get('[aria-label = "Formatting options for font family"]').find(".text").should("have.text", "Arial");
  cy.get(".editor-paragraph").find("span").and("have.css", "font-family").should("include", "Arial");
});

describe("FontFamilyDropDown button E2E test", () => {
  const fontFamily = ["Courier New", "Georgia", "Times New Roman", "Trebuchet MS", "Verdana"];
  for (let i = 0; i < fontFamily.length; i++) {
    it(`${fontFamily[i]} button has an effect in dropdown`, () => {
      cy.get('[aria-label = "Formatting options for font family"]').click();
      cy.contains(fontFamily[i]).click();
      cy.get('[aria-label = "Formatting options for font family"]').find(".text").should("have.text", fontFamily[i]);
      cy.get(".editor-paragraph").find("span").and("have.css", "font-family").should("include", fontFamily[i]);
    });
  }
});
