"use client";

import { useRef, useState, MouseEvent, PointerEvent } from "react";
import { formatTime } from "@/lib/utils";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const [dragTime, setDragTime] = useState<number | null>(null);

  const getTimeAtPosition = (clientX: number) => {
    if (!barRef.current || duration <= 0) return null;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = clickX / rect.width;
    return percentage * duration;
  };

  const handleSeek = (clientX: number) => {
    const time = getTimeAtPosition(clientX);
    if (time !== null) onSeek(time);
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    handleSeek(e.clientX);
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragTime(getTimeAtPosition(e.clientX));
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      setDragTime(getTimeAtPosition(e.clientX));
    }
  };

  const handlePointerEnd = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const time = getTimeAtPosition(e.clientX);
    isDraggingRef.current = false;
    setDragTime(null);
    if (time !== null) onSeek(time);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handlePointerCancel = (e: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    setDragTime(null);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const displayedTime = dragTime ?? currentTime;
  const progressPercent = duration > 0 ? Math.min(100, (displayedTime / duration) * 100) : 0;

  return (
    <div className="w-full flex flex-col gap-1.5 select-none">
      {/* Clickable Seek Track */}
      <div
        ref={barRef}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerCancel}
        className="relative w-full h-2.5 rounded-full bg-neutral-700/80 hover:bg-neutral-600 cursor-pointer touch-none transition-all duration-200 group flex items-center focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        tabIndex={0}
        role="slider"
        aria-label="Seek progress"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(displayedTime)}
        aria-valuetext={`${formatTime(displayedTime)} of ${formatTime(duration)}`}
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
      <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-neutral-100 tracking-wide sm:tracking-wider font-medium">
        <span>{formatTime(displayedTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
