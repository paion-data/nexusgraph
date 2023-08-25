// Copyright 2023 Paion Data. All rights reserved.
import { describe, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import TextInput from "./TextInput";

describe("text input DOM test", () => {
  test("Placeholder defaults to an empty string", () => {
    render(
      <TextInput
        label=""
        value=""
        onChange={() => {
          // do nothing.
        }}
        data-testid="default-placeholder-test"
      />
    );
    expect(screen.getByTestId("default-placeholder-test").getAttribute("placeholder")).toBe("");
  });

  test("Text input displays specified label", () => {
    render(
      <TextInput
        label="my label"
        value=""
        onChange={() => {
          // do nothing.
        }}
      />
    );
    expect(document.getElementsByClassName("Input__label").length).toBe(1);
    expect(document.getElementsByClassName("Input__label")[0].textContent).toBe("my label");
  });

  test("Text input displays specified value", () => {
    render(
      <TextInput
        label=""
        data-testid="specified-value-test"
        value="text in input box"
        onChange={() => {
          // do nothing.
        }}
      />
    );
    expect(screen.getByTestId("specified-value-test").getAttribute("value")).toBe("text in input box");
  });

  test("Text input has the specified data-testid", () => {
    render(
      <TextInput
        label=""
        value=""
        data-testid="specified-data-testid"
        onChange={() => {
          // do nothing.
        }}
      />
    );
    expect(screen.getByTestId("specified-data-testid").getAttribute("data-testid")).toBe("specified-data-testid");
  });

  test("The default type of input is 'text'", () => {
    render(
      <TextInput
        label=""
        value=""
        data-testid="default-type-testid"
        onChange={() => {
          // do nothing.
        }}
      />
    );
    expect(screen.getByTestId("default-type-testid").getAttribute("type")).toBe("text");
  });

  test("Text input displays specified type", () => {
    render(
      <TextInput
        label=""
        value=""
        data-testid="specified-type-testid"
        type="file"
        onChange={() => {
          // do nothing.
        }}
      />
    );
    expect(screen.getByTestId("specified-type-testid").getAttribute("type")).toBe("file");
  });
});
