// Copyright 2023 Paion Data. All rights reserved.
import { NodeModel } from "./Node";

test("Verify Node serialization contains all node properties", () => {
  const node = new NodeModel(
    "1",
    ["label1", "label2"],
    { propKey1: "value1", propkey2: "value2" },
    { propKey1: "string", propkey2: "string" }
  );

  expect(node.toJson()).toStrictEqual({ propKey1: "value1", propkey2: "value2" });
});
