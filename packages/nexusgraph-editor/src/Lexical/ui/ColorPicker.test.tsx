// Copyright 2023 Paion Data. All rights reserved.
import { describe, expect } from "@jest/globals";
import { fireEvent, getByRole, render, screen } from "@testing-library/react";
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

describe("Change the value of textinput to render the specified color",()=>{
  beforeEach(()=>{
    render(
      <ColorPicker
        color={"#ffffff"}
        onChange={() => {
          //do nothing.
        }}
      />
    );
    fireEvent.change(screen.getByRole("textbox"), {target: {value: '#555555'}})
  });

  test("textinput and color-picker-color box render the correct color", () => {
    expect(screen.getByRole("textbox").getAttribute('value')).toBe('#555555');
    expect(document.getElementsByClassName("color-picker-color").length).toBe(1);
    expect(document.getElementsByClassName("color-picker-color")[0].getAttribute("style")).toBe("background-color: rgb(85, 85, 85);");
  });
})

describe("Click the basic color button to render the specified color",()=>{
  beforeEach(()=>{
    render(
      <ColorPicker
        color={"#ffffff"}
        onChange={() => {
          //do nothing.
        }}
      />
    );
    expect(screen.getAllByRole("button")).toHaveLength(16);
    fireEvent.click(screen.getAllByRole("button")[2]);
  });

  test("Correctly render selected buttons", () => {
    expect(screen.getAllByRole("button")[2].getAttribute("class")).toBe(" active");
  });
})

describe("Move Wrapper on color-picker-saturation box to render the specified color",()=>{
  beforeEach(()=>{
    render(
      <ColorPicker
        color={"#ffffff"}
        onChange={() => {
          //do nothing.
        }}
      />
    );
    // var evt = document.getElementsByClassName('color-picker-saturation')[0];
    // evt.clientX = 10;
    // evt.clientY = 10;
    // document.getElementById("link2").fireEvent("onmousemove", evt);
    expect(document.getElementsByClassName('color-picker-saturation_cursor')).toHaveLength(1);
    fireEvent.change(document.getElementsByClassName('color-picker-saturation_cursor')[0], {target: {style: "background-color: rgb(97, 93, 40); left: 126.5px; top: 92.7375px;"}})
  });

  test("Color-picker-saturation box render the correct color and position", () => {
    expect(document.getElementsByClassName("color-picker-saturation_cursor").length).toBe(1);
    expect(document.getElementsByClassName("color-picker-saturation_cursor")[0].getAttribute("style")).toBe("background-color: rgb(248, 231, 28); left: 189.8387096774194px; top: 4.117647058823536px;");
  });
})
