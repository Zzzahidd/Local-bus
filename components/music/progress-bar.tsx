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
        className="relative w-full h-2 rounded-full bg-white/20 hover:bg-white/30 cursor-pointer transition-all duration-200 group flex items-center"
        role="slider"
        aria-label="Seek progress"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={currentTime}
      >
        {/* Filled Track */}
        <div
          className="h-full rounded-full bg-white transition-all duration-100 ease-linear shadow-sm"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Handle Pill/Dot */}
        <div
          className="absolute w-3 h-3 rounded-full bg-white shadow-md transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          style={{ left: `${progressPercent}%` }}
        />
      </div>

      {/* Time Readout */}
      <div className="flex justify-between items-center text-[11px] font-mono text-white/70 tracking-wider">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
