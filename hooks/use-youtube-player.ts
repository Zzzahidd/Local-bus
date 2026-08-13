"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Song, YouTubePlayerInstance } from "@/types/youtube";

const PLAYLIST_ID = "PLgNK35oqdq98pPJSS_aaa_BVKFK7cc2Tq";

export function useYouTubePlayer() {
  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const isTransitioningRef = useRef(false);
  const lastVideoIdRef = useRef<string>("");
  const skippedTrackCountRef = useRef(0);
  const skipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    thumbnail: "/images/local-bus-logo-final.png",
    duration: 0,
  });

  // Sync current video metadata from player safely
  const syncVideoData = useCallback(() => {
    if (!playerRef.current) return;
    try {
      const data = playerRef.current.getVideoData();
      const dur = playerRef.current.getDuration() || 0;
      if (data && data.video_id) {
        if (data.video_id !== lastVideoIdRef.current) {
          lastVideoIdRef.current = data.video_id;
          setCurrentTime(0);
        }
        setCurrentSong({
          id: data.video_id,
          videoId: data.video_id,
          title: data.title || " classic song ",
          artist: data.author || " South Asian Music ",
          thumbnail: `https://img.youtube.com/vi/${data.video_id}/hqdefault.jpg`,
          duration: dur,
        });
        if (dur > 0) {
          setDuration(dur);
        }
      }
    } catch (e) {
      console.error("Error syncing video data:", e);
    }
  }, []);

  const skipUnavailableTrack = useCallback(() => {
    if (!playerRef.current || skipTimerRef.current) return;

    const playlistLength = playerRef.current.getPlaylist()?.length || 1;
    if (skippedTrackCountRef.current >= playlistLength) {
      setIsPlaying(false);
      return;
    }

    isTransitioningRef.current = true;
    skippedTrackCountRef.current += 1;
    skipTimerRef.current = setTimeout(() => {
      skipTimerRef.current = null;
      playerRef.current?.nextVideo();
    }, 600);
  }, []);

  // Track playback time without thrashing during track transitions
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && playerRef.current) {
      timer = setInterval(() => {
        if (playerRef.current && !isTransitioningRef.current) {
          try {
            const cur = playerRef.current.getCurrentTime() || 0;
            const dur = playerRef.current.getDuration() || 0;
            setCurrentTime(cur);
            if (dur > 0 && Math.abs(dur - duration) > 1) {
              setDuration(dur);
            }
          } catch (err) {
            // Ignore temporary API polling error during state change
          }
        }
      }, 250);
    }
    return () => clearInterval(timer);
  }, [isPlaying, duration]);

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
              if (!window.YT) return;

              if (state === window.YT.PlayerState.PLAYING) {
                isTransitioningRef.current = false;
                skippedTrackCountRef.current = 0;
                setIsPlaying(true);
                syncVideoData();
              } else if (state === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (state === window.YT.PlayerState.ENDED) {
                setIsPlaying(false);
                setCurrentTime(0);
              } else if (
                state === window.YT.PlayerState.CUED ||
                state === window.YT.PlayerState.BUFFERING ||
                state === window.YT.PlayerState.UNSTARTED
              ) {
                syncVideoData();
              }
            },
            onError: (err) => {
              console.warn("YouTube Player error code:", err.data);
              // Some playlist videos cannot be embedded; skip each one once.
              skipUnavailableTrack();
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
    return () => {
      if (skipTimerRef.current) clearTimeout(skipTimerRef.current);
    };
  }, [skipUnavailableTrack, syncVideoData]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current || !isReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [isPlaying, isReady]);

  const nextTrack = useCallback(() => {
    if (!playerRef.current || !isReady) return;
    isTransitioningRef.current = true;
    skippedTrackCountRef.current = 0;
    setCurrentTime(0);
    playerRef.current.nextVideo();
    
    // Ensure smooth continuous playback without needing a double click
    setTimeout(() => {
      if (playerRef.current && isPlaying) {
        playerRef.current.playVideo();
      }
    }, 150);
  }, [isReady, isPlaying]);

  const prevTrack = useCallback(() => {
    if (!playerRef.current || !isReady) return;
    const cur = currentTime;
    if (cur > 3) {
      playerRef.current.seekTo(0, true);
      setCurrentTime(0);
    } else {
      isTransitioningRef.current = true;
      skippedTrackCountRef.current = 0;
      setCurrentTime(0);
      playerRef.current.previousVideo();
      setTimeout(() => {
        if (playerRef.current && isPlaying) {
          playerRef.current.playVideo();
        }
      }, 150);
    }
  }, [isReady, currentTime, isPlaying]);

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
