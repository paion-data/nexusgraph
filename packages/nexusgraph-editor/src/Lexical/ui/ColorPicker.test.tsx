// Copyright 2023 Paion Data. All rights reserved.
import { describe, expect } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import ColorPicker from "./ColorPicker";

describe("ColorPicker DOM test", () => {
  test("ColorPicker displays specified color", () => {
    render(
      <ColorPicker
        color={"#ffffff"}
        onChange={() => {
          //do nothing.
        }}
      />
    );
    expect(screen.getByRole("textbox")).toHaveProperty("value", "#ffffff");
  });

  test("Mock onChange function and be called once", () => {
    const onBgColorChange = jest.fn();
    render(<ColorPicker color={"#ffffff"} onChange={onBgColorChange} />);
    expect(onBgColorChange).toHaveBeenCalled;
  });
});

describe("Change the value of textinput to render the specified color", () => {
  beforeEach(() => {
    render(
      <ColorPicker
        color={"#ffffff"}
        onChange={() => {
          //do nothing.
        }}
      />
    );
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "#555555" } });
  });

  test("textinput render the correct color text", () => {
    expect(screen.getByRole("textbox").getAttribute("value")).toBe("#555555");
  });

  test("Color-picker-saturation box render the correct color and position", () => {
    expect(document.getElementsByClassName("color-picker-saturation_cursor").length).toBe(1);
    expect(document.getElementsByClassName("color-picker-saturation_cursor")[0].getAttribute("style")).toBe(
      "background-color: rgb(85, 85, 85); left: 0px; top: 100.00000000000001px;"
    );
  });

  test("Color-picker-hue box render the correct color and position", () => {
    expect(document.getElementsByClassName("color-picker-hue_cursor").length).toBe(1);
    expect(document.getElementsByClassName("color-picker-hue_cursor")[0].getAttribute("style")).toBe(
      "background-color: rgb(255, 0, 0); left: 0px;"
    );
  });

  test("Color-picker-color box render the correct color and position", () => {
    expect(document.getElementsByClassName("color-picker-color").length).toBe(1);
    expect(document.getElementsByClassName("color-picker-color")[0].getAttribute("style")).toBe(
      "background-color: rgb(85, 85, 85);"
    );
  });
});

describe(`Click the basic color button to render the specified color`, () => {
  const rgbColor = [
    "rgb(208, 2, 27)",
    "rgb(245, 166, 35)",
    "rgb(248, 231, 28)",
    "rgb(139, 87, 42)",
    "rgb(126, 211, 33)",
    "rgb(65, 117, 5)",
    "rgb(189, 16, 224)",
    "rgb(144, 19, 254)",
    "rgb(74, 144, 226)",
    "rgb(80, 227, 194)",
    "rgb(184, 233, 134)",
    "rgb(0, 0, 0)",
    "rgb(74, 74, 74)",
    "rgb(155, 155, 155)",
    "rgb(255, 255, 255)",
    "rgb(143, 196, 221)",
  ];

  const rgbhue = [
    "rgb(0, 0, 0)",
    "rgb(0, 0, 0)",
    "rgb(0, 0, 0)",
    "rgb(0, 0, 0)",
    "rgb(0, 0, 0)",
    "rgb(0, 0, 0)",
    "rgb(0, 0, 0)",
    "rgb(0, 0, 0)",
    "rgb(0, 0, 0)",
    "rgb(0, 0, 0)",
    "rgb(0, 0, 0)",
    "rgb(255, 0, 0)",
    "rgb(255, 0, 0)",
    "rgb(255, 0, 0)",
    "rgb(255, 0, 0)",
    "rgb(0, 0, 0)",
  ];

  const saturationLeft = [
    "211.9423076923077px",
    "183.42857142857142px",
    "189.8387096774194px",
    "149.33812949640287px",
    "180.5308056872038px",
    "204.85470085470087px",
    "198.71428571428572px",
    "197.99212598425194px",
    "143.92920353982296px",
    "138.58149779735686px",
    "90.92703862660944px",
    "0px",
    "0px",
    "0px",
    "0px",
    "75.52941176470588px",
  ];

  const saturationTop = [
    "27.64705882352942px",
    "5.88235294117647px",
    "4.117647058823536px",
    "68.23529411764706px",
    "25.882352941176485px",
    "81.17647058823529px",
    "18.235294117647058px",
    "0.588235294117645px",
    "17.058823529411768px",
    "16.470588235294123px",
    "12.94117647058823px",
    "150px",
    "106.4705882352941px",
    "58.82352941176471px",
    "0px",
    "19.999999999999993px",
  ];

  const hueLeft = [
    "209.67152103559872px",
    "22.24920634920635px",
    "32.910606060606064px",
    "16.546391752577325px",
    "52.698501872659165px",
    "52.22619047619048px",
    "172.33173076923075px",
    "161.6382978723404px",
    "126.24122807017544px",
    "98.99319727891155px",
    "53.319865319865315px",
    "0px",
    "0px",
    "0px",
    "0px",
    "118.43162393162393px",
  ];

  const colorText = [
    "#d0021b",
    "#f5a623",
    "#f8e71c",
    "#8b572a",
    "#7ed321",
    "#417505",
    "#bd10e0",
    "#9013fe",
    "#4a90e2",
    "#50e3c2",
    "#b8e986",
    "#000000",
    "#4a4a4a",
    "#9b9b9b",
    "#ffffff",
    "#8fc4dd",
  ];
  beforeEach(() => {
    render(
      <ColorPicker
        color={"#ffffff"}
        onChange={() => {
          //do nothing.
        }}
      />
    );
    expect(screen.getAllByRole("button")).toHaveLength(16);
  });
  for (let i = 0; i < 16; i++) {
    describe(`click the basic color button ${i + 1}`, () => {
      test("Correctly render selected buttons", () => {
        fireEvent.click(screen.getAllByRole("button")[i]);
        expect(screen.getAllByRole("button")[i].getAttribute("class")).toBe(" active");
      });

      test("textinput render the correct color text", () => {
        fireEvent.click(screen.getAllByRole("button")[i]);
        expect(screen.getByRole("textbox").getAttribute("value")).toBe(colorText[i]);
      });

      test("Color-picker-saturation box render the correct color and position", () => {
        fireEvent.click(screen.getAllByRole("button")[i]);
        expect(document.getElementsByClassName("color-picker-saturation_cursor").length).toBe(1);
        expect(document.getElementsByClassName("color-picker-saturation_cursor")[0].getAttribute("style")).toBe(
          `background-color: ${rgbColor[i]}; left: ${saturationLeft[i]}; top: ${saturationTop[i]};`
        );
      });

      test("Color-picker-hue box render the correct color and position", () => {
        fireEvent.click(screen.getAllByRole("button")[i]);
        expect(document.getElementsByClassName("color-picker-hue_cursor").length).toBe(1);
        expect(document.getElementsByClassName("color-picker-hue_cursor")[0].getAttribute("style")).toBe(
          `background-color: ${rgbhue[i]}; left: ${hueLeft[i]};`
        );
      });

      test("Color-picker-color box render the correct color and position", () => {
        fireEvent.click(screen.getAllByRole("button")[i]);
        expect(document.getElementsByClassName("color-picker-color").length).toBe(1);
        expect(document.getElementsByClassName("color-picker-color")[0].getAttribute("style")).toBe(
          `background-color: ${rgbColor[i]};`
        );
      });
    });
  }
});

