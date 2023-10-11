/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GraphBrowser } from "../../messier-61-graph/src/graph-browser/GraphBrowser";

export default function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GraphBrowser />} />
      </Routes>
    </Router>
  );
}
