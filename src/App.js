import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./Form";
import Success from "./Submitted";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
  
  
}

export default App;
