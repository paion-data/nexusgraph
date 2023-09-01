// Copyright 2023 Paion Data. All rights reserved.
import { render } from "@testing-library/react";
import AppInit from "./AppInit";

import DevApp from "./DevApp";
import LogtoProviderWapper from "./LogtoProvider";
import ProdApp from "./ProdApp";

const originalEnv = process.env;

jest.mock("@logto/react", () => ({
  LogtoConfig: jest.fn(),
  LogtoProvider: jest.fn(),
}));

jest.mock("./DevApp");
const MockedDevApp = DevApp as jest.Mock;
MockedDevApp.mockImplementation(() => "Render DevApp");

jest.mock("./ProdApp");
const MockedProdApp = ProdApp as jest.Mock;
MockedProdApp.mockImplementation(() => "Render ProdApp");

jest.mock("./LogtoProvider");
const MockedLogtoProviderWapper = LogtoProviderWapper as jest.Mock;
MockedLogtoProviderWapper.mockImplementation(() => <MockedProdApp />);

beforeEach(() => {
  jest.clearAllMocks();
});

test("AppInit renders in a development environment", () => {
  process.env = {
    ...originalEnv,
    NODE_ENV: "development",
  };

  render(<AppInit />);

  expect(MockedDevApp).toBeCalled();
});

test("AppInit renders in a production environment", () => {
  process.env = {
    ...originalEnv,
    NODE_ENV: "production",
  };

  render(<AppInit />);

  expect(MockedLogtoProviderWapper).toBeCalled();
  expect(MockedProdApp).toBeCalled();
});

test("Rendering throws an error when not set to production or development environment", () => {
  process.env = {
    ...originalEnv,
    NODE_ENV: undefined,
  };

  const originalError = console.error;
  console.error = jest.fn();

  expect(() => render(<AppInit />)).toThrow(Error);

  console.error = originalError;
});
