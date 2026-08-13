"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Song, YouTubePlayerInstance } from "@/types/youtube";

const PLAYLIST_ID = "PLgNK35oqdq98pPJSS_aaa_BVKFK7cc2Tq";

export function useYouTubePlayer() {
  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(80);
  const [isMuted, setIsMutedState] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song>({
    id: "default",
    videoId: "",
    title: "লোকাল বাস — পথের গান",
    artist: "Nostalgic Tracks",
    thumbnail: "/images/logo.png",
    duration: 0,
  });

  // Track playback time
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && playerRef.current) {
      timer = setInterval(() => {
        if (playerRef.current) {
          const cur = playerRef.current.getCurrentTime() || 0;
          const dur = playerRef.current.getDuration() || 0;
          setCurrentTime(cur);
          if (dur > 0 && dur !== duration) {
            setDuration(dur);
          }
        }
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlaying, duration]);

  // Sync current video metadata from player
  const syncVideoData = useCallback(() => {
    if (!playerRef.current) return;
    try {
      const data = playerRef.current.getVideoData();
      const dur = playerRef.current.getDuration() || 0;
      if (data && data.video_id) {
        setCurrentSong({
          id: data.video_id,
          videoId: data.video_id,
          title: data.title || " classic song ",
          artist: data.author || " South Asian Music ",
          thumbnail: `https://img.youtube.com/vi/${data.video_id}/hqdefault.jpg`,
          duration: dur,
        });
        setDuration(dur);
      }
    } catch (e) {
      console.error("Error syncing video data:", e);
    }
  }, []);

  // Initialize YouTube Iframe API
  useEffect(() => {
    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player("youtube-hidden-player", {
          height: "0",
          width: "0",
          playerVars: {
            listType: "playlist",
            list: PLAYLIST_ID,
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event) => {
              setIsReady(true);
              const player = event.target;
              player.setVolume(80);
              syncVideoData();
            },
            onStateChange: (event) => {
              const state = event.data;
              if (window.YT) {
                if (state === window.YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                  syncVideoData();
                } else if (state === window.YT.PlayerState.PAUSED) {
                  setIsPlaying(false);
                } else if (state === window.YT.PlayerState.ENDED) {
                  setIsPlaying(false);
                  // Next song automatically
                  if (playerRef.current) {
                    playerRef.current.nextVideo();
                  }
                } else if (state === window.YT.PlayerState.CUED || state === window.YT.PlayerState.BUFFERING) {
                  syncVideoData();
                }
              }
            },
            onError: (err) => {
              console.warn("YouTube Player error code:", err.data);
            },
          },
        });
      }
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }
  }, [syncVideoData]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current || !isReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [isPlaying, isReady]);

  const nextTrack = useCallback(() => {
    if (!playerRef.current) return;
    playerRef.current.nextVideo();
  }, []);

  const prevTrack = useCallback(() => {
    if (!playerRef.current) return;
    const cur = playerRef.current.getCurrentTime();
    if (cur > 3) {
      playerRef.current.seekTo(0, true);
      setCurrentTime(0);
    } else {
      playerRef.current.previousVideo();
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(time, true);
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((val: number) => {
    if (!playerRef.current) return;
    playerRef.current.setVolume(val);
    setVolumeState(val);
    if (val === 0) {
      setIsMutedState(true);
    } else if (isMuted) {
      playerRef.current.unMute();
      setIsMutedState(false);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMutedState(false);
    } else {
      playerRef.current.mute();
      setIsMutedState(true);
    }
  }, [isMuted]);

  return {
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
  };
}
