"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "@/components/ui/Icons";

export function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); the card link still works.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
      title={`Copy ${label}`}
      className={cn(
        "grid size-12 place-items-center rounded-full text-lg text-mute transition hover:bg-ink-3 hover:text-bone",
        className,
      )}
    >
      {copied ? <CheckIcon className="text-emerald-500" /> : <CopyIcon />}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
