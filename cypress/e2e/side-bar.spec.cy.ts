// Copyright 2023 Paion Data. All rights reserved.
describe("Side bar displays new graph button and graph list", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("displays new graph button all the time", () => {
    cy.get("button[id='newGraphButton']").should("exist");
  });

  it("graph list is initially empty", () => {
    cy.get('[id^="graphListItem-"]').should("not.exist");
  });

  it("when a new graph is created with the new graph button, graph list becomes populated", () => {
    cy.newGraph();

    cy.get('[id^="graphListItem-"]').should("exist");
    cy.get("svg").find(`[aria-label^="graph-node"]`).should("exist");
  });
});
