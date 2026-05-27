import { useCallback, useEffect, useState } from "react";
import {
  APP_PATH_CHANGE,
  getAppPath,
  navigateTo,
} from "../lib/appNavigation";

/**
 * Syncs React route state with window.location.
 * popstate alone misses Auth0's history.replaceState after login.
 */
export function useAppPath() {
  const [path, setPath] = useState(getAppPath);

  useEffect(() => {
    const sync = () => setPath(getAppPath());
    window.addEventListener("popstate", sync);
    window.addEventListener(APP_PATH_CHANGE, sync);
    sync();
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(APP_PATH_CHANGE, sync);
    };
  }, []);

  const handleNavigate = useCallback((nextPath) => {
    navigateTo(nextPath);
  }, []);

  return { path, handleNavigate };
}
