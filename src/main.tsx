import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.module.scss";
import { ReduxProvider } from "./store/provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PokemonDetail from "./page/pokemonDetail.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/pokemon-detail/:id" element={<PokemonDetail />} />
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);
