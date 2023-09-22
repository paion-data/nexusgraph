// Copyright 2023 Paion Data. All rights reserved.
import { aliasMutation, aliasQuery } from "../utils/graphql-test-utils";

Cypress.Commands.add("login", ({ username, password }) => {
  cy.origin(
    Cypress.env("logtoEndpointUrl").concat("/sign-in"),
    { args: { username, password } },
    ({ username, password }) => {
      cy.visit("http://localhost:8080/", { failOnStatusCode: false });

      cy.get('input[name="identifier"]').type(username);
      cy.get('button[type="submit"]').click();
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
    }
  );
});

Cypress.Commands.add("mockGraphqlResponse", () => {
  cy.intercept("POST", "http://localhost:8080/v1/data/", (req) => {
    aliasQuery(req, "GetNoteList");
    aliasQuery(req, "GetFirstNote");

    aliasMutation(req, "SaveNote");
    aliasMutation(req, "UpdateNote");
  });
});
