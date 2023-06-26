/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <p>12344566778</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
