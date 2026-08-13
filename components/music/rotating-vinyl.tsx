"use client";

import Image from "next/image";

interface RotatingVinylProps {
  src: string;
  alt: string;
  isPlaying: boolean;
}

export function RotatingVinyl({ src, alt, isPlaying }: RotatingVinylProps) {
  return (
    <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
      {/* Vinyl Outer Ring */}
      <div
        className={`relative w-full h-full rounded-full p-1 bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-900 border border-white/20 shadow-2xl overflow-hidden transition-all duration-300 ${
          isPlaying ? "animate-spin-slow" : ""
        }`}
        style={{
          animationPlayState: isPlaying ? "running" : "paused",
        }}
      >
        {/* Vinyl Grooves Texture */}
        <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute inset-2 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />

        {/* Thumbnail Image Center */}
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            src={src || "/images/logo.png"}
            alt={alt || "Album Artwork"}
            fill
            sizes="64px"
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Center Hole Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-neutral-900 border border-white/30 shadow-inner" />
      </div>
    </div>
  );
}
