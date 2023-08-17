// Copyright 2023 Paion Data. All rights reserved.
beforeEach(() => {
  cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  cy.intercept("POST", "http://localhost:3000/entityExtraction", { fixture: "getEditorData.json" });
  cy.get(".editor-paragraph").type("China");
  cy.get('span[data-lexical-text = "true"]').type("{selectall}");
});

afterEach(() => {
  cy.get('[aria-label = "Formatting options for additional text styles"]').click();
  cy.contains("Clear Formatting").click();

  cy.get(".editor-paragraph").find("span").not("have.style");
  cy.get(".editor-paragraph").find("span").not("have.class");
});

describe("Clear formatting for font family, font size, font color, and font background color", () => {
  it.skip("Clear formatting for font family", () => {
    cy.get('[aria-label = "Formatting options for font family"]').click();
    cy.contains("Verdana").click();
  });

  it.skip("Clear formatting for font size", () => {
    cy.get('[aria-label = "Formatting options for font size"]').click();
    cy.contains("20px").click();
  });

  it.skip("Clear formatting for font color", () => {
    cy.get('[aria-label = "Formatting text color"]').click();
    cy.get(".color-picker-basic-color").find("button").first().click();
  });

  it.skip("Clear formatting for font background color", () => {
    cy.get('[aria-label = "Formatting background color"]').click();
    cy.get(".color-picker-basic-color").find("button").first().click();
  });
});

describe("Clear formatting for bold italic underline strikethrough and code", () => {
  const formatting = ["Format Bold", "Format Italics", "Format Underline", "Format Strikethrough", "insert Code"];

  for (let i = 0; i < formatting.length; i++) {
    it.skip(`Clear formatting for ${formatting[i]}`, () => {
      cy.get(`[aria-label = '${formatting[i]}']`).click();
    });
  }
});
