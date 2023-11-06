// Copyright 2023 Paion Data. All rights reserved.
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

  cy.visit("http://localhost:3000/");
  cy.get("button[id='createButton']").click();

  const intelligentAIButton = cy.get(".modal-content>div>div>button");
  intelligentAIButton.click();

  cy.get("textarea").type("今天是个好日子");
  const createGraphButton = cy.get(".modalContent>div>div>button");
  createGraphButton.click();
});

it("Displays the alert when nlp data is recognized as null", () => {
  cy.intercept("POST", Cypress.env("entityExtractionServer"), {
    body: { links: [], nodes: [] },
  });

  cy.get("div[id='alert']").should("exist");
});

it("Alert is not displayed when nlp data is recognized as not null", () => {
  cy.intercept("POST", Cypress.env("entityExtractionServer"), { fixture: "single-rdf-tuple-from-theresa.json" });

  cy.get("div[id='alert']").should("not.empty");
});
