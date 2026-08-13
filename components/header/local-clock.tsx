"use client";

import { useLocalTime } from "@/hooks/use-local-time";

export function LocalClock() {
  const time = useLocalTime();

  return (
    <div className="text-sm font-medium tracking-wider text-white/90 font-mono select-none drop-shadow">
      {time || "12:00 pm"}
    </div>
  );
}
