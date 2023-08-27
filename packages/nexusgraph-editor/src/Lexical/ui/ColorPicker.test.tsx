// Copyright 2023 Paion Data. All rights reserved.
import { describe, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import ColorPicker from "./ColorPicker";

describe("ColorPicker DOM test", () => {
  test("Placeholder defaults to an empty string", () => {
    render(<ColorPicker color={""} />);
  });
});
