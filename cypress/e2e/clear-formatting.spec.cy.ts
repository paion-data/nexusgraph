beforeEach(() => {
  cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  cy.intercept("POST", "/v1/data/entityExtraction", { fixture: "getEditorData.json" });
  cy.get(".editor-paragraph").type("China");
  cy.get('span[data-lexical-text = "true"]').type("{selectall}");
});

it(`Clear formatting button has an effect`, () => {
  cy.get('[aria-label = "Formatting options for font family"]').click();
  cy.contains("Verdana").click();
  cy.get('[aria-label = "Formatting options for font size"]').click();
  cy.contains("20px").click();
  cy.get('[aria-label = "Format Bold"]').click();
  cy.get('[aria-label = "Format Italics"]').click();
  cy.get('[aria-label = "Format Underline"]').click();
  cy.get('[aria-label = "Format Strikethrough"]').click();
  cy.get('[aria-label = "insert Code"]').click();
  cy.get('[aria-label = "Formatting options for additional text styles"]').click();
  cy.contains("Clear Formatting").click();
  cy.get(".editor-paragraph").find("span").should("exist");
});
