import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navbar from "./components/navbar/Navbar.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Navbar />
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
