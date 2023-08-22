// Copyright 2023 Paion Data. All rights reserved.
beforeEach(() => {
  cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(10000);
  cy.intercept("POST", "/v1/data/entityExtraction", { fixture: "getEditorData.json" });
  cy.get('[aria-label = "Insert specialized editor node"]').click();
  cy.contains("Image").click();
  cy.get(".Modal_modal").should("exist");
});

// describe("E2E test of image button",()=>{
//     it("Click the close button and the picture dialog box closes",()=>{

//     });

//     it("Click sample button ,",()=>{

//     });

//     it("",()=>{

//     });

//     it("",()=>{

//     });
// });
