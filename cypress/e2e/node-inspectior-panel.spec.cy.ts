// Copyright 2023 Paion Data. All rights reserved.
describe("Node Inspector Panel rendering", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/");
    cy.deleteAllGraphs();
  });

  afterEach(() => {
    cy.deleteAllGraphs();
  });

  it("Updating pane title instantly changes the correspoinding node caption on canvas", () => {
    cy.get('[data-testid="graphCanvas"]')
      .trigger("click", 200, 200, { force: true })
      .trigger("dblclick", 200, 200, { force: true });

    cy.wait(1000);

    cy.get(`[aria-label^="graph-node"]`)
      .trigger("mouseover", { force: true })
      .trigger("mouseenter", { force: true })
      .get('[data-testid="viz-details-pane-title"]')
      .find("[contenteditable]")
      .clear()
      .type("Jack{enter}", { force: true })
      .contains("Jack");
  });

  it.skip("Updating node label is instant", () => {
    cy.get('[data-testid="graphCanvas"]')
      .trigger("click", 200, 200, { force: true })
      .trigger("dblclick", 200, 200, { force: true });

    cy.wait(1000);

    cy.get(`[aria-label^="graph-node"]`)
      .first()
      .trigger("mouseover", { force: true })
      .trigger("mouseenter", { force: true })
      .trigger("click", { force: true })
      .get('[data-testid="styleable-node-label"]', { timeout: 5000 })
      .clear()
      .type("Person{enter}", { force: true })
      .wait(1500)
      .get('[data-testid="styleable-node-label"]', { timeout: 5000 })
      .contains("Person");
  });

  it("Updating relationship type is instant", () => {
    cy.newGraph();

    cy.wait(3000);

    cy.get(".relationship", { timeout: 5000 })
      .trigger("click", { force: true })
      .get('[data-testid="rel-type"]', { timeout: 5000 })
      .first()
      .clear()
      .type("New Link Label{enter}", { force: true })
      .wait(1500)
      .get('[data-testid="rel-type"]', { timeout: 5000 })
      .contains("New Link Label");
  });
});
