import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
const rootEl = document.querySelector("#root");
const root = ReactDOM.createRoot(rootEl);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
