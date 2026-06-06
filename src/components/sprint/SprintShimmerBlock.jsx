export default function SprintShimmerBlock({
  className = "",
  style = {},
  "aria-hidden": ariaHidden = true,
}) {
  return (
    <div
      className={`sprint-shimmer-block ${className}`.trim()}
      style={style}
      aria-hidden={ariaHidden}
    />
  );
}

export function SprintSectionSkeleton({ className = "", children, label = "Loading section" }) {
  return (
    <div className={`sprint-section-skeleton ${className}`.trim()} aria-busy="true" aria-label={label}>
      {children}
    </div>
  );
}
