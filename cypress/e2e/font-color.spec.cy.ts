// Copyright 2023 Paion Data. All rights reserved.
beforeEach(() => {
  if (Cypress.env("nodeEnv") == "production") {
    cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  } else {
    cy.visit("http://localhost:8080/", { failOnStatusCode: false });
  }

  cy.get(".editor-paragraph").type("China");
  cy.get('span[data-lexical-text = "true"]').type("{selectall}");
  cy.get('[aria-label = "Formatting text color"]').click();
});

describe("Hex, Saturation and Hue button e2e test", () => {
  it("Manually enter the Hex value to change the color", () => {
    cy.get("input").type("{selectall}");
    cy.get("input").type("#000000");
    cy.get(".editor-paragraph").find("span").and("have.css", "color").should("include", "rgb(0, 0, 0)");
    cy.get(".color-picker-color").and("have.css", "background-color").should("include", "rgb(0, 0, 0)");
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

describe("Basic color button e2e test", () => {
  const basicColor = [
    "rgb(208, 2, 27)",
    "rgb(245, 166, 35)",
    "rgb(248, 231, 28)",
    "rgb(139, 87, 42)",
    "rgb(126, 211, 33)",
    "rgb(65, 117, 5)",
    "rgb(189, 16, 224)",
    "rgb(144, 19, 254)",
    "rgb(74, 144, 226)",
    "rgb(80, 227, 194)",
    "rgb(184, 233, 134)",
    "rgb(0, 0, 0)",
    "rgb(74, 74, 74)",
    "rgb(155, 155, 155)",
    "rgb(255, 255, 255)",
    "rgb(143, 196, 221)",
  ];

  for (let i = 0; i < basicColor.length; i++) {
    it(`Click basic color button ${basicColor[i]} to change the color`, () => {
      cy.get(".color-picker-basic-color")
        .find("button")
        .then(($button) => {
          $button[i].click();
          cy.get(".editor-paragraph").find("span").and("have.css", "color").should("include", basicColor[i]);
          cy.get(".color-picker-color").and("have.css", "background-color").should("include", basicColor[i]);
        });
    });
  }
});
