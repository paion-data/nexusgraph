/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import renderer from "react-test-renderer";
import { Services } from "./services";

it("services part renders correctly", () => {
  const tree = renderer.create(<Services />).toJSON();
  expect(tree).toMatchSnapshot();
});
