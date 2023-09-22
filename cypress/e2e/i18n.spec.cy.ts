// Copyright 2023 Paion Data. All rights reserved.
it("Translate browser through i18n", () => {
  cy.mockGraphqlResponse();

  if (Cypress.env("nodeEnv") == "production") {
    cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  } else {
    cy.visit("http://localhost:8080/", { failOnStatusCode: false });
  }

  const userLang = navigator.language;

  if (userLang === "zh-CN") {
    cy.get("div").should("contain", "概述");
  } else {
    cy.get("div").should("contain", "Overview");
  }
});
