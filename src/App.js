import React, { useState } from "react";
import "./App.css";
import { SortablePane, Pane } from "react-sortable-pane";
import Example from "./components/Index";
import SimpleUncontrolledExample from "./components/Example2";
import SimpleControlledFullExample from "./components/Example3";

function App() {
  const [order, setOrder] = useState(["0", "1", "2"]);
  const [panes, setPanes] = useState();

  return (
    <div className="app">
      <h1 className="text-center pt-4">Sortable Panes</h1>
      <Example />
    </div>
  );
}

export default App;
