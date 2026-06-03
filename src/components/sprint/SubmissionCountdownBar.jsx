import { useConfigCountdown, useCountdownTick } from "../../hooks/useConfigCountdown";

export default function SubmissionCountdownBar() {
  const { sprintEndDate } = useConfigCountdown();
  const time = useCountdownTick(sprintEndDate);
  const pad = (n) => String(n).padStart(2, "0");

  const countdownText = time.ended
    ? "Submission window closed"
    : `${pad(time.days)} : ${pad(time.hours)} : ${pad(time.minutes)} : ${pad(time.seconds)}`;

  return (
    <div className="sprint-submission-countdown" role="timer" aria-live="polite">
      <div className="sprint-submission-countdown__inner">
        <span
          className="material-symbols-outlined sprint-submission-countdown__icon"
          style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
          aria-hidden
        >
          warning
        </span>
        <p className="sprint-submission-countdown__text">
          {time.ended ? (
            countdownText
          ) : (
            <>
              Final Submission Window Locks In:{" "}
              <span className="sprint-submission-countdown__digits">{countdownText}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
