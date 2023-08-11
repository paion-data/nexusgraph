beforeEach(() => {
  cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  cy.intercept("POST", "/v1/data/entityExtraction", { fixture: "getEditorData.json" });
  cy.get(".editor-paragraph").type("China");
  cy.get('span[data-lexical-text = "true"]').type("{selectall}");

  cy.get('[aria-label = "Formatting options for font family"]').find(".text").should("have.text", "Arial");
});

afterEach(() => {
  cy.get('[aria-label = "Formatting options for font family"]').click();
  cy.contains("Arial").click();
  cy.get('[aria-label = "Formatting options for font family"]').find(".text").should("have.text", "Arial");
  cy.get(".editor-paragraph").find("span").and("have.css", "font-family").should("include", "Arial");
});

describe("FontFamilyDropDown button E2E test", () => {
  it("Courier New button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting options for font family"]').click();
    cy.contains("Courier New").click();
    cy.get('[aria-label = "Formatting options for font family"]').find(".text").should("have.text", "Courier New");
    cy.get(".editor-paragraph").find("span").and("have.css", "font-family").should("include", "Courier New");
  });

  it("Georgia button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting options for font family"]').click();
    cy.contains("Georgia").click();
    cy.get('[aria-label = "Formatting options for font family"]').find(".text").should("have.text", "Georgia");
    cy.get(".editor-paragraph").find("span").and("have.css", "font-family").should("include", "Georgia");
  });

  it("Times New Roman button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting options for font family"]').click();
    cy.contains("Times New Roman").click();
    cy.get('[aria-label = "Formatting options for font family"]').find(".text").should("have.text", "Times New Roman");
    cy.get(".editor-paragraph").find("span").and("have.css", "font-family").should("include", "Times New Roman");
  });

  it("Trebuchet MS button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting options for font family"]').click();
    cy.contains("Trebuchet MS").click();
    cy.get('[aria-label = "Formatting options for font family"]').find(".text").should("have.text", "Trebuchet MS");
    cy.get(".editor-paragraph").find("span").and("have.css", "font-family").should("include", "Trebuchet MS");
  });

  it("Verdana button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting options for font family"]').click();
    cy.contains("Verdana").click();
    cy.get('[aria-label = "Formatting options for font family"]').find(".text").should("have.text", "Verdana");
    cy.get(".editor-paragraph").find("span").and("have.css", "font-family").should("include", "Verdana");
  });
});
