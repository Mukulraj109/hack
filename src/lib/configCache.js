import { apiFetch } from "./api";

const TTL_MS = 60_000;

function createCachedFetcher(path) {
  let cache = { data: undefined, expiresAt: 0 };
  let inflight = null;

  return async function fetchCached() {
    const now = Date.now();
    if (cache.expiresAt > now) {
      return { data: cache.data ?? null };
    }

    if (inflight) {
      return inflight;
    }

    inflight = apiFetch(path)
      .then((res) => {
        cache = { data: res.data ?? null, expiresAt: Date.now() + TTL_MS };
        return res;
      })
      .finally(() => {
        inflight = null;
      });

    return inflight;
  };
}

export const fetchCountdownConfig = createCachedFetcher("/api/config/countdown");
export const fetchTracksConfig = createCachedFetcher("/api/config/tracks");
export const fetchSocialConfig = createCachedFetcher("/api/config/social");
