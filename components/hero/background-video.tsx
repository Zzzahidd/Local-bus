"use client";

import { useEffect, useRef } from "react";

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay was prevented by browser:", err);
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0 select-none pointer-events-none">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Subtle Cinematic Overlay to improve text legibility while retaining atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
      <div className="absolute inset-0 bg-black/15 mix-blend-multiply" />
    </div>
  );
}
