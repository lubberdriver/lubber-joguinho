import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import JogarToken from "./pages/JogarToken";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/jogar/:token" element={<JogarToken />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
