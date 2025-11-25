import { useEffect } from "react";

export function useScrollLock() {
  useEffect(() => {
    document.body.classList.add("lock-scroll");
    return () => document.body.classList.remove("lock-scroll");
  }, []);
}