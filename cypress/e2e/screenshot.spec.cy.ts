// Copyright 2023 Paion Data. All rights reserved.

import "@argos-ci/cypress/support";

describe("Argos tests", () => {
  const pages = [{ name: "homepage", path: "/" }];

  it("screenshot homepage", async () => {
    cy.visit("http://localhost:3000/");
    cy.argosScreenshot("homepage");
  });
});
