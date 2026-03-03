import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import AppProviders from "@/app/providers/AppProviders";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProviders />
    </BrowserRouter>
  </React.StrictMode>
);
