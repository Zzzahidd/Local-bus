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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-[700px] pointer-events-auto">
      {/* Hidden YouTube Iframe Container */}
      <div id="youtube-hidden-player" className="hidden pointer-events-none" />

      {/* Floating Translucent Glass Player Card */}
      <div className="flex flex-col sm:flex-row items-center gap-4 px-5 py-3.5 rounded-3xl sm:rounded-full bg-black/50 backdrop-blur-xl border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300">
        
        {/* Left Section: Rotating Vinyl Album Art & Info */}
        <div className="flex items-center gap-3.5 w-full sm:w-auto min-w-0">
          <RotatingVinyl
            src={currentSong.thumbnail}
            alt={currentSong.title}
            isPlaying={isPlaying}
          />

          <div className="flex flex-col min-w-0 flex-1">
            <h3
              className="text-sm md:text-base font-semibold text-white truncate max-w-[220px] sm:max-w-[180px] md:max-w-[240px] drop-shadow"
              title={currentSong.title}
            >
              {currentSong.title}
            </h3>
            <p
              className="text-xs text-white/70 truncate max-w-[220px] sm:max-w-[180px] md:max-w-[240px]"
              title={currentSong.artist}
            >
              {currentSong.artist}
            </p>
          </div>
        </div>

        {/* Center Section: Progress Bar */}
        <div className="flex-1 w-full min-w-0 px-1 sm:px-3">
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={seek}
          />
        </div>

        {/* Right Section: Playback & Volume Controls */}
        <div className="flex items-center gap-3 self-center flex-shrink-0">
          {/* Previous Track */}
          <button
            onClick={prevTrack}
            disabled={!isReady}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all disabled:opacity-40"
            aria-label="Previous Song"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          {/* Play / Pause Main Button */}
          <button
            onClick={togglePlay}
            disabled={!isReady}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-black" />
            ) : (
              <Play className="w-5 h-5 fill-black translate-x-0.5" />
            )}
          </button>

          {/* Next Track */}
          <button
            onClick={nextTrack}
            disabled={!isReady}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all disabled:opacity-40"
            aria-label="Next Song"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>

          {/* Volume Control */}
          <div
            className="relative flex items-center"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {/* Popup Volume Slider */}
            {showVolumeSlider && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 shadow-xl flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
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
