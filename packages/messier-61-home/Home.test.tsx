/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";

test("renders app without error", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
});

test("GitHub and Help buttons point to the expected locations", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const githubLink = screen.getByRole("link", { name: /GitHub/i });
  expect(githubLink.getAttribute("href")).toBe("https://github.com/paion-data/Messier-61");

  const helpLink = screen.getByRole("link", { name: /Help/i });
  expect(helpLink.getAttribute("href")).toBe("https://paion-data.github.io/Messier-61/");
});
