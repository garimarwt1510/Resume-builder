// filename: frontend/src/hooks/useAutoSave.js
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "./useDebounce";

/**
 * Debounces changes to `data` and calls `saveFn(data)` automatically.
 * Skips the very first render so a freshly-loaded resume isn't immediately
 * re-saved. Returns a status string for UI feedback: "idle" | "saving" | "saved" | "error".
 */
export const useAutoSave = (data, saveFn, delay = 1200) => {
  const [status, setStatus] = useState("idle");
  const debouncedData = useDebounce(data, delay);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (!debouncedData) return;

    let cancelled = false;
    const save = async () => {
      setStatus("saving");
      try {
        await saveFn(debouncedData);
        if (!cancelled) setStatus("saved");
      } catch {
        if (!cancelled) setStatus("error");
      }
    };
    save();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedData]);

  return status;
};
