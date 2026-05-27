import { RequireHackathonAuth } from "../auth/RequireHackathonAuth";
import RegistrationBanner, { PendingAccountBanner } from "./RegistrationBanner";
import { useHackathonAuth } from "../auth/HackathonAuthContext";

export default function SprintPortalGate({ children }) {
  const { user, refreshSession } = useHackathonAuth();

  return (
    <RequireHackathonAuth>
      <div className="sprint-portal-gate">
        <RegistrationBanner user={user} onRefresh={refreshSession} />
        <PendingAccountBanner user={user} />
        <div
          className={user && !user.canWrite ? "sprint-portal-gate--readonly" : undefined}
          style={user && !user.canWrite ? { pointerEvents: "none", opacity: 0.92 } : undefined}
          aria-readonly={user && !user.canWrite ? true : undefined}
        >
          {children}
        </div>
      </div>
    </RequireHackathonAuth>
  );
}
