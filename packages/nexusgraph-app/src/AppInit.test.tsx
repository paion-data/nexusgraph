// Copyright 2023 Paion Data. All rights reserved.
import { render } from "@testing-library/react";
import AppInit from "./AppInit";

import { OAuth2Provider } from "../../nexusgraph-oauth2";
import DevApp from "./DevApp";
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

jest.mock("../../nexusgraph-oauth2/src/OAuth2Provider");
const MockedOAuth2Provider = OAuth2Provider as jest.Mock;
MockedOAuth2Provider.mockImplementation(() => <MockedProdApp />);

describe("App renders in different mode based on the running environment", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("When NODE_ENV is set to 'development', app renders in a dev mode", () => {
    process.env = {
      ...originalEnv,
      NODE_ENV: "development",
    };

    render(<AppInit />);

    expect(MockedDevApp).toBeCalled();
    expect(MockedProdApp).not.toBeCalled();
  });

  test("When NODE_ENV is set to 'production', app renders in a production mode", () => {
    process.env = {
      ...originalEnv,
      NODE_ENV: "production",
    };

    render(<AppInit />);

    expect(MockedOAuth2Provider).toBeCalled();
    expect(MockedProdApp).toBeCalled();
    expect(MockedDevApp).not.toBeCalled();
  });

  test("When required NODE_ENV is not set, error throws", () => {
    process.env = {
      ...originalEnv,
      NODE_ENV: undefined,
    };

    const originalError = console.error; // eslint-disable-line no-console
    console.error = jest.fn(); // eslint-disable-line no-console

    expect(() => render(<AppInit />)).toThrow(Error);

    console.error = originalError; // eslint-disable-line no-console
  });
});
