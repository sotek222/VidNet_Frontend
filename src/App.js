import React from "react";
import "./App.css";
import Desktop from "./components/Desktop";
import { BrowserRouter as Router } from "react-router-dom";
import APICommunicator from "./services/Adapter-2";

function App() {

  const adapter = new APICommunicator();
  
  return (
    <Router>
      <div className="App">
        <Desktop adapter={adapter}/>
      </div>
    </Router>
  );
}

export default App;
