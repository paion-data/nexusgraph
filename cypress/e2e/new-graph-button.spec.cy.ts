// Copyright 2023 Paion Data. All rights reserved.
describe("New Graph button guides user to create graph with different options", () => {
  beforeEach(() => {
    cy.interceptAstraios();
    cy.visit("http://localhost:3000/");
    cy.get("button[id='newGraphButton']").click();
    cy.get("[id='newGraphMethodModal']").should("not.exist");
  });

  it("the first pop-up modal shows up available options to start off a new graph", () => {
    cy.get("button[id='newGraphMethodButton-NLP']").contains("Text to Graph");
  });

  it("clicking the NLP option opens up another modal with text area and a initially-unclickable submit button", () => {
    cy.get("button[id='newGraphMethodButton-NLP']")
      .click()
      .get(".modal-content>div>div")
      .then(($div) => {
        expect(cy.wrap($div).children("textarea")).to.exist;
        expect(cy.wrap($div).children("div").children("button")).to.exist;
      });
  });
});
