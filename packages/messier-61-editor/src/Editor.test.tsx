/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import React from "react";
import { render } from "@testing-library/react";
import Editor from "./Editor";

test("[Sanity Check] Loads editor without error", () => {
  render(<Editor transformer={() => {}} exporter={() => {}} />);
});
