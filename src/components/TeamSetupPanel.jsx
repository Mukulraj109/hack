import { useState } from "react";
import { motion } from "framer-motion";
import { apiFetch } from "../lib/api";
import { useHackathonAuth } from "../auth/HackathonAuthContext";

function Icon({ name, size = 20 }) {
  return (
    <span className="material-symbols-outlined" style={{ fontSize: size }}>
      {name}
    </span>
  );
}

export default function TeamSetupPanel() {
  const { team, canWrite, getAccessToken, refreshSession, user } = useHackathonAuth();
  const [mode, setMode] = useState("create");
  const [title, setTitle] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  if (team) {
    return null;
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!canWrite) {
      setError("Your account must be active to create a team.");
      return;
    }
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const token = await getAccessToken();
      await apiFetch("/api/teams", {
        token,
        method: "POST",
        body: { title: title.trim() },
      });
      setMessage("Team created!");
      await refreshSession();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!canWrite) {
      setError("Your account must be active to join a team.");
      return;
    }
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const token = await getAccessToken();
      await apiFetch("/api/teams/join", {
        token,
        method: "POST",
        body: { inviteCode: inviteCode.trim() },
      });
      setMessage("Joined team!");
      await refreshSession();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.section
      className="mb-8 rounded-2xl border p-6"
      style={{
        borderColor: "rgba(0, 104, 95, 0.2)",
        background: "rgba(255, 255, 255, 0.95)",
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2
        className="text-xl font-bold mb-2"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif", color: "#002B36" }}
      >
        Team setup
      </h2>
      <p className="text-sm mb-4" style={{ color: "#6d7a77" }}>
        Optional — you can use the sprint dashboard solo. Create a team or join with a Team ID (e.g. FST_100_348).
      </p>

      {!canWrite && user?.accountStatus === "pending" && (
        <p className="text-sm mb-4" style={{ color: "#93000a" }}>
          Team actions unlock when your registration is approved.
        </p>
      )}

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMode("create")}
          className="rounded-full px-4 py-2 text-sm font-semibold"
          style={{
            background: mode === "create" ? "#00685f" : "#eceef0",
            color: mode === "create" ? "#fff" : "#3d4947",
          }}
        >
          Create team
        </button>
        <button
          type="button"
          onClick={() => setMode("join")}
          className="rounded-full px-4 py-2 text-sm font-semibold"
          style={{
            background: mode === "join" ? "#00685f" : "#eceef0",
            color: mode === "join" ? "#fff" : "#3d4947",
          }}
        >
          Join team
        </button>
      </div>

      {mode === "create" ? (
        <form onSubmit={handleCreate} className="flex flex-col gap-3 max-w-md">
          <label className="text-xs font-medium uppercase tracking-wide" style={{ color: "#6d7a77" }}>
            Team title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Ivy Eagles"
            required
            minLength={2}
            className="rounded-lg p-3"
            style={{ background: "#f1f5f9", border: "none" }}
          />
          <button
            type="submit"
            disabled={busy || !canWrite}
            className="rounded-full py-2.5 font-semibold text-white disabled:opacity-50"
            style={{ background: "#00685f" }}
          >
            {busy ? "Creating…" : "Create team"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleJoin} className="flex flex-col gap-3 max-w-md">
          <label className="text-xs font-medium uppercase tracking-wide" style={{ color: "#6d7a77" }}>
            Team ID
          </label>
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            placeholder="FST_100_348"
            required
            className="rounded-lg p-3 font-mono"
            style={{ background: "#f1f5f9", border: "none" }}
          />
          <button
            type="submit"
            disabled={busy || !canWrite}
            className="rounded-full py-2.5 font-semibold text-white disabled:opacity-50"
            style={{ background: "#00685f" }}
          >
            {busy ? "Joining…" : "Join team"}
          </button>
        </form>
      )}

      {error && (
        <p className="mt-3 text-sm" style={{ color: "#ba1a1a" }}>
          {error}
        </p>
      )}
      {message && (
        <p className="mt-3 text-sm flex items-center gap-1" style={{ color: "#00685f" }}>
          <Icon name="check_circle" size={18} />
          {message}
        </p>
      )}
    </motion.section>
  );
}
