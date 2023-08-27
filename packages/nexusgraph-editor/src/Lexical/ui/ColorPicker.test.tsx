// Copyright 2023 Paion Data. All rights reserved.
import { describe, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import ColorPicker from "./ColorPicker";

describe("ColorPicker DOM test", () => {
  test("ColorPicker displays specified color", () => {
    render(
      <ColorPicker
        color={"#ffffff"}
        onChange={() => {
          //do nothing.
        }}
      />
    );
    expect(screen.getByRole("textbox")).toHaveProperty("value", "#ffffff");
  });

  test("Mock onChange function and be called once", () => {
    const onBgColorChange = jest.fn();
    render(<ColorPicker color={"#ffffff"} onChange={onBgColorChange} />);
    expect(onBgColorChange).toHaveBeenCalled;
  });
});
