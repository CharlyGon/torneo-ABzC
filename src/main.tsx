import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { TournamentPage } from "./TournamentPage";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <TournamentPage />
  </React.StrictMode>
);
