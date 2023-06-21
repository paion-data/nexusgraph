/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import renderer from "react-test-renderer";
import { Team } from "./Team";

it("team part renders correctly", () => {
  const tree = renderer.create(<Team />).toJSON();
  expect(tree).toMatchSnapshot();
});
