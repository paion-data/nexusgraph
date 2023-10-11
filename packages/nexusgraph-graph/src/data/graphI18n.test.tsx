// Copyright 2023 Paion Data. All rights reserved.
import { useTranslation } from "react-i18next";
import { render } from "@testing-library/react";
import React from "react";
import OverviewPane from "../inspection-panel/properties-panel-content/OverviewPane";
import { GraphStyleModel } from "../GraphStyle";

jest.mock("react-i18next", () => ({
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
          overview: "Overview",
          nodeLabel: "Node labels",
          relationshipType: "Relationship types",
          warningMessage: "Record fields have been truncated.",
          textForDisplaying: "Displaying",
          textForNodes: "nodes",
          textForRelationships: "relationships.",
          nodeProperties: "Node properties",
          relationshipProperties: "Relationship properties",
          clipboardTitle: "Copy all properties to clipboard",
        },
        zh: {
          overview: "概述",
          nodeLabel: "Node labels",
          relationshipType: "Relationship types",
          warningMessage: "Record fields have been truncated.",
          textForDisplaying: "Displaying",
          textForNodes: "nodes",
          textForRelationships: "relationships.",
          nodeProperties: "Node properties",
          relationshipProperties: "Relationship properties",
          clipboardTitle: "Copy all properties to clipboard",
        },
      },
    },
  });
});

it("Translate OverviewPane through i18n", () => {
  jest.mock("../GraphStyle");
  const MockedGraphStyleModel = GraphStyleModel as jest.Mock<GraphStyleModel>;
  const style = new MockedGraphStyleModel();

  const pane = render(
    <OverviewPane
      graphStyle={style}
      hasTruncatedFields={false}
      nodeCount={null}
      relationshipCount={null}
      stats={{
        labels: undefined,
        relTypes: undefined,
      }}
      infoMessage={null}
    ></OverviewPane>
  );

  expect(tSpy).toBeCalledTimes(1);
  expect(tSpy).toHaveBeenLastCalledWith("overview");
});
