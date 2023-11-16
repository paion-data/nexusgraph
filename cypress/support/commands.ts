// Copyright 2023 Paion Data. All rights reserved.
Cypress.Commands.add("login", ({ userEmail, password }, isDryRun = true) => {
  if (!isDryRun) {
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
  }
});

Cypress.Commands.add("newGraph", () => {
  cy.get("button[id='newGraphButton']").click();

  const NLPMethodButton = cy.get("button[id='newGraphMethodButton-NLP']");
  NLPMethodButton.click();

  cy.get("textarea").type("我爱中国");
  const createGraphButton = cy.get("button[id='newGraphButton-NLP']");
  createGraphButton.click();

  cy.get('[data-testid="graphListItem-*"]', { timeout: 10000 }).should("exist");
  cy.get("svg").find(`[aria-label^="graph-node"]`).should("exist");
});

Cypress.Commands.add("interceptAstraios", () => {
  cy.intercept("POST", Cypress.env("astraiosGraphqlEndpoint"), { fixture: "astraios-graphql-response.json" }).as(
    "astraiosGraphqlRequest"
  );
});

Cypress.Commands.add("setBrowserLanguage", (language, languages, acceptLanguages) => {
  cy.visit("http://localhost:3000/", {
    onBeforeLoad(win) {
      Object.defineProperty(win.navigator, "language", { value: language });
      Object.defineProperty(win.navigator, "languages", { value: languages });
      Object.defineProperty(win.navigator, "accept_languages", { value: acceptLanguages });
    },
  });
});
