/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GraphBrowser } from "../../messier-61-graph/src/graph-browser/GraphBrowser";
import ErrorBoundary from "../../messier-61-graph/src/ErrorBoundary";

export default function App(): JSX.Element {
  console.log("外部App被调用")
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><GraphBrowser /></>} />
      </Routes>
    </Router>
  );
}
