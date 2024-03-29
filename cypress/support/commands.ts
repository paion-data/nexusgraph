// Copyright 2023 Paion Data. All rights reserved.

Cypress.Commands.add("openApp", () => {
  if (Cypress.env("skipSignIn") == "true") {
    cy.visit("http://localhost:3000/");
  } else {
    cy.login(Cypress.env("userEmail"), Cypress.env("password")).then(() => {
      cy.request("http://localhost:3000/").then((resp) => {
        expect(resp.status).to.eq(200);
      });
    });
  }
});

Cypress.Commands.add("login", (userEmail: string, password: string) => {
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

Cypress.Commands.add("newGraph", () => {
  cy.intercept("POST", Cypress.env("entityExtractionServer"), { fixture: "single-rdf-tuple-from-theresa.json" });

  cy.get("button[id='newGraphButton']")
    .click({ force: true })
    .get("[data-testid='newGraphMethodButton-NLP']")
    .click({ force: true })
    .get("textarea", { timeout: 10000 })
    .click({ force: true })
    .type("我爱中国")
    .get("[data-testid='newGraphButton-NLP']", { timeout: 10000 })
    .click({ force: true })
    .get('[data-testid^="graphListItem-"]', { timeout: 10000 })
    .should("exist")
    .get("svg")
    .find(`[aria-label^="graph-node"]`)
    .should("exist");
});

Cypress.Commands.add("deleteAllGraphs", () => {
  cy.get("body").then(($body) => {
    const numGraphs = $body.find('[data-testid^="graphListItem-"]').length;

    if (numGraphs > 0) {
      for (let i = 0; i < numGraphs; i++) {
        cy.get('[data-testid="deleteButton"]', { timeout: 2000 }).click({ force: true });
      }
    }
  });
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
