// Copyright 2023 Paion Data. All rights reserved.
describe("i18n", () => {
  it("supports English", () => {
    cy.setBrowserLanguage("en-US", ["en"], ["en"]);
    cy.newGraph()
      .get('[data-testid="vizInspector"]')
      .contains("Node labels");
  });

  it("supports Chinese", () => {
    cy.setBrowserLanguage("zh-CN", ["zh"], ["zh"]);

    cy.newGraph()
      .get('[data-testid="vizInspector"]')
      .contains("节点类型");
  });
});
