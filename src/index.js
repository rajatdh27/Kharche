import React from "react";
import ReactDOM from "react-dom/client";
import ReactPWAInstallProvider from "react-pwa-install";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReactPWAInstallProvider enableLogging>
    <Router>
      <App />
    </Router>
  </ReactPWAInstallProvider>
);
