// Copyright 2023 Paion Data. All rights reserved.
import App from "./App";
import { StyledSpinner } from "./styled";

export default function ProdAppContent({ isAuthenticated }: any) {
  if (isAuthenticated) {
    return <App />;
  }

  return <StyledSpinner />;
}
