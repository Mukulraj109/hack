import { useEffect, useState } from "react";
import PageContent from "./PageContent";
import TasksPage from "./TasksPage";

export default function App() {
  const [path, setPath] = useState(() =>
    typeof window !== "undefined" ? window.location.pathname : "/",
  );

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    const webflow = window.Webflow;
    if (!webflow) {
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }

    try {
      webflow.destroy();
      webflow.ready();
      if (typeof webflow.require === "function") {
        const ix2 = webflow.require("ix2");
        if (ix2 && typeof ix2.init === "function") {
          ix2.init();
        }
      }
    } catch (error) {
      console.error("Webflow re-init failed", error);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleNavigate = (nextPath) => {
    if (window.location.pathname === nextPath) {
      return;
    }

    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
  };

  if (path === "/register" || path === "/tasks") {
    return <TasksPage />;
  }

  return <PageContent onNavigate={handleNavigate} />;
}
