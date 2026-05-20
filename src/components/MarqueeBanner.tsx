import { useEffect, useRef, useState } from "react";

type Item = { label: string; outlined?: boolean };

const DEFAULT_ITEMS: Item[] = [
  { label: "FirstStep" },
  { label: "Build", outlined: true },
  { label: "Create" },
  { label: "Connect", outlined: true },
  { label: "Hack", outlined: false },
  { label: "100 hrs", outlined: true },
];

const SEPARATOR = "✦";

export function MarqueeBanner({
  items = DEFAULT_ITEMS,
  speedSeconds = 28,
}: {
  items?: Item[];
  speedSeconds?: number;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const renderRow = (key: string, direction: "left" | "right") => (
    <div
      className="marquee-banner__row"
      data-direction={direction}
      key={key}
      style={{
        animationDuration: `${speedSeconds}s`,
        animationPlayState: reduced ? "paused" : "running",
      }}
    >
      {[0, 1].map((copy) => (
        <ul className="marquee-banner__track" aria-hidden={copy === 1} key={copy}>
          {items.map((item, index) => (
            <li
              className={`marquee-banner__item${item.outlined ? " marquee-banner__item--outlined" : ""}`}
              key={`${item.label}-${index}-${copy}`}
            >
              <span className="marquee-banner__text">{item.label}</span>
              <span className="marquee-banner__sep" aria-hidden>
                {SEPARATOR}
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );

  return (
    <section
      ref={rootRef}
      className="marquee-banner"
      aria-label="FirstStep hackathon highlights"
    >
      <div className="marquee-banner__fade marquee-banner__fade--left" aria-hidden />
      <div className="marquee-banner__fade marquee-banner__fade--right" aria-hidden />
      {renderRow("primary", "left")}
      {renderRow("secondary", "right")}
    </section>
  );
}

export default MarqueeBanner;
