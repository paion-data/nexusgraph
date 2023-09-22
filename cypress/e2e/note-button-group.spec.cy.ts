// Copyright 2023 Paion Data. All rights reserved.

import { aliasMutation, aliasQuery } from "../utils/graphql-test-utils";

beforeEach(() => {
  cy.intercept("POST", "http://localhost:8080/v1/data/", (req) => {
    aliasQuery(req, "GetNoteList");
    aliasQuery(req, "GetFirstNote");

    aliasMutation(req, "SaveNote");
    aliasMutation(req, "UpdateNote");
  });

  if (Cypress.env("nodeEnv") == "production") {
    cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  } else {
    cy.visit("http://localhost:8080/", { failOnStatusCode: false });
  }
  cy.intercept("POST", "http://localhost:3000/entityExtraction", { fixture: "getEditorData.json" });

  cy.get("[data-testid='editorMenuExpand']").click();
});

it("Expand the Note button group and the button list is visible", () => {
  const bunttonList = ["plus", "squares", "trash", "window", "viewColumns"];

  for (let i = 0; i <= bunttonList.length - 1; i++) {
    cy.get(`.${bunttonList[i]}`).should("be.visible");
  }
});

it("Expand note directories", () => {
  cy.get(".squares").click();
  cy.get("[data-testid='directoryList']").should("exist");
});
