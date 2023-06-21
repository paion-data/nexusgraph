/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import renderer from "react-test-renderer";
import { Footer } from "./footer";

it("footer part renders correctly", () => {
  const tree = renderer.create(<Footer />).toJSON();
  expect(tree).toMatchSnapshot();
});
