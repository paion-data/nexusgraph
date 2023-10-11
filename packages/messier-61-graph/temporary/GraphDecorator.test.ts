/* Copyright 2023 Paion Data. All rights reserved. */
import { formatNodeLabel } from "./GraphDecorator";

test("lable on node style", () => {
  const shortString = "1234";
  const mediumString = "1234567";
  const longString = "1234567890";

  expect(formatNodeLabel(shortString)).toBe("1234");
  expect(formatNodeLabel(mediumString)).toBe("1234\n567");
  expect(formatNodeLabel(longString)).toBe("1234...");
});
