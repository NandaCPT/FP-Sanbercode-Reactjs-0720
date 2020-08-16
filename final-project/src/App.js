import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { UserProvider } from "./context/UserContext";

function App(props) {
  return (
    <div>
      <UserProvider>
        <Router>
          <Routes></Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
