/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import renderer from "react-test-renderer";
import { Image } from "./image";

it("renders correctly", () => {
  const tree = renderer.create(<Image />).toJSON();
  expect(tree).toMatchSnapshot();
});
