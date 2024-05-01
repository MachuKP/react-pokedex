import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.module.scss";
import { ReduxProvider } from "./store/provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </React.StrictMode>
);