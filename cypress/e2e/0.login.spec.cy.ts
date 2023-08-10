// Copyright 2023 Paion Data. All rights reserved.
afterEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
});

it("Login App", () => {
  cy.login({ username: Cypress.env("username"), password: Cypress.env("password") }).wait(1000);
  cy.request("http://localhost:8080").then((resp) => {
    expect(resp.status).to.eq(200);
  });
});
