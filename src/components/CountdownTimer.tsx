import { useEffect, useRef, useState } from "react";
import { SPRINT_HOURS } from "../lib/hackathonDates";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type SprintRemaining = {
  totalHours: number;
  minutes: number;
  ended: boolean;
};

function msToTimeLeft(total: number): TimeLeft {
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / 1000 / 60) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

function getTimeLeft(target: Date): TimeLeft {
  return msToTimeLeft(target.getTime() - Date.now());
}

function msToSprintRemaining(total: number): SprintRemaining {
  if (total <= 0) return { totalHours: 0, minutes: 0, ended: true };
  return {
    totalHours: Math.floor(total / (1000 * 60 * 60)),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    ended: false,
  };
}

function useTickingMs(initialMs: number | null | undefined, fallbackMs: () => number) {
  const [ms, setMs] = useState(() =>
    initialMs != null ? initialMs : fallbackMs()
  );

  useEffect(() => {
    if (initialMs != null) setMs(initialMs);
  }, [initialMs]);

  useEffect(() => {
    const id = setInterval(() => {
      setMs((prev) => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return ms;
}

const pad2 = (n: number) => String(n).padStart(2, "0");

type CountdownTimerProps = {
  targetDate: Date;
  sprintEndDate?: Date;
  started?: boolean;
  ended?: boolean;
  remainingMs?: number | null;
  remainingUntilStartMs?: number | null;
  variant?: "default" | "glass" | "minimal";
  dateLabel?: string;
};

function LiveSprintText({
  sprintEndDate,
  remainingMs,
  ended,
}: {
  sprintEndDate: Date;
  remainingMs?: number | null;
  ended?: boolean;
}) {
  const tickingMs = useTickingMs(
    remainingMs,
    () => sprintEndDate.getTime() - Date.now()
  );
  const remaining = ended ? { totalHours: 0, minutes: 0, ended: true } : msToSprintRemaining(tickingMs);

  if (remaining.ended) {
    return (
      <p className="countdown-live" role="status">
        Submissions closed
      </p>
    );
  }

  return (
    <p className="countdown-live" role="timer" aria-live="polite">
      <span className="countdown-live__accent">We are live,</span>{" "}
      <span className="countdown-live__message">submission closes in</span>{" "}
      <span className="countdown-live__time">
        {remaining.totalHours}hr {pad2(remaining.minutes)}m
      </span>
    </p>
  );
}

function MinimalSegment({ label, value }: { label: string; value: number }) {
  return (
    <div className="countdown-minimal__segment">
      <span className="countdown-minimal__value">{pad2(value)}</span>
      <span className="countdown-minimal__label">{label}</span>
    </div>
  );
}

const FLIP_MS = 550;

function FlipDigit({ digit }: { digit: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef(digit);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || prevRef.current === digit) return;

    const oldDigit = prevRef.current;
    prevRef.current = digit;

    card.setAttribute("data-old", oldDigit);
    card.classList.remove("flipping");
    void card.offsetWidth;
    card.classList.add("flipping");

    const timer = window.setTimeout(() => {
      card.classList.remove("flipping");
      card.setAttribute("data-old", digit);
    }, FLIP_MS);

    return () => window.clearTimeout(timer);
  }, [digit]);

  return (
    <div className="fc-digit">
      <div ref={cardRef} className="fc-card" data-old={digit}>
        <div className="fc-front" aria-hidden="true">
          <span className="fc-num">{digit}</span>
        </div>
        <div className="fc-back" aria-hidden="true">
          <span className="fc-num">{digit}</span>
        </div>
      </div>
      <span className="fc-sr">{digit}</span>
    </div>
  );
}

function FlipUnit({ label, value }: { label: string; value: number }) {
  const str = pad2(value);
  return (
    <div className="fc-unit">
      <div className="fc-digits">
        <FlipDigit digit={str[0]} />
        <FlipDigit digit={str[1]} />
      </div>
      <div className="fc-label">{label}</div>
    </div>
  );
}

function FlipCountdown({
  timeLeft,
  dateLabel,
  glass,
}: {
  timeLeft: TimeLeft;
  dateLabel: string;
  glass: boolean;
}) {
  return (
    <div
      className={glass ? "flip-clock countdown-glass" : "flip-clock"}
      role="timer"
      aria-live="polite"
    >
      <div className="flip-clock-header">
        <span className="fc-status">
          <span className="fc-dot" aria-hidden="true" />
          Hackathon starts in
        </span>
        <span className="fc-date">{dateLabel}</span>
      </div>

      <div className="flip-clock-units">
        <FlipUnit label="Days" value={timeLeft.days} />
        <span className="fc-sep" aria-hidden="true">
          :
        </span>
        <FlipUnit label="Hours" value={timeLeft.hours} />
        <span className="fc-sep" aria-hidden="true">
          :
        </span>
        <FlipUnit label="Minutes" value={timeLeft.minutes} />
        <span className="fc-sep" aria-hidden="true">
          :
        </span>
        <FlipUnit label="Seconds" value={timeLeft.seconds} />
      </div>
    </div>
  );
}

export function CountdownTimer({
  targetDate,
  sprintEndDate,
  started,
  ended,
  remainingMs,
  remainingUntilStartMs,
  variant = "glass",
  dateLabel = "July 8 · 8:00 PM ET",
}: CountdownTimerProps) {
  const effectiveSprintEnd =
    sprintEndDate ??
    new Date(targetDate.getTime() + SPRINT_HOURS * 60 * 60 * 1000);

  const usesServerState = started !== undefined;
  const isLive = usesServerState
    ? Boolean(started)
    : Date.now() >= targetDate.getTime();

  const [localTimeLeft, setLocalTimeLeft] = useState(() => getTimeLeft(targetDate));
  const preStartMs = useTickingMs(
    usesServerState && !isLive ? remainingUntilStartMs : null,
    () => targetDate.getTime() - Date.now()
  );

  useEffect(() => {
    if (usesServerState) return undefined;

    const id = setInterval(() => setLocalTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate, usesServerState]);

  const timeLeft =
    usesServerState && !isLive ? msToTimeLeft(preStartMs) : localTimeLeft;

  if (isLive) {
    return (
      <LiveSprintText
        sprintEndDate={effectiveSprintEnd}
        remainingMs={remainingMs}
        ended={ended}
      />
    );
  }

  if (variant === "minimal") {
    return (
      <div className="countdown-minimal" role="timer" aria-live="polite">
        <div className="countdown-minimal__panel">
          <div className="countdown-minimal__meta">
            <span className="countdown-minimal__status">Hackathon starts in</span>
            <span className="countdown-minimal__date">{dateLabel}</span>
          </div>

          <div className="countdown-minimal__grid" aria-label="Time remaining">
            <MinimalSegment label="Days" value={timeLeft.days} />
            <MinimalSegment label="Hours" value={timeLeft.hours} />
            <MinimalSegment label="Minutes" value={timeLeft.minutes} />
            <MinimalSegment label="Seconds" value={timeLeft.seconds} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <FlipCountdown
      timeLeft={timeLeft}
      dateLabel={dateLabel}
      glass={variant === "glass"}
    />
  );
}

export default CountdownTimer;
