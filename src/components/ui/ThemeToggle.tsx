"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "./Icons";

type Theme = "light" | "dark";

// The inline script in layout.tsx sets <html data-theme> before paint; this reads it as an external store.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => null);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      title={theme === "light" ? "Dark mode" : "Light mode"}
      className={cn(
        "grid size-11 place-items-center rounded-full border border-line text-lg transition hover:border-bone/40 hover:text-ember",
        className,
      )}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
