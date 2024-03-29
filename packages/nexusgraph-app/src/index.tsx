// Copyright 2023 Paion Data. All rights reserved.
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import AppInit, { setupSentry } from "./AppInit";
import "./index.css";

if (process.env.SENTRY_IO_DSN) {
  setupSentry();
}
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<AppInit />);
