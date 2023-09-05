// Copyright 2023 Paion Data. All rights reserved.
beforeEach(() => {
  cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  cy.intercept("POST", "http://localhost:3000/entityExtraction", { fixture: "getEditorData.json" });
  cy.get(".editor-paragraph").type("China");
  cy.get('span[data-lexical-text = "true"]').type("{selectall}");
  cy.get('[aria-label = "Formatting options for text alignment"]').click();
});

describe("text position E2E test", () => {
  const alignment = ["Left Align", "Center Align", "Right Align", "Justify Align"];
  const alignStyle = ["left", "center", "right", "justify"];
  for (let i = 0; i < alignment.length; i++) {
    it(`Text can be placed ${alignment[i]} `, () => {
      cy.contains(alignment[i]).click();
      cy.get(".editor-paragraph").and("have.attr", "style", `text-align: ${alignStyle[i]};`);
    });
  }

  it("Text can be indented", () => {
    cy.contains("Indent").click();
    cy.get(".editor-paragraph").and("have.attr", "style", "padding-inline-start: calc(20px);");
  });

  it("Cancel indent", () => {
    cy.contains("Indent").click();
    cy.get('[aria-label = "Formatting options for text alignment"]').click();
    cy.contains("Outdent").click();
    cy.get(".editor-paragraph").and("not.have.attr", "style", "padding-inline-start: calc(20px);");
  });
});
