/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
