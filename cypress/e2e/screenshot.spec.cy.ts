// Copyright 2023 Paion Data. All rights reserved.

import "@argos-ci/cypress/support";

describe("Argos tests", () => {
  it("screenshot homepage", async ({ page: any }) => {
    cy.visit("http://localhost:3000/");
    cy.argosScreenshot("/");
  });
});
