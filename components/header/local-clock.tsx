"use client";

import { useLocalTime } from "@/hooks/use-local-time";

export function LocalClock() {
  const time = useLocalTime();

  return (
    <div className="flex items-center px-3.5 py-1.5 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/20 text-xs md:text-sm font-semibold tracking-wider text-white font-mono select-none shadow-lg focus-visible:ring-2 focus-visible:ring-white">
      <span aria-label={`Visitor local time ${time || "12:00 pm"}`}>
        {time || "12:00 pm"}
      </span>
    </div>
  );
}
