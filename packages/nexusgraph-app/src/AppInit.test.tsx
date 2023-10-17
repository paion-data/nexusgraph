// Copyright 2023 Paion Data. All rights reserved.
import { render } from "@testing-library/react";
import AppInit from "./AppInit";

import OAuth2Provider from "../../nexusgraph-oauth/src/OAuth2Provider";
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

jest.mock("../../nexusgraph-oauth/src/OAuth2Provider");
const MockedOAuth2Provider = OAuth2Provider as jest.Mock;
MockedOAuth2Provider.mockImplementation(() => <MockedProdApp />);

describe("App renders in different mode based on the running environment", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("When NODE_ENV is set to 'development', app renders in a dev mode", () => {
    process.env = {
      ...originalEnv,
      SKIP_SIGN_IN: "true",
    };

    render(<AppInit />);

    expect(MockedDevApp).toBeCalled();
    expect(MockedProdApp).not.toBeCalled();
  });

  test("When NODE_ENV is set to 'production', app renders in a production mode", () => {
    process.env = {
      ...originalEnv,
      SKIP_SIGN_IN: "false",
    };

    render(<AppInit />);

    expect(MockedOAuth2Provider).toBeCalled();
    expect(MockedProdApp).toBeCalled();
    expect(MockedDevApp).not.toBeCalled();
  });
});
