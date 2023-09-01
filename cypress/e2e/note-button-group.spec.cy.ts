// Copyright 2023 Paion Data. All rights reserved.
beforeEach(() => {
  if (process.env.NODE_ENV === "production") {
    cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  } else {
    cy.visit("http://localhost:8080/", { failOnStatusCode: false });
  }

  cy.get("[data-testid='editorMenuExpand']").click();
});

it("Expand the Note button group and the button list is visible", () => {
  const bunttonList = ["plus", "squares", "trash", "window", "viewColumns"];

  for (let i = 0; i <= bunttonList.length - 1; i++) {
    cy.get(`.${bunttonList[i]}`).should("be.visible");
  }
});

it("Expand note directories", () => {
  cy.get(".squares").click();
  cy.get("[data-testid='directoryList']").should("exist");
});
