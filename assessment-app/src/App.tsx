import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from './views/HomeScreen';
import AddDocument from "./views/AddDocument";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/add" element={<AddDocument />} />
      </Routes>
    </Router>
  );
}

export default App;
