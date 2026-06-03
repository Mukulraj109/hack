import { useEffect, useMemo, useState } from "react";
import { fetchCountdownConfig } from "../lib/configCache";
import {
  getDefaultHackathonStartDate,
  getDefaultSprintEndDate,
  resolveHackathonStartDate,
  resolveSprintEndDate,
} from "../lib/hackathonDates";

export function useConfigCountdown() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchCountdownConfig();
        if (!cancelled) {
          setData(res.data ?? null);
          setFetchFailed(false);
        }
      } catch {
        if (!cancelled) {
          setData(null);
          setFetchFailed(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const sprintEndDate = useMemo(() => {
    if (data || !fetchFailed) {
      return resolveSprintEndDate(data);
    }
    return getDefaultSprintEndDate();
  }, [data, fetchFailed]);

  const startDate = useMemo(() => {
    if (data || !fetchFailed) {
      return resolveHackathonStartDate(data);
    }
    return getDefaultHackathonStartDate();
  }, [data, fetchFailed]);

  return { countdown: data, sprintEndDate, startDate, loading, usingFallback: fetchFailed || !data?.sprintEndDate };
}

export function useCountdownTick(targetDate) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ended: true,
  });

  useEffect(() => {
    const effectiveDate =
      targetDate instanceof Date && !Number.isNaN(targetDate.getTime())
        ? targetDate
        : getDefaultSprintEndDate();

    const calculate = () => {
      const difference = effectiveDate.getTime() - Date.now();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        ended: false,
      });
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [targetDate?.getTime()]);

  return timeLeft;
}
