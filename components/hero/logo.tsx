"use client";

import Image from "next/image";

export function CenterLogo() {
  return (
    <div className="relative z-10 flex items-center justify-center pointer-events-none select-none px-4 max-w-4xl w-full mx-auto my-auto">
      <div className="relative w-full max-w-[540px] md:max-w-[680px] lg:max-w-[760px] aspect-[3/1] transition-transform duration-500 hover:scale-[1.01]">
        <Image
          src="/images/logo.png"
          alt="লোকাল বাস"
          fill
          priority
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 760px"
          className="object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
        />
      </div>
    </div>
  );
}
