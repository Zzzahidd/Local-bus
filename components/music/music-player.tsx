"use client";

import { useYouTubePlayer } from "@/hooks/use-youtube-player";
import { RotatingVinyl } from "./rotating-vinyl";
import { ProgressBar } from "./progress-bar";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export function MusicPlayer() {
  const {
    isReady,
    isPlaying,
    currentSong,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    toggleMute,
  } = useYouTubePlayer();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <div className="fixed bottom-4 md:bottom-12 left-1/2 -translate-x-1/2 z-40 w-[calc(100%_-_1.5rem)] sm:w-[92%] max-w-[600px] pointer-events-auto">
      {/* Hidden YouTube Iframe Container */}
      <div id="youtube-hidden-player" className="hidden pointer-events-none" />

      {/* Floating Translucent High-Contrast Glass Player Card (WCAG AAA Compliance) */}
      <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-full bg-neutral-950/90 backdrop-blur-2xl border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-300">
        
        {/* Left Section: Rotating Vinyl Album Art & Song Info */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-[1.15]">
          <RotatingVinyl
            src={currentSong.thumbnail}
            alt={currentSong.title}
            isPlaying={isPlaying}
          />

          <div className="flex flex-col min-w-0">
            <h3
              className="text-xs sm:text-sm md:text-base font-bold text-white truncate drop-shadow-sm"
              title={currentSong.title}
            >
              {currentSong.title}
            </h3>
            <p
              className="hidden sm:block text-xs font-medium text-neutral-200 truncate"
              title={currentSong.artist}
            >
              {currentSong.artist}
            </p>
          </div>
        </div>

        {/* Center Section: Progress Bar */}
        <div className="flex-1 min-w-0 px-1 sm:px-3">
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={seek}
          />
        </div>

        {/* Right Section: Playback & Volume Controls */}
        <div className="flex items-center gap-0.5 sm:gap-3 flex-shrink-0">
          {/* Previous Track */}
          <button
            onClick={prevTrack}
            disabled={!isReady}
            className="p-1.5 sm:p-2 rounded-full text-white hover:bg-white/20 active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none transition-all disabled:opacity-40"
            aria-label="Previous Song"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          {/* Play / Pause Main Button */}
          <button
            onClick={togglePlay}
            disabled={!isReady}
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-xl hover:bg-neutral-100 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none transition-all disabled:opacity-50"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-neutral-950" />
            ) : (
              <Play className="w-5 h-5 fill-neutral-950 translate-x-0.5" />
            )}
          </button>

          {/* Next Track */}
          <button
            onClick={nextTrack}
            disabled={!isReady}
            className="p-1.5 sm:p-2 rounded-full text-white hover:bg-white/20 active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none transition-all disabled:opacity-40"
            aria-label="Next Song"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>

          {/* Volume Control */}
          <div
            className="relative hidden sm:flex items-center"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <button
              onClick={toggleMute}
              className="p-2 rounded-full text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none transition-all"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {/* Popup Volume Slider */}
            {showVolumeSlider && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2.5 rounded-xl bg-neutral-950/95 backdrop-blur-md border border-white/25 shadow-2xl flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-20 h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-white"
                  aria-label="Volume slider"
                />
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
