import { useEffect, useRef, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft {
  const total = target.getTime() - Date.now();
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / 1000 / 60) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

const pad2 = (n: number) => String(n).padStart(2, "0");

type CountdownTimerProps = {
  targetDate: Date;
  variant?: "default" | "glass" | "minimal";
  dateLabel?: string;
};

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
  variant = "glass",
  dateLabel = "July 8 · 8:00 PM ET",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

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
