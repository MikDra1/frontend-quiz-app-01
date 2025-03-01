import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GameProvider } from "./contexts/GameProvider.jsx";
import { ProjectProvider } from "./contexts/ProjectProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProjectProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </ProjectProvider>
  </StrictMode>
);
