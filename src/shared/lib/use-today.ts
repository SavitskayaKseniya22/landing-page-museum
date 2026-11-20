import { useSyncExternalStore } from "react";
import { getLocalDate } from "@/shared/lib/date";

function subscribe(onChange: () => void) {
  const interval = window.setInterval(onChange, 60_000);
  window.addEventListener("focus", onChange);
  return () => {
    window.clearInterval(interval);
    window.removeEventListener("focus", onChange);
  };
}

export function useToday() {
  return useSyncExternalStore(subscribe, getLocalDate, () => "");
}
