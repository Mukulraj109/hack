import { ReelsShowcase, REEL_PLACEHOLDERS } from "../ReelsShowcase";

/** Sprint dashboard reels — placeholders until final videos are provided. */
export default function SprintReelsSection({ reels = REEL_PLACEHOLDERS }) {
  return (
    <div className="sprint-reels-section">
      <ReelsShowcase reels={reels} variant="sprint" />
    </div>
  );
}
