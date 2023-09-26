// Copyright 2023 Paion Data. All rights reserved.
import { aliasQuery } from "../utils/note-display-utils";

beforeEach(() => {
  if (Cypress.env("nodeEnv") == "production") {
    cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  } else {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  }
  cy.intercept("POST", Cypress.env("entityExtractionServer"), { fixture: "getEditorData.json" });
});

it("Display the user's first note during initialization", () => {
  cy.intercept("POST", Cypress.env("astraiosGraphqlEndpoint"), { fixture: "astraiosGraphqlResponse.json" }).as(
    "astraiosGraphqlRequest"
  );
  cy.wait("@astraiosGraphqlRequest");
  cy.get(".editor-paragraph").should("contain", "China").wait(6000);
  cy.get(".node").should("contain", "China");
});

it("Create a new note and display it when the user does not have any notes", () => {
  cy.intercept("POST", Cypress.env("astraiosGraphqlEndpoint"), (req) => {
    aliasQuery(req, "getNoteList");
  });
  cy.wait("@gqlgetNoteListQuery");
  cy.get("input[id=noteTitleInput]").should("have.value", "Untitled Note");
  cy.get(".editor-paragraph").should("not.have.text");
  cy.get(".editor-paragraph").type("China");
  cy.intercept("POST", Cypress.env("astraiosGraphqlEndpoint"), (req) => {
    aliasQuery(req, "saveNote");
  });
  cy.reload();
  cy.get(".editor-paragraph").should("contain", "China");
});

it("Toggle notes by clicking on an item in the note list", () => {
  cy.intercept("POST", Cypress.env("astraiosGraphqlEndpoint"), { fixture: "astraiosGraphqlResponse.json" }).as(
    "astraiosGraphqlRequest"
  );
  cy.wait("@astraiosGraphqlRequest");
  cy.get("[data-testid='editorMenuExpand']").click();
  cy.get("[data-testid='noteTitleList']").children().should("have.length", 2);

  cy.get(".squares").click();
  cy.get("a[data-testid='First Note']").click({ force: true });
  cy.get(".editor-paragraph").should("contain", "China");

  cy.intercept("POST", Cypress.env("astraiosGraphqlEndpoint"), (req) => {
    aliasQuery(req, "getNoteById");
  });
  cy.get("a[data-testid='Second Note']").click({ force: true });
  cy.get(".editor-paragraph").should("contain", "Second Note");
});
