import { useEffect } from "react";
import PageContent from "./PageContent";
import { useAppPath } from "./hooks/useAppPath";
import SprintDashboard from "./SprintDashboard";
import SubmissionContent from "./Submission";
import RoadmapContent from "./Roadmap";
import TeamContent from "./Team";
import SprintLayout from "./SprintLayout";
import SprintPortalGate from "./components/SprintPortalGate";
import { useHackathonAuth } from "./auth/HackathonAuthContext";
import { RequireHackathonAuth } from "./auth/RequireHackathonAuth";
import { RequireHackathonAdmin } from "./auth/RequireHackathonAdmin";
import AdminVerification from "./AdminVerification";

function ClaimSpotButton({ className, children, onNavigate }) {
  const { isAuthenticated, login } = useHackathonAuth();

  const handleClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      onNavigate("/sprint");
    } else {
      login("/sprint");
    }
  };

  return (
    <a href="/sprint" className={className} onClick={handleClick}>
      {children}
    </a>
  );
}

export default function App() {
  const { path, handleNavigate } = useAppPath();

  useEffect(() => {
    const webflow = window.Webflow;
    if (!webflow) {
      return undefined;
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

  }, []);

  useEffect(() => {
    if (path === "/register" || path === "/tasks") {
      handleNavigate("/sprint");
    }
  }, [path, handleNavigate]);

  if (path === "/register" || path === "/tasks") {
    return null;
  }

  if (path === "/sprint") {
    return (
      <SprintLayout title="Sprint dashboard" currentPath={path} onNavigate={handleNavigate}>
        <SprintPortalGate returnTo={path} onNavigate={handleNavigate}>
          <SprintDashboard onNavigate={handleNavigate} />
        </SprintPortalGate>
      </SprintLayout>
    );
  }

  if (path === "/submission") {
    return (
      <SprintLayout title="Submissions" currentPath={path} onNavigate={handleNavigate}>
        <SprintPortalGate returnTo={path} onNavigate={handleNavigate}>
          <SubmissionContent />
        </SprintPortalGate>
      </SprintLayout>
    );
  }

  if (path === "/roadmap") {
    return (
      <SprintLayout title="Roadmap" currentPath={path} onNavigate={handleNavigate}>
        <SprintPortalGate returnTo={path} onNavigate={handleNavigate}>
          <RoadmapContent />
        </SprintPortalGate>
      </SprintLayout>
    );
  }

  if (path === "/team") {
    return (
      <SprintLayout title="Team" currentPath={path} onNavigate={handleNavigate}>
        <SprintPortalGate returnTo={path} onNavigate={handleNavigate}>
          <TeamContent />
        </SprintPortalGate>
      </SprintLayout>
    );
  }

  if (path === "/admin") {
    return (
      <SprintLayout title="Admin" currentPath={path} onNavigate={handleNavigate}>
        <RequireHackathonAuth returnTo="/admin" onNavigate={handleNavigate}>
          <RequireHackathonAdmin onNavigate={handleNavigate}>
            <AdminVerification />
          </RequireHackathonAdmin>
        </RequireHackathonAuth>
      </SprintLayout>
    );
  }

  return <PageContent onNavigate={handleNavigate} ClaimSpotButton={ClaimSpotButton} />;
}
