import React from "react";
import "./App.css";
import Desktop from "./components/Desktop";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Desktop />
      </div>
    </Router>
  );
}

export default App;
