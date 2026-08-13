"use client";

import Image from "next/image";

export function BackgroundImage() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0 select-none pointer-events-none">
      <Image
        src="/images/hero-bg.jpg"
        alt="Sitting in the back seat of a local bus looking at sunset"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* WCAG Contrast Enhancing Backdrop Overlay */}
      {/* Top Header Gradient for 4.5:1+ contrast on Header controls */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

      {/* Center Soft Radial Vignette for Logo contrast against bright crimson sky */}
      <div className="absolute inset-0 bg-radial from-black/40 via-transparent to-black/60 pointer-events-none" />

      {/* Bottom Player Gradient for 4.5:1+ contrast on Music Player */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black/85 via-black/50 to-transparent pointer-events-none" />
    </div>
  );
}
