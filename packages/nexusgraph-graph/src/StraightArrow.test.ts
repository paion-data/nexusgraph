// Copyright 2023 Paion Data. All rights reserved.
import { StraightArrow } from "./StraightArrow";

test("Gets the coordinates of the drawn line when the captionLayout property is external", () => {
  const straightArrow = new StraightArrow(10, 10, 40, 2, 4, 4, "external");

  expect(straightArrow.outline(5)).toBe(
    "M 10 1 L 15.5 1 L 15.5 -1 L 10 -1 Z M 20.5 1 L 26 1 L 26 2 L 30 0 L 26 -2 L 26 -1 L 20.5 -1 Z"
  );
});

test("Gets the coordinates of the drawn line when the captionLayout property is internal", () => {
  const straightArrow = new StraightArrow(10, 10, 40, 2, 4, 4, "internal");

  expect(straightArrow.outline(5)).toBe("M 10 1 L 26 1 L 26 2 L 30 0 L 26 -2 L 26 -1 L 10 -1 Z");
});

test("Gets the coordinates of the rectangle that covers the relationship", () => {
  const straightArrow = new StraightArrow(10, 10, 40, 2, 4, 4, "internal");

  expect(straightArrow.overlay(3)).toBe("M 10 1.5 L 30 1.5 L 30 -1.5 L 10 -1.5 Z");
});
