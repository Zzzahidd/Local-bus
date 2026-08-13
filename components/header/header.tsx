"use client";

import { LocalClock } from "./local-clock";
import { OnlineUsers } from "./online-users";
import { ExternalLink } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-2 px-3 py-3 sm:px-6 sm:py-5 md:px-10 pointer-events-auto">
      {/* Left: Visitor Local Time */}
      <div className="flex items-center">
        <LocalClock />
      </div>

      {/* Center: Online Counter */}
      <div className="flex items-center justify-center">
        <OnlineUsers />
      </div>

      {/* Right: YT Music Link */}
      <div className="flex items-center">
        <a
          href="https://music.youtube.com/playlist?list=PLgNK35oqdq98pPJSS_aaa_BVKFK7cc2Tq&si=XTbp03lHSFlMOS3M"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 sm:gap-1.5 sm:px-3.5 py-1.5 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/20 text-xs md:text-sm font-semibold text-white hover:bg-black focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none transition-all shadow-lg group"
          aria-label="Listen on YT Music (opens in new tab)"
        >
          <svg className="w-4 h-4 fill-red-500 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.2c-3.972 0-7.2-3.228-7.2-7.2s3.228-7.2 7.2-7.2 7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2zm0-11.4c-2.316 0-4.2 1.884-4.2 4.2s1.884 4.2 4.2 4.2 4.2-1.884 4.2-4.2-1.884-4.2-4.2-4.2zm-1.2 6.12v-3.84l3.36 1.92-3.36 1.92z"/>
          </svg>
          <span className="hidden sm:inline">YT Music</span>
          <ExternalLink className="hidden sm:block w-3.5 h-3.5 text-neutral-300 group-hover:text-white transition-colors" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
