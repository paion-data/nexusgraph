// Copyright 2023 Paion Data. All rights reserved.
import { describe, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import DropDown from "./DropDown";
describe("DropDown DOM test", () => {
  test("DropDown", () => {
    render(<DropDown buttonClassName={""} children={undefined} />);
    expect(screen.getByRole("button")).toHaveProperty("disabled");
  });
});

describe("DropDownItem DOM test", () => {
  test("DropDownItem", () => {
    render(<DropDown buttonClassName={""} children={undefined} />);
    expect(screen.getByRole("button")).toHaveProperty("disabled");
  });
});
