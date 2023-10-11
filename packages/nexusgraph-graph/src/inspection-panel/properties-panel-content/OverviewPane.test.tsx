// Copyright 2023 Paion Data. All rights reserved.
import { render } from "@testing-library/react";
import { useTranslation } from "../../../../nexusgraph-i18n";
import { GraphStyleModel } from "../../GraphStyle";
import OverviewPane from "./OverviewPane";

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
          overview: "Overview",
        },
        zh: {
          overview: "概述",
        },
      },
    },
  });
});

it("Translate OverviewPane through i18n", () => {
  jest.mock("../../GraphStyle");
  const MockedGraphStyleModel = GraphStyleModel as jest.Mock<GraphStyleModel>;
  const style = new MockedGraphStyleModel();

  render(
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
  expect(tSpy).toHaveBeenNthCalledWith(1, "overview");
});
