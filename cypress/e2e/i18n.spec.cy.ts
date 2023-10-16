// Copyright 2023 Paion Data. All rights reserved.
it("The i18n translates the text to English when the browser language is English", () => {
  if (Cypress.env("nodeEnv") == "production") {
    cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  } else {
    cy.visit("http://localhost:3000/", {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, "language", { value: "en-US" });
        Object.defineProperty(win.navigator, "languages", { value: ["en"] });
        Object.defineProperty(win.navigator, "accept_languages", { value: ["en"] });
      },
    });
  }
  cy.get("input[id=noteTitleInput]").should("have.value", "Untitled Note");
});

it("The i18n translates the text to Chinese when the browser language is Chinese", () => {
  if (Cypress.env("nodeEnv") == "production") {
    cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  } else {
    cy.visit("http://localhost:3000/", {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, "language", { value: "zh-CN" });
        Object.defineProperty(win.navigator, "languages", { value: ["zh"] });
        Object.defineProperty(win.navigator, "accept_languages", { value: ["zh"] });
      },
    });
  }
  cy.get("input[id=noteTitleInput]").should("have.value", "无标题笔记");
});
