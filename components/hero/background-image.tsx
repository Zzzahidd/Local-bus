"use client";

import Image from "next/image";

export function BackgroundImage() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0 select-none pointer-events-none bg-black">
      {/* 1. Mobile Atmospheric Ambient Layer (Prevents harsh cropping & blur on portrait screens) */}
      <div className="absolute inset-0 block md:hidden opacity-60 scale-110">
        <Image
          src="/images/background-image.png"
          alt=""
          fill
          unoptimized
          priority
          className="object-cover object-center filter blur-xl"
        />
      </div>

      {/* 2. Main High-Resolution Hero Bus Background */}
      <div className="relative w-full h-full">
        <Image
          src="/images/background-image.png"
          alt="Sitting in the back seat of a local bus looking at sunset"
          fill
          unoptimized
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center md:object-center transform-gpu scale-[1.005]"
          style={{
            imageRendering: "-webkit-optimize-contrast",
          }}
        />
      </div>

      {/* 3. Lightweight, uniform film grain with no tonal gradient */}
      <div
        className="absolute inset-0 z-20 opacity-[0.045] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.65'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      {/* 4. WCAG AAA Contrast Enhancing Backdrop Overlays */}
      {/* Top Header Gradient */}
      <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-black/85 via-black/45 to-transparent pointer-events-none z-10" />

      {/* Bottom Player Gradient */}
      <div className="absolute bottom-0 inset-x-0 h-52 bg-gradient-to-t from-black/90 via-black/55 to-transparent pointer-events-none z-10" />
    </div>
  );
}
