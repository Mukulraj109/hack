import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-06-15T00:00:00");

function useCountdown(targetDate) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
    }
    const totalSec = Math.floor(diff / 1000);
    return {
      days: Math.floor(totalSec / 86400),
      hours: Math.floor((totalSec % 86400) / 3600),
      minutes: Math.floor((totalSec % 3600) / 60),
      seconds: totalSec % 60,
      ended: false,
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = window.setInterval(() => setTime(calc()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

export default function SubmissionCountdownBar() {
  const time = useCountdown(TARGET_DATE);
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
