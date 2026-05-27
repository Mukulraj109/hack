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

/** Used after Auth0 redirect (returnTo from appState). */
export function replaceAppPath(path) {
  if (window.location.pathname === path) {
    notifyAppPathChange();
    return;
  }
  window.history.replaceState({}, "", path);
  notifyAppPathChange();
}
