import { useCallback, useEffect, useState } from "react";
import { RequireHackathonAuth } from "../auth/RequireHackathonAuth";
import RegistrationFormEmbed from "./RegistrationFormEmbed";
import SprintRegistrationGateModal from "./SprintRegistrationGateModal";
import SprintUnderReviewGateModal from "./SprintUnderReviewGateModal";
import { useHackathonAuth } from "../auth/HackathonAuthContext";
import { isRegistrationPendingReview } from "../lib/hackathonGateStatus";

function SprintPortalGateContent({ children, onRefresh }) {
  const { user } = useHackathonAuth();
  const [formOpen, setFormOpen] = useState(false);

  const needsRegistration = user && !isRegistrationPendingReview(user);
  const underReview = isRegistrationPendingReview(user) && !user.canWrite;
  const canAccess = user?.canWrite;

  useEffect(() => {
    if (!underReview) return undefined;

    const interval = window.setInterval(() => {
      onRefresh({ silent: true });
    }, 30_000);

    return () => window.clearInterval(interval);
  }, [underReview, onRefresh]);

  const handleClaimSpot = useCallback(() => {
    setFormOpen(true);
  }, []);

  const handleFormRefresh = useCallback(async () => {
    await onRefresh({ markSubmitted: true });
    setFormOpen(false);
  }, [onRefresh]);

  const handleRefreshStatus = useCallback(async () => {
    await onRefresh({ markSubmitted: true });
  }, [onRefresh]);

  if (!user) {
    return null;
  }

  return (
    <div className="sprint-portal-gate">
      {needsRegistration && !formOpen && (
        <SprintRegistrationGateModal
          user={user}
          onClaimSpot={handleClaimSpot}
          onRefresh={handleRefreshStatus}
        />
      )}

      {needsRegistration && formOpen && (
        <RegistrationFormEmbed
          user={user}
          onRefresh={handleFormRefresh}
          gateMode
          dismissible={false}
          autoOpen
        />
      )}

      {underReview && <SprintUnderReviewGateModal onRefresh={onRefresh} />}

      {canAccess ? (
        children
      ) : (
        <div className="sprint-portal-gate--blocked" aria-hidden="true">
          {children}
        </div>
      )}
    </div>
  );
}

export default function SprintPortalGate({ children, returnTo = "/sprint", onNavigate }) {
  const { refreshSession } = useHackathonAuth();

  return (
    <RequireHackathonAuth returnTo={returnTo} onNavigate={onNavigate}>
      <SprintPortalGateContent onRefresh={refreshSession}>{children}</SprintPortalGateContent>
    </RequireHackathonAuth>
  );
}
