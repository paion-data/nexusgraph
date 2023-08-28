// Copyright 2023 Paion Data. All rights reserved.
import renderer from "react-test-renderer";
import React from "react";
import DropDown from "./DropDown";
import ColorPicker from "./ColorPicker";

it("Dropdown and ColorPicker part renders correctly", () => {
  const component = renderer.create(
    <DropDown
      disabled={false}
      stopCloseOnClickSelf={true}
      buttonClassName="color-picker"
      buttonAriaLabel="Formatting color"
      buttonIconClassName="icon color"
    >
      <ColorPicker
        color={"#ffffff"}
        onChange={() => {
          //do nothing
        }}
      />
    </DropDown>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
