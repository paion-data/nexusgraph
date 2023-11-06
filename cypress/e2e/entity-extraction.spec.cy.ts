// Copyright 2023 Paion Data. All rights reserved.
describe("Entity Extraction Feature Tests", () => {
  beforeEach(() => {
    cy.intercept("POST", Cypress.env("astraiosGraphqlEndpoint"), (req) => {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            graph: {
              edges: [
                {
                  node: {
                    id: "1",
                    name: "Unamed Graph",
                  },
                },
                {
                  node: {
                    id: "2",
                    name: "Unamed Graph",
                  },
                },
              ],
            },
          },
        },
      });
    });
  });

  it("shows up a graph by some generating texts", () => {
    cy.visit("http://localhost:3000/");

    cy.get("button[id='createButton']").click();

    const intelligentAIButton = cy.get(".modal-content>div>div>button");
    intelligentAIButton.click();

    cy.get("textarea").type("我爱中国");

    const createGraphButton = cy.get(".modalContent>div>div>button");
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
