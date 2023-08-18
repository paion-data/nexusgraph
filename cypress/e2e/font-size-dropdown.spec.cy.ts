// Copyright 2023 Paion Data. All rights reserved.
beforeEach(() => {
  cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  cy.intercept("POST", "/v1/data/entityExtraction", { fixture: "getEditorData.json" });
  cy.get(".editor-paragraph").type("China");
  cy.get('span[data-lexical-text = "true"]').type("{selectall}");
});

describe("FontSizeDropDown button E2E test", () => {
  const fontSize = ["12px", "13px", "14px", "15px", "16px", "17px", "18px", "19px", "20px"];
  for (let i = 0; i < fontSize.length; i++) {
    it(`${fontSize[i]} button has an effect in dropdown`, () => {
      cy.get('[aria-label = "Formatting options for font size"]').click();
      cy.contains(fontSize[i]).click();
      cy.get('[aria-label = "Formatting options for font size"]').find(".text").should("have.text", fontSize[i]);
      cy.get(".editor-paragraph").find("span").and("have.css", "font-size").should("include", fontSize[i]);
    });
  }
  // TODO - font size of 10px/11px is not working (https://github.com/facebook/lexical/issues/4888)
});
