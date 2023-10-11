// Copyright 2023 Paion Data. All rights reserved.
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { PropertiesTable } from "./PropertiesTable";

test("Link can be displayed correctly in the node property form", () => {
  const visibleProperties = [{ key: "url", type: "string", value: "https://baidu.com" }];
  render(
    <PropertiesTable
      visibleProperties={visibleProperties}
      onMoreClick={() => {
        // no operation
      }}
      moreStep={1000}
      totalNumItems={visibleProperties.length}
      nodeInspectorWidth={50}
    />
  );

  expect(screen.getByRole("link", { name: "https://baidu.com" })).toHaveAttribute("href", "https://baidu.com");
});
