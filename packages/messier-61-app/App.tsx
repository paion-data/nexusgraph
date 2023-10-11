/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../messier-61-home/Home";
import { ExternalBrain } from "../messier-61-external-brain";

export default function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/externalbrain" element={<ExternalBrain />} />
      </Routes>
    </Router>
  );
}
