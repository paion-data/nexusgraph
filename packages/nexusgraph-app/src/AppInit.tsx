// Copyright 2023 Paion Data. All rights reserved.
import { ReduxStore } from "../../nexusgraph-redux";
import DevApp from "./DevApp";
import LogtoProviderWapper from "./LogtoProvider";
import ProdApp from "./ProdApp";

/**
 * {@link AppInit} offers common init/config and differentiated context wrapper for {@link DevApp | dev} and
 * {@link ProdApp | prod} instances.
 */
export default function AppInit(): JSX.Element {
  if (process.env.NODE_ENV == "development") {
    return (
      <ReduxStore>
        <DevApp />
      </ReduxStore>
    );
  }

  if (process.env.NODE_ENV == "production") {
    return (
      <ReduxStore>
        <LogtoProviderWapper>
          <ProdApp />
        </LogtoProviderWapper>
      </ReduxStore>
    );
  }

  throw new Error("'NODE_ENV' is not defined in .env file. Its value has to be either 'development' or 'production'");
}
