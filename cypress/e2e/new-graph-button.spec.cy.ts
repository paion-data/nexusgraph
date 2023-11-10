// Copyright 2023 Paion Data. All rights reserved.
describe("New Graph button guides user to create graph with different options", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get("button[id='newGraphButton']").click();
    cy.get("[id='newGraphMethodModal']").should("not.exist");
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

  it("shows up a graph by some generating texts", () => {
    const NLPMethodButton = cy.get("button[id='newGraphMethodButton-NLP']");
    NLPMethodButton.click();

    cy.get("textarea").type("我爱中国");

    const createGraphButton = cy.get(".modal-content>div>div>div>button");
    createGraphButton.click();

    cy.intercept("POST", Cypress.env("entityExtractionServer"), { fixture: "single-rdf-tuple-from-theresa.json" });

    cy.get("div[id='alert']").should("not.empty");

    cy.get("svg")
      .find(`[aria-label^="graph-node"]`)
      .then(($el) => {
        expect($el[0].textContent).contains(" 我");
        expect($el[1].textContent).contains(" 中国");
      });
    cy.get("svg").find('[class="relationship"]').contains("爱");
  });
});
