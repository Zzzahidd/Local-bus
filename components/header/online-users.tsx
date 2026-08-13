"use client";

import { usePresence } from "@/hooks/use-presence";

export function OnlineUsers() {
  const count = usePresence();

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs font-medium text-white/90 select-none shadow-lg">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span>{count !== null ? `${count} online` : "— online"}</span>
    </div>
  );
}
