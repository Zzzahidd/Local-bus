"use client";

import { useRef, MouseEvent, TouchEvent } from "react";
import { formatTime } from "@/lib/utils";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  const handleSeek = (clientX: number) => {
    if (!barRef.current || duration <= 0) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = clickX / rect.width;
    onSeek(percentage * duration);
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    handleSeek(e.clientX);
  };

  const handleTouch = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleSeek(e.touches[0].clientX);
    }
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="w-full flex flex-col gap-1.5 select-none">
      {/* Clickable Seek Track */}
      <div
        ref={barRef}
        onClick={handleClick}
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
        className="relative w-full h-2.5 rounded-full bg-neutral-700/80 hover:bg-neutral-600 cursor-pointer transition-all duration-200 group flex items-center focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        tabIndex={0}
        role="slider"
        aria-label="Seek progress"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(currentTime)}
        aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
      >
        {/* Filled Track */}
        <div
          className="h-full rounded-full bg-white transition-all duration-100 ease-linear shadow-sm"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Handle Pill/Dot */}
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-white shadow-md transform -translate-x-1/2 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-150"
          style={{ left: `${progressPercent}%` }}
        />
      </div>

      {/* Time Readout (WCAG AAA Contrast > 12:1) */}
      <div className="flex justify-between items-center text-xs font-mono text-neutral-100 tracking-wider font-medium">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
