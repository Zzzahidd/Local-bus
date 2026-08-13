"use client";

import Image from "next/image";

export function CenterLogo() {
  return (
    <div className="fixed inset-x-0 top-[15%] md:top-[14%] z-10 flex justify-center pointer-events-none select-none px-4">
      <div className="relative w-[90vw] max-w-[480px] md:w-full md:max-w-[1080px] lg:max-w-[1150px] aspect-[3/2] md:aspect-[3/1] scale-[1.15] md:scale-[1.25] transition-transform duration-500 hover:scale-[1.28]">
        <Image
          src="/images/local-bus-logo-final.png"
          alt="লোকাল বাস"
          fill
          unoptimized
          priority
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 100vw, 1150px"
          className="object-contain opacity-90 brightness-[0.97] filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.38)]"
          style={{ imageRendering: "auto" }}
        />
      </div>
    </div>
  );
}
