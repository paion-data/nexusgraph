// Copyright 2023 Paion Data. All rights reserved.
describe("i18n", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it.skip("The i18n translates the text to English when the browser language is English", () => {
    cy.setBrowserLanguage("en-US", ["en"], ["en"]);
    cy.login({ userEmail: Cypress.env("userEmail"), password: Cypress.env("password") });

    cy.newGraph();

    cy.get("input[data-testid=graphTitle]").should("have.value", "Unamed Graph");
  });

  it.skip("The i18n translates the text to Chinese when the browser language is Chinese", () => {
    cy.setBrowserLanguage("zh-CN", ["zh"], ["zh"]);
    cy.login({ userEmail: Cypress.env("userEmail"), password: Cypress.env("password") });

    cy.newGraph();

    cy.get("input[data-testid=graphTitle]").should("have.value", "无标题笔记");
  });
});