describe("Change the positon of Color-picker-saturation boll to render the correct color", () => {
  beforeEach(() => {
    render(
      <ColorPicker
        color={"#ffffff"}
        onChange={() => {
          //do nothing.
        }}
      />
    );
  });
  const saturation = document.getElementsByClassName("color-picker-saturation")[0];
  fireEvent.change(saturation, { target: { x: 98, y: 99 } });

  test("textinput render the correct color text", () => {
    expect(screen.getByRole("textbox").getAttribute("value")).toBe("#555555");
  });

  test("Color-picker-saturation box render the correct color and position", () => {
    expect(document.getElementsByClassName("color-picker-saturation_cursor").length).toBe(1);
    expect(document.getElementsByClassName("color-picker-saturation_cursor")[0].getAttribute("style")).toBe(
      "background-color: rgb(85, 85, 85); left: 0px; top: 100.00000000000001px;"
    );
  });

  test("Color-picker-hue box render the correct color and position", () => {
    expect(document.getElementsByClassName("color-picker-hue_cursor").length).toBe(1);
    expect(document.getElementsByClassName("color-picker-hue_cursor")[0].getAttribute("style")).toBe(
      "background-color: rgb(255, 0, 0); left: 0px;"
    );
  });

  test("Color-picker-color box render the correct color and position", () => {
    expect(document.getElementsByClassName("color-picker-color").length).toBe(1);
    expect(document.getElementsByClassName("color-picker-color")[0].getAttribute("style")).toBe(
      "background-color: rgb(85, 85, 85);"
    );
  });
});

describe("Change the positon of Color-picker-hue boll to render the correct color", () => {
  beforeEach(() => {
    render(
      <ColorPicker
        color={"#ffffff"}
        onChange={() => {
          //do nothing.
        }}
      />
    );
  });
  const saturation = document.getElementsByClassName("color-picker-saturation")[0];
  fireEvent.change(saturation, { target: { x: 98, y: 99 } });

  test("textinput render the correct color text", () => {
    expect(screen.getByRole("textbox").getAttribute("value")).toBe("#555555");
  });

  test("Color-picker-saturation box render the correct color and position", () => {
    expect(document.getElementsByClassName("color-picker-saturation_cursor").length).toBe(1);
    expect(document.getElementsByClassName("color-picker-saturation_cursor")[0].getAttribute("style")).toBe(
      "background-color: rgb(85, 85, 85); left: 0px; top: 100.00000000000001px;"
    );
  });

  test("Color-picker-hue box render the correct color and position", () => {
    expect(document.getElementsByClassName("color-picker-hue_cursor").length).toBe(1);
    expect(document.getElementsByClassName("color-picker-hue_cursor")[0].getAttribute("style")).toBe(
      "background-color: rgb(255, 0, 0); left: 0px;"
    );
  });

  test("Color-picker-color box render the correct color and position", () => {
    expect(document.getElementsByClassName("color-picker-color").length).toBe(1);
    expect(document.getElementsByClassName("color-picker-color")[0].getAttribute("style")).toBe(
      "background-color: rgb(85, 85, 85);"
    );
  });
});
