// Copyright 2023 Paion Data. All rights reserved.
it("Login App", () => {
  if (Cypress.env("nodeEnv") == "production") {
    cy.login({ username: Cypress.env("username"), password: Cypress.env("password") });
  }

  cy.request("http://localhost:8080").then((resp) => {
    expect(resp.status).to.eq(200);
  });
});
