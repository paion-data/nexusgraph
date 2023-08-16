/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
beforeEach(() => {
  cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);

  cy.intercept("POST", "http://localhost:3000/entityExtraction", { fixture: "getEditorData.json" });

  cy.get(".editor-paragraph").type("China");
  cy.get('span[data-lexical-text = "true"]').type("{selectall}");

  cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Normal");
  cy.get(".editor-paragraph").should("exist");
});

afterEach(() => {
  cy.get('[aria-label = "Formatting Options"]').click();
  cy.contains("Normal").click();

  cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Normal");
  cy.get(".editor-paragraph").should("exist");
});

describe("undo redo button E2E test", () => {
  it("input text and click Undo ,'China' not exist", () => {
    cy.get('[aria-label = "Undo"]').click();
    cy.get(".editor-paragraph").should("have.text", "");
  });

  it("input text and click Undo and Redo ,'China' exist", () => {
    cy.get('[aria-label = "Undo"]').click();
    cy.get(".editor-paragraph").should("have.text", "");
    cy.get('[aria-label = "Redo"]').click();
    cy.get(".editor-paragraph").should("have.text", "China");
  });
});

describe("font style E2E test", () => {
  it("bold button has an effect", () => {
    cy.get('[aria-label = "Format Bold"]').click();
    cy.get(".editor-paragraph").find("strong").should("have.class", "font-semibold");
  });

  it("italic button has an effect", () => {
    cy.get('[aria-label = "Format Italics"]').click();
    cy.get(".editor-paragraph").find("em").should("have.class", "italic");
  });

  it("underline button has an effect", () => {
    cy.get('[aria-label = "Format Underline"]').click();
    cy.get(".editor-paragraph").find("span").should("have.class", "underline");
  });

  it("line-through button has an effect", () => {
    cy.get('[aria-label = "Format Strikethrough"]').click();
    cy.get(".editor-paragraph").find("span").should("have.class", "line-through");
  });

  it("underline and line-through button has an effect in the same time", () => {
    cy.get('[aria-label = "Format Strikethrough"]').click();
    cy.get('[aria-label = "Format Underline"]').click();
    cy.get(".editor-paragraph").find("span").should("have.class", "underlined-line-through");
  });

  it("code button has an effect", () => {
    cy.get('[aria-label = "insert Code"]').click();
    cy.get(".editor-paragraph").find("span").should("have.class", "code");
  });

  it("link button has an effect", () => {
    cy.get('[aria-label = "insert Link"]').click();
    cy.get(".editor-paragraph").find("a").should("have.class", "editor-link").and("have.attr", "href", "https://");
  });
});

describe("dropdown button E2E test", () => {
  it("firstHeading button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting Options"]').click();
    cy.contains("Heading 1").click();
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Heading 1");
    cy.get(".editor-heading-h1").should("exist");
  });

  it("secondHeading button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting Options"]').click();
    cy.contains("Heading 2").click();
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Heading 2");
    cy.get(".editor-heading-h2").should("exist");
  });

  it("thirdHeading button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting Options"]').click();
    cy.contains("Heading 3").click();
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Heading 3");
    cy.get(".editor-heading-h3").should("exist");
  });

  it("fourthHeading button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting Options"]').click();
    cy.contains("Heading 4").click();
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Heading 4");
    cy.get(".editor-heading-h4").should("exist");
  });

  it("fifthHeading button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting Options"]').click();
    cy.contains("Heading 5").click();
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Heading 5");
    cy.get(".editor-heading-h5").should("exist");
  });

  it("sixthHeading button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting Options"]').click();
    cy.contains("Heading 6").click();
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Heading 6");
    cy.get(".editor-heading-h6").should("exist");
  });

  it("Bullet List button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting Options"]').click();
    cy.contains("Bulleted List").click();
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Bulleted List");
    cy.get(".PlaygroundEditorTheme__ul").should("exist");
  });

  it("Numbered List button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting Options"]').click();
    cy.contains("Numbered List").click();
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Numbered List");
    cy.get(".editor-list-ol").should("exist");
  });

  it("Check List button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting Options"]').click();
    cy.contains("Check List").click();
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Check List");
    cy.get("[aria-checked='false']").should("exist");
    cy.get("li").click("left").wait(8000);
    cy.get("[aria-checked='true']").should("exist");
    cy.get("li").click("left").wait(8000);
    cy.get("[aria-checked='false']").should("exist");
  });

  it("Quote button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting Options"]').click();
    cy.contains("Quote").click();
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Quote");
    cy.get(".editor-quote").should("exist");
  });

  it("Code Block button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting Options"]').click();
    cy.contains("Code Block").click();
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Code Block");
    cy.get(".editor-code").should("exist");
  });
});
