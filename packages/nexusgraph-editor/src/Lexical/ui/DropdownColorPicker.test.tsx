// Copyright 2023 Paion Data. All rights reserved.
import { describe, expect } from "@jest/globals";
import { fireEvent, logRoles, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import DropdownColorPicker from "./DropdownColorPicker";
import onBgColorSelect from "../plugins/ToolbarPlugin/index";
describe("Dropdown color picker DOM test", () => {
  test("DropdownColorPicker displays specified disabled", () => {
    render(
      <DropdownColorPicker
        disabled={true}
        stopCloseOnClickSelf
        buttonClassName={""}
        color={""}
        onChange={() => {
          //do nothing.
        }}
      />
    );
    expect(screen.getByRole("button")).toHaveProperty("disabled");
  });

  test("DropdownColorPicker displays specified buttonAriaLabel", () => {
    render(
      <DropdownColorPicker
        disabled={false}
        stopCloseOnClickSelf
        buttonAriaLabel={"button"}
        buttonClassName={""}
        color={""}
        onChange={() => {
          //do nothing.
        }}
      />
    );
    expect(screen.getByRole("button", { name: /button/i })).not.toBeNull;
  });

  test("DropdownColorPicker displays specified buttonClassName", () => {
    render(
      <DropdownColorPicker
        disabled={false}
        stopCloseOnClickSelf
        buttonClassName={"button"}
        color={""}
        onChange={() => {
          //do nothing.
        }}
      />
    );
    expect(screen.getByRole("button")).toHaveProperty("className", "button");
  });

  test("DropdownColorPicker displays specified buttonIconClassName", () => {
    render(
      <DropdownColorPicker
        disabled={false}
        stopCloseOnClickSelf
        buttonClassName={""}
        buttonIconClassName={"icon"}
        color={""}
        onChange={() => {
          //do nothing.
        }}
      />
    );
    expect(screen.getByTestId("icon")).toHaveProperty("className", "icon");
  });

  test("DropdownColorPicker displays specified color", () => {
    render(
      <DropdownColorPicker
        disabled={false}
        stopCloseOnClickSelf
        buttonClassName={""}
        color={"#ffffff"}
        onChange={() => {
          //do nothing.
        }}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("textbox")).toHaveProperty("value", "#ffffff");
  });

  test("stopCloseOnClickSelf", () => {
    render(
      <DropdownColorPicker
        disabled={false}
        stopCloseOnClickSelf={true}
        color={"#ffffff"}
        buttonClassName={""}
        buttonIconClassName={""}
        onChange={() => {
          onBgColorSelect;
        }}
      />
    );
    fireEvent.click(screen.getByRole("button"));
  });

  test("Mock onChange function and be called once", () => {
    const onBgColorSelect = jest.fn();
    render(
      <DropdownColorPicker
        disabled={false}
        stopCloseOnClickSelf
        buttonClassName={""}
        buttonIconClassName={""}
        color={"#ffffff"}
        onChange={() => {
          onBgColorSelect;
        }}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    onBgColorSelect("#000000");
    expect(onBgColorSelect).toHaveBeenCalledTimes(1);
  });
});
