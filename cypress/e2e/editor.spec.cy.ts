/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
beforeEach(() => {
  cy.visit("http://localhost:8080/").wait(1000);
  cy.intercept("POST", "/v1/data/entityExtraction", { fixture: "getEditorData.json" });
  cy.get(".editor-paragraph").type("China").wait(1000);
  cy.get('span[data-lexical-text = "true"]').type("{selectall}");
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

describe("text position E2E test", () => {
  it("Text can be placed left  align  ", () => {
    cy.get('[aria-label = "Left Align"]').click();
    cy.get(".editor-paragraph").and("have.attr", "style", "text-align: left;");
  });

  it("Text can be placed center align  ", () => {
    cy.get('[aria-label = "Center Align"]').click();
    cy.get(".editor-paragraph").and("have.attr", "style", "text-align: center;");
  });

  it("Text can be placed right align  ", () => {
    cy.get('[aria-label = "Right Align"]').click();
    cy.get(".editor-paragraph").and("have.attr", "style", "text-align: right;");
  });

  it("Text can be placed justify align  ", () => {
    cy.get('[aria-label = "Justify Align"]').click();
    cy.get(".editor-paragraph").and("have.attr", "style", "text-align: justify;");
  });
});

describe("font style E2E test", () => {
  it("bold button has an effect", () => {
    cy.get('[aria-label = "Format Bold"]').click().wait(1000);
    cy.get(".editor-paragraph").find("strong").should("have.class", "font-semibold");
  });

  it("italic button has an effect", () => {
    cy.get('[aria-label = "Format Italics"]').click().wait(1000);
    cy.get(".editor-paragraph").find("em").should("have.class", "italic");
  });

  it("underline button has an effect", () => {
    cy.get('[aria-label = "Format Underline"]').click().wait(1000);
    cy.get(".editor-paragraph").find("span").should("have.class", "underline");
  });

  it("line-through button has an effect", () => {
    cy.get('[aria-label = "Format Strikethrough"]').click().wait(1000);
    cy.get(".editor-paragraph").find("span").should("have.class", "line-through");
  });

  it("underline and line-through button has an effect in the same time", () => {
    cy.get('[aria-label = "Format Strikethrough"]').click().wait(1000);
    cy.get('[aria-label = "Format Underline"]').click().wait(1000);
    cy.get(".editor-paragraph").find("span").should("have.class", "underlined-line-through");
  });

  it("code button has an effect", () => {
    cy.get('[aria-label = "insert Code"]').click().wait(1000);
    cy.get(".editor-paragraph").find("span").should("have.class", "code");
  });

  it("link button has an effect", () => {
    cy.get('[aria-label = "insert Link"]').click().wait(1000);
    cy.get(".editor-paragraph").find("a").should("have.class", "editor-link").and("have.attr", "href", "https://");
  });
});

describe("dropdown button E2E test", () => {
  beforeEach(() => {
    cy.get('[aria-label = "Formatting Options"]').click().wait(1000);
  });

  it("Large Heading button has an effect in dropdown", () => {
    cy.contains("Large Heading").click().wait(1000);
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Large Heading");
    cy.get(".editor-heading-h1").should("exist");
  });

  it("Small Heading button has an effect in dropdown", () => {
    cy.contains("Small Heading").click().wait(1000);
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Small Heading");
    cy.get(".editor-heading-h2").should("exist");
  });

  it("Bullet List button has an effect in dropdown", () => {
    cy.contains("Bulleted List").click().wait(1000);
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Bulleted List");
    cy.get(".editor-list-ul").should("exist");
  });

  it("Numbered List button has an effect in dropdown", () => {
    cy.contains("Numbered List").click().wait(1000);
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Numbered List");
    cy.get(".editor-list-ol").should("exist");
  });

  it("Quote button has an effect in dropdown", () => {
    cy.contains("Quote").click().wait(1000);
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Quote");
    cy.get(".editor-quote").should("exist");
  });

  it("Code Block button has an effect in dropdown", () => {
    cy.contains("Code Block").click().wait(1000);
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Code Block");
    cy.get(".editor-code").should("exist");
  });

  it("Normal button has an effect in dropdown", () => {
    cy.contains("Code Block").click().wait(1000);
    cy.get('[aria-label = "Formatting Options"]').click().wait(1000);
    cy.contains("Normal").click().wait(1000);
    cy.get('[aria-label = "Formatting Options"]').find(".text").should("have.text", "Normal");
    cy.get(".editor-paragraph").should("exist");
  });
});

describe("quote e2e test after fix quote line break", () => {
  it("two blank lines to exit quote", () => {
    cy.get('[aria-label = "Formatting Options"]').click().wait(1000);
    cy.contains("Quote").click().wait(1000);
    cy.get(".editor-quote").type("{enter}");
    cy.get(".editor-quote").type("{enter}");
    cy.get(".editor-quote").type("{enter}");
    cy.get(".editor-paragraph").should("exist");
  });
});
