// Copyright 2023 Paion Data. All rights reserved.

import "@argos-ci/cypress/support";

describe("Argos tests", () => {
  const baseUrl = "http://localhost:3000";
  const pages = [{ name: "homepage", path: "/" }];

  for (const { name, path } of pages) {
    it(`Screenshots for ${name}`, () => {
      cy.visit(`${baseUrl}${path}`);
      cy.argosScreenshot(name);
    });
  }
});
