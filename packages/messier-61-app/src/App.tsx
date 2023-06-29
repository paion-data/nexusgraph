/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GraphBroser } from "../../messier-61-graph/src/graph-broser/GraphBroser";

export default function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GraphBroser />} />
      </Routes>
    </Router>
  );
}
