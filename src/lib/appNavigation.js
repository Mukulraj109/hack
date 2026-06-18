/** Fired when pathname changes via pushState/replaceState (popstate does not run for those). */
export const APP_PATH_CHANGE = "hackathon:pathchange";

export function getAppPath() {
  return typeof window !== "undefined" ? window.location.pathname : "/";
}

export function notifyAppPathChange() {
  window.dispatchEvent(new Event(APP_PATH_CHANGE));
}

/** Client-side navigation; keeps React path state in sync with the address bar. */
export function navigateTo(path) {
  if (window.location.pathname === path) {
    notifyAppPathChange();
    return;
  }
  window.history.pushState({}, "", path);
  notifyAppPathChange();
}

/** Used after Auth0 redirect (returnTo from appState). Accepts path with query string. */
export function replaceAppPath(path) {
  const target = path.startsWith("/") ? path : `/${path}`;
  const current = `${window.location.pathname}${window.location.search}`;
  if (current === target) {
    notifyAppPathChange();
    return;
  }
  window.history.replaceState({}, "", target);
  notifyAppPathChange();
}
