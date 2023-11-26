// Copyright 2023 Paion Data. All rights reserved.
describe("i18n", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("supports English", () => {
    cy.setBrowserLanguage("en-US", ["en"], ["en"]);
    cy.newGraph()
      .get("input[data-testid=graphTitle]")
      .should("have.value", "Unamed Graph")
      .get('[data-testid="vizInspector"]')
      .contains("Node labels");
  });

  it("supports Chinese", () => {
    cy.setBrowserLanguage("zh-CN", ["zh"], ["zh"]);

    cy.newGraph()
      .get("input[data-testid=graphTitle]")
      .should("have.value", "无标题笔记")
      .get('[data-testid="vizInspector"]')
      .contains("节点类型");
  });
});
