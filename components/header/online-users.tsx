"use client";

import { usePresence } from "@/hooks/use-presence";

export function OnlineUsers() {
  const count = usePresence();

  return (
    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/20 text-xs md:text-sm font-semibold text-white select-none shadow-lg focus-visible:ring-2 focus-visible:ring-white">
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </span>
      <span>{count !== null ? `${count} online` : "— online"}</span>
    </div>
  );
}
