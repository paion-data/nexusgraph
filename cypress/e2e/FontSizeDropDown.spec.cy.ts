beforeEach(() => {
  cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  cy.intercept("POST", "/v1/data/entityExtraction", { fixture: "getEditorData.json" });
  cy.get(".editor-paragraph").type("China");
  cy.get('span[data-lexical-text = "true"]').type("{selectall}");
});

// afterEach(()=>{
//   cy.get('[aria-label = "Formatting options for font size"]').click();
//   cy.contains("10px").click();
//   cy.get(".editor-paragraph").find('span').and('have.css', "font-size").should('include', '10px');
// })

describe("FontSizeDropDown button E2E test", () => {
  it("12px button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting options for font size"]').click();
    cy.contains("12px").click();
    cy.get('[aria-label = "Formatting options for font size"]').find(".text").should("have.text", "12px");
    cy.get(".editor-paragraph").find("span").and("have.css", "font-size").should("include", "12px");
  });

  // TODO - font size of 10px/11px is not working (https://github.com/facebook/lexical/issues/4888)

  it("13px button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting options for font size"]').click();
    cy.contains("13px").click();
    cy.get('[aria-label = "Formatting options for font size"]').find(".text").should("have.text", "13px");
    cy.get(".editor-paragraph").find("span").and("have.css", "font-size").should("include", "13px");
  });

  it("14px button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting options for font size"]').click();
    cy.contains("14px").click();
    cy.get('[aria-label = "Formatting options for font size"]').find(".text").should("have.text", "14px");
    cy.get(".editor-paragraph").find("span").and("have.css", "font-size").should("include", "14px");
  });

  it("15px button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting options for font size"]').click();
    cy.contains("15px").click();
    cy.get('[aria-label = "Formatting options for font size"]').find(".text").should("have.text", "15px");
    cy.get(".editor-paragraph").find("span").and("have.css", "font-size").should("include", "15px");
  });

  it("16px button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting options for font size"]').click();
    cy.contains("16px").click();
    cy.get('[aria-label = "Formatting options for font size"]').find(".text").should("have.text", "16px");
    cy.get(".editor-paragraph").find("span").and("have.css", "font-size").should("include", "16px");
  });

  it("17px button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting options for font size"]').click();
    cy.contains("17px").click();
    cy.get('[aria-label = "Formatting options for font size"]').find(".text").should("have.text", "17px");
    cy.get(".editor-paragraph").find("span").and("have.css", "font-size").should("include", "17px");
  });

  it("18px button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting options for font size"]').click();
    cy.contains("18px").click();
    cy.get('[aria-label = "Formatting options for font size"]').find(".text").should("have.text", "18px");
    cy.get(".editor-paragraph").find("span").and("have.css", "font-size").should("include", "18px");
  });

  it("19px button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting options for font size"]').click();
    cy.contains("19px").click();
    cy.get('[aria-label = "Formatting options for font size"]').find(".text").should("have.text", "19px");
    cy.get(".editor-paragraph").find("span").and("have.css", "font-size").should("include", "19px");
  });

  it("20px button has an effect in dropdown", () => {
    cy.get('[aria-label = "Formatting options for font size"]').click();
    cy.contains("20px").click();
    cy.get('[aria-label = "Formatting options for font size"]').find(".text").should("have.text", "20px");
    cy.get(".editor-paragraph").find("span").and("have.css", "font-size").should("include", "20px");
  });
});
