// Copyright 2023 Paion Data. All rights reserved.
beforeEach(() => {
  cy.visit("http://localhost:3000/");
  cy.get("button[id='createButton']").click();

  const intelligentAIButton = cy.get(".modal-content>div>div>button");
  intelligentAIButton.click();
});

it("Displays the alert when nlp data is recognized as null", () => {
  const createGraphButton = cy.get(".modalContent>div>button");
  createGraphButton.click();

  cy.get("div[id='alert']").should("exist");
});

it("Alert is not displayed when nlp data is recognized as not null", () => {
  cy.get("textarea").type("今天是个好日子");
  const createGraphButton = cy.get(".modalContent>div>button");
  createGraphButton.click();

  cy.get("div[id='alert']").should("not.empty");
});
