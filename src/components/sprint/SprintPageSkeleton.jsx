import SprintShimmerBlock from "./SprintShimmerBlock";

function SkeletonRoot({ className, label, children }) {
  return (
    <div className={className} aria-busy="true" aria-label={label}>
      {children}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <SkeletonRoot className="sprint-dashboard-skeleton" label="Loading dashboard">
      <SprintShimmerBlock className="sprint-dashboard-skeleton__hero" />
      <SprintShimmerBlock className="sprint-dashboard-skeleton__grid" />
    </SkeletonRoot>
  );
}

export function SubmissionSkeleton() {
  return (
    <SkeletonRoot className="sprint-submission-skeleton" label="Loading submission">
      <SprintShimmerBlock className="sprint-submission-skeleton__header" />
      <div className="sprint-submission-skeleton__layout">
        <div className="sprint-submission-skeleton__main">
          <SprintShimmerBlock className="sprint-submission-skeleton__card" />
          <SprintShimmerBlock className="sprint-submission-skeleton__card sprint-submission-skeleton__card--short" />
          <SprintShimmerBlock className="sprint-submission-skeleton__card" />
        </div>
        <SprintShimmerBlock className="sprint-submission-skeleton__sidebar" />
      </div>
    </SkeletonRoot>
  );
}

export function RoadmapSkeleton() {
  return (
    <SkeletonRoot className="sprint-roadmap-skeleton" label="Loading roadmap">
      <SprintShimmerBlock className="sprint-roadmap-skeleton__header" />
      <div className="sprint-roadmap-skeleton__points">
        <SprintShimmerBlock className="sprint-roadmap-skeleton__points-card" />
        <SprintShimmerBlock className="sprint-roadmap-skeleton__points-card" />
        <SprintShimmerBlock className="sprint-roadmap-skeleton__points-card" />
        <SprintShimmerBlock className="sprint-roadmap-skeleton__points-card" />
      </div>
      <div className="sprint-roadmap-skeleton__timeline">
        <SprintShimmerBlock className="sprint-roadmap-skeleton__milestone sprint-roadmap-skeleton__milestone--left" />
        <SprintShimmerBlock className="sprint-roadmap-skeleton__milestone sprint-roadmap-skeleton__milestone--right" />
        <SprintShimmerBlock className="sprint-roadmap-skeleton__milestone sprint-roadmap-skeleton__milestone--left" />
        <SprintShimmerBlock className="sprint-roadmap-skeleton__milestone sprint-roadmap-skeleton__milestone--right" />
      </div>
    </SkeletonRoot>
  );
}

export function TeamSkeleton() {
  return (
    <SkeletonRoot className="sprint-team-skeleton" label="Loading team content">
      <SprintShimmerBlock className="sprint-team-skeleton__header" />
      <div className="sprint-team-skeleton__grid">
        <SprintShimmerBlock className="sprint-team-skeleton__members" />
        <SprintShimmerBlock className="sprint-team-skeleton__video" />
      </div>
      <div className="sprint-team-skeleton__posters">
        <SprintShimmerBlock className="sprint-team-skeleton__poster" />
        <SprintShimmerBlock className="sprint-team-skeleton__poster" />
      </div>
    </SkeletonRoot>
  );
}

export function AdminTableSkeleton({ rows = 6 }) {
  return (
    <SkeletonRoot className="sprint-admin-skeleton" label="Loading admin data">
      <SprintShimmerBlock className="sprint-admin-skeleton__toolbar" />
      <div className="sprint-admin-skeleton__rows">
        {Array.from({ length: rows }, (_, i) => (
          <SprintShimmerBlock key={i} className="sprint-admin-skeleton__row" />
        ))}
      </div>
    </SkeletonRoot>
  );
}

export function SocialProofSectionSkeleton() {
  return (
    <SkeletonRoot className="sprint-section-skeleton sprint-social-proof-skeleton" label="Loading social proof">
      <SprintShimmerBlock className="sprint-social-proof-skeleton__title" />
      <div className="sprint-social-proof-skeleton__cards">
        <SprintShimmerBlock className="sprint-social-proof-skeleton__card" />
        <SprintShimmerBlock className="sprint-social-proof-skeleton__card" />
      </div>
    </SkeletonRoot>
  );
}
