import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0ProviderWithNavigate } from "./auth/Auth0ProviderWithNavigate";
import { HackathonAuthProvider } from "./auth/HackathonAuthContext";
import "./index.css";
import "./styles/nav.css";
import "./styles/hero.css";
import "./styles/career.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0ProviderWithNavigate>
      <HackathonAuthProvider>
        <App />
      </HackathonAuthProvider>
    </Auth0ProviderWithNavigate>
  </React.StrictMode>
);
