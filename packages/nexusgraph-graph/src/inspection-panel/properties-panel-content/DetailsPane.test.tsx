// Copyright 2023 Paion Data. All rights reserved.
import { render } from "@testing-library/react";

import { useTranslation } from "../../../../nexusgraph-i18n";
import { GraphStyleModel } from "../../GraphStyle";
import { DetailsPane } from "./DetailsPane";

jest.mock("../../../../nexusgraph-i18n", () => ({
  useTranslation: jest.fn(),
}));

const tSpy = jest.fn((key) => key);
const useTranslationSpy = useTranslation as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();

  useTranslationSpy.mockReturnValue({
    t: tSpy,
    i18n: {
      language: "zh-CN",
      resources: {
        en: {
          nodeProperties: "Node properties",
          clipboardTitle: "Copy all properties to clipboard",
        },
        zh: {
          nodeProperties: "节点属性",
          clipboardTitle: "将所有属性复制到剪贴板",
        },
      },
    },
  });
});

it("Translate DetailsPane through i18n", () => {
  jest.mock("../../GraphStyle");
  const MockedGraphStyleModel = GraphStyleModel as jest.Mock<GraphStyleModel>;
  const style = new MockedGraphStyleModel();

  render(
    <DetailsPane
      graphStyle={style}
      vizItem={{
        type: "node",
        item: {
          id: "id",
          labels: ["lables"],
          propertyList: [{ key: "name", type: "string", value: "name" }],
        },
      }}
      nodeInspectorWidth={0}
    ></DetailsPane>
  );

  expect(tSpy).toBeCalledTimes(2);
  expect(tSpy).toHaveBeenNthCalledWith(1, "nodeProperties");
  expect(tSpy).toHaveBeenNthCalledWith(2, "clipboardTitle");
});
