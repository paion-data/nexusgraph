// Copyright 2023 Paion Data. All rights reserved.
Cypress.Commands.add("login", ({ userEmail, password }) => {
  cy.origin(
    Cypress.env("logtoEndpointUrl").concat("/sign-in"),
    { args: { userEmail, password } },
    ({ userEmail, password }) => {
      cy.visit("http://localhost:3000", { failOnStatusCode: false });

      cy.get('input[name="identifier"]').type(userEmail);
      cy.get('button[type="submit"]').click();
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
    }
  );
});

Cypress.Commands.add("initialConfig", () => {
  cy.intercept("POST", Cypress.env("astraiosGraphqlEndpoint"), { fixture: "astraios-graphql-response.json" }).as(
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

Cypress.Commands.add("setBrowserLanguage", (language, languages, acceptLanguages) => {
  cy.visit("http://localhost:3000/home", {
    onBeforeLoad(win) {
      Object.defineProperty(win.navigator, "language", { value: language });
      Object.defineProperty(win.navigator, "languages", { value: languages });
      Object.defineProperty(win.navigator, "accept_languages", { value: acceptLanguages });
    },
  });
});
