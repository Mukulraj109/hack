import { useCallback, useEffect, useRef, useState } from "react";

const CAPTIONS = [
  "Skip the queue. Ship code, not resumes.",
  "Any stack. We judge the solution, not the syntax.",
  "Let your product do the talking, not a resume parser.",
];

const TYPE_SPEED = 32;
const ERASE_SPEED = 16;
const HOLD_AFTER = 2800;
const HOLD_BLANK = 280;

export function HeroPromoCaption() {
  const [displayText, setDisplayText] = useState("");
  const [isClient, setIsClient] = useState(false);
  const indexRef = useRef(0);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const erasingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const clearTimers = useCallback(() => {
    if (typingRef.current) clearTimeout(typingRef.current);
    if (erasingRef.current) clearTimeout(erasingRef.current);
  }, []);

  const typeText = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      let i = 0;
      setDisplayText("");
      const step = () => {
        if (i < text.length) {
          setDisplayText(text.slice(0, ++i));
          typingRef.current = setTimeout(step, TYPE_SPEED);
        } else {
          resolve();
        }
      };
      step();
    });
  }, []);

  const eraseText = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      const step = () => {
        setDisplayText((prev) => {
          if (prev.length > 0) {
            erasingRef.current = setTimeout(step, ERASE_SPEED);
            return prev.slice(0, -1);
          }
          resolve();
          return "";
        });
      };
      step();
    });
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let cancelled = false;

    const loop = async () => {
      while (!cancelled) {
        await typeText(CAPTIONS[indexRef.current]);
        if (cancelled) break;
        await new Promise((r) => setTimeout(r, HOLD_AFTER));
        if (cancelled) break;
        await eraseText();
        if (cancelled) break;
        await new Promise((r) => setTimeout(r, HOLD_BLANK));
        if (cancelled) break;
        indexRef.current = (indexRef.current + 1) % CAPTIONS.length;
      }
    };

    loop();

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [isClient, typeText, eraseText, clearTimers]);

  if (!isClient) {
    return (
      <div className="hero-promo-mint__caption-wrap" aria-hidden="true">
        <span className="hero-promo-mint__caption">{CAPTIONS[0]}</span>
      </div>
    );
  }

  return (
    <div className="hero-promo-mint__caption-wrap">
      <span className="hero-promo-mint__caption">{displayText}</span>
      <span className="hero-promo-mint__caption-cursor" aria-hidden="true" />
    </div>
  );
}

export default HeroPromoCaption;
