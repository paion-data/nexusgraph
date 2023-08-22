/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
it("Translate browser through i18n", () => {
  cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);

  const userLang = navigator.language;

  if (userLang === "zh-CN") {
    cy.get("div").should("contain", "概述");
  } else {
    cy.get("div").should("contain", "Overview");
  }
});
