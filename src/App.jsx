import React from "react";
import { Route, Routes } from "react-router-dom";
import { Contact, Create, Edit } from "./components";

const App = () => {
  return (
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
};

export default App;
