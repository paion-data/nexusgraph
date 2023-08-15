beforeEach(() => {
  cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  cy.intercept("POST", "/v1/data/entityExtraction", { fixture: "getEditorData.json" });
  cy.get(".editor-paragraph").type("China");
  cy.get('span[data-lexical-text = "true"]').type("{selectall}");
  cy.get('[aria-label = "Formatting text color"]').click();
});

describe("Font color button e2e test", () => {
  it("Manually enter the Hex value to change the color", () => {
    cy.get("input").type("{selectall}");
    cy.get("input").type("#000000");
    cy.get(".editor-paragraph").find("span").and("have.css", "color").should("include", "rgb(0, 0, 0)");
    cy.get(".color-picker-color").and("have.css", "background-color").should("include", "rgb(0, 0, 0)");
  });

  it("Click basic color button to change the color", () => {
    cy.get(".color-picker-basic-color").find("button").first().click();
    cy.get(".editor-paragraph").find("span").and("have.css", "color").should("include", "rgb(208, 2, 27)");
    cy.get(".color-picker-color").and("have.css", "background-color").should("include", "rgb(208, 2, 27)");
  });

  it("Click saturation box to change the color", () => {
    cy.get(".color-picker-saturation").click("bottomLeft");
    cy.get(".editor-paragraph").find("span").and("have.css", "color").should("include", "rgb(2, 2, 2)");
    cy.get(".color-picker-color").and("have.css", "background-color").should("include", "rgb(2, 2, 2)");
  });

  it("Click Hue box to change the color", () => {
    cy.get(".color-picker-hue").click();
    cy.get(".color-picker-hue_cursor").and("have.css", "background-color").should("include", "rgb(0, 255, 251)");
    cy.get(".color-picker-color").and("have.css", "background-color").should("include", "rgb(255, 255, 255)");
  });
});
