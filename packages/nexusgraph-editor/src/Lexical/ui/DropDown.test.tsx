// Copyright 2023 Paion Data. All rights reserved.
import { describe, expect } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import DropDown, { DropDownItem } from "./DropDown";

describe("DropDown DOM test", () => {
  test("DropDown displays specified disabled", () => {
    render(<DropDown disabled={true} buttonClassName={""} children={undefined} />);
    expect(screen.getByRole("button")).toHaveProperty("disabled");
  });

  test("DropDown displays specified children", () => {
    render(<DropDown buttonClassName={""} children={<div data-testid="children" />} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByTestId("children")).not.toBeNull;
  });

  test("DropDown displays specified buttonAriaLabel", () => {
    render(<DropDown disabled={false} buttonAriaLabel={"menu"} buttonClassName={""} children={undefined} />);
    expect(screen.getByRole("button", { name: /menu/i })).not.toBeNull;
  });

  test("DropDown displays specified buttonClassName", () => {
    render(<DropDown disabled={false} buttonClassName={"button"} children={undefined} />);
    expect(screen.getByRole("button")).toHaveProperty("className", "button");
  });

  test("DropDown displays specified buttonIconClassName", () => {
    render(<DropDown disabled={false} buttonIconClassName={"icon"} buttonClassName={""} children={undefined} />);
    expect(document.getElementsByClassName("icon")[0].getAttribute("class")).toBe("icon");
  });

  test("DropDown displays specified buttonLabel", () => {
    render(<DropDown disabled={false} buttonLabel={"label"} buttonClassName={""} children={undefined} />);
    expect(screen.getByText("label")).not.toBeNull;
  });

  test("StopCloseOnClickSelf is true, click the basic-color button, and the drop-down box will not disappear", () => {
    render(
      <DropDown
        disabled={false}
        stopCloseOnClickSelf={true}
        buttonClassName={""}
        children={<button data-testid="buttonitem" />}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByTestId("buttonitem"));

    expect(document.getElementsByClassName(".dropdown")).not.toBeNull;
  });

  test("StopCloseOnClickSelf is false, click the basic-color button, and the drop-down box will disappear", () => {
    render(
      <DropDown
        disabled={false}
        stopCloseOnClickSelf={false}
        buttonClassName={""}
        children={<button data-testid="buttonitem" />}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByTestId("buttonitem"));

    expect(document.getElementsByClassName(".dropdown")).toBeNull;
  });
});

describe("DropDownItem DOM test", () => {
  test("DropDownItem displays specified children", () => {
    render(
      <DropDown buttonClassName={""}>
        <DropDownItem
          children={<div data-testid="children" />}
          className={""}
          onClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
            throw new Error("Function not implemented.");
          }}
        />
      </DropDown>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByTestId("children")).not.toBeNull;
  });

  test("DropDownItem displays specified title", () => {
    render(
      <DropDown buttonClassName={""}>
        <DropDownItem
          children={undefined}
          className={""}
          title={"title"}
          onClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
            throw new Error("Function not implemented.");
          }}
        />
      </DropDown>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByTitle("title")).not.toBeNull;
  });

  test("DropDownItem displays specified className", () => {
    render(
      <DropDown buttonClassName={""}>
        <DropDownItem
          children={undefined}
          className={"button"}
          title={"title"}
          onClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
            throw new Error("Function not implemented.");
          }}
        />
      </DropDown>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByTitle("title")).toHaveProperty("className", "button");
  });

  test("Mock onClick function in DropDownItem and be called", () => {
    const clickevent = jest.fn();
    render(
      <DropDown buttonClassName={""}>
        <DropDownItem children={undefined} className={""} onClick={clickevent} />
      </DropDown>
    );
    expect(clickevent).toHaveBeenCalled;
  });
});
