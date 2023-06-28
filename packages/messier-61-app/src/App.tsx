/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { EditorGraph } from "../../messier-61-graph/src/editor-graph/EditorGraph";

export default function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EditorGraph />} />
      </Routes>
    </Router>
  );
}
