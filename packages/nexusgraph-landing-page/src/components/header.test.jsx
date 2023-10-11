/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import renderer from "react-test-renderer";
import { Header } from "./header";

it("header part renders correctly", () => {
  const tree = renderer.create(<Header />).toJSON();
  expect(tree).toMatchSnapshot();
});
