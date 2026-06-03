import { useState } from "react";
import { apiFetch } from "../../lib/api";

function Icon({ name, size = 20 }) {
  return (
    <span className="material-symbols-outlined" style={{ fontSize: size }}>
      {name}
    </span>
  );
}

export default function SprintTrackPickModal({
  open,
  teamId,
  tracks = [],
  getAccessToken,
  onClose,
  onSaved,
}) {
  const [selected, setSelected] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  if (!open) return null;

  const handleSave = async () => {
    if (!selected || !teamId) return;
    setBusy(true);
    setError(null);
    try {
      const token = await getAccessToken();
      await apiFetch(`/api/teams/${teamId}`, {
        token,
        method: "PUT",
        body: { track: selected },
      });
      await onSaved?.();
      onClose?.();
    } catch (err) {
      setError(err?.message || "Could not save track");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="sprint-track-modal__backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sprint-track-modal-title"
    >
      <div className="sprint-track-modal__panel">
        <h3 id="sprint-track-modal-title" className="sprint-track-modal__title">
          Choose your hackathon track
        </h3>
        <p className="sprint-track-modal__copy">
          Pick the brief your team is building for. You can only select one track.
        </p>
        <div className="sprint-track-modal__options">
          {tracks.map((t) => (
            <label key={t.id} className="sprint-track-modal__option">
              <input
                type="radio"
                name="team-track"
                value={t.id}
                checked={selected === t.id}
                onChange={() => setSelected(t.id)}
              />
              <span>
                <strong>{t.title}</strong>
                <small>{t.description}</small>
              </span>
            </label>
          ))}
        </div>
        {error && (
          <p className="sprint-track-modal__error" role="alert">
            {error}
          </p>
        )}
        <div className="sprint-track-modal__actions">
          <button type="button" className="sprint-track-modal__btn-secondary" onClick={onClose}>
            Later
          </button>
          <button
            type="button"
            className="sprint-track-modal__btn-primary"
            disabled={!selected || busy}
            onClick={handleSave}
          >
            {busy ? "Saving…" : "Confirm track"}
          </button>
        </div>
      </div>
    </div>
  );
}
