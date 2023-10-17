// Copyright 2023 Paion Data. All rights reserved.
it("Login App", () => {
  cy.login({ userEmail: Cypress.env("userEmail"), password: Cypress.env("password") }).then(() => {
    cy.request("http://localhost:3000/home").then((resp) => {
      expect(resp.status).to.eq(200);
    });
  });
});
