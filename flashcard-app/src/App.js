import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FlashcardList from "./component/FlashcardList";
import Dashboard from "./component/Dashboard";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/dashboard" style={{ marginLeft: "20px" }}>
            Admin Dashboard
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<FlashcardList />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
