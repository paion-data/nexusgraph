/* Copyright 2023 Paion Data. All rights reserved. */
import { textLable } from "./GraphDecorator"

test("lable on node style", () => {
    const shortString = "1234";
    const mediumString = "1234567";
    const longString = "1234567890";

    expect(textLable(shortString)).toBe("1234");
    expect(textLable(mediumString)).toBe("1234\n567");
    expect(textLable(longString)).toBe("1234...");
})
