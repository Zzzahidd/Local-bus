export interface Song {
  id: string;
  videoId: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
}

export type PlayerState = "UNSTARTED" | "ENDED" | "PLAYING" | "PAUSED" | "BUFFERING" | "CUED";

export interface YouTubePlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  nextVideo: () => void;
  previousVideo: () => void;
  playVideoAt: (index: number) => void;
  loadVideoById: (videoId: string) => void;
  getVolume: () => number;
  setVolume: (volume: number) => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  getPlaylist: () => string[];
  getPlaylistIndex: () => number;
  getVideoData: () => {
    video_id: string;
    author: string;
    title: string;
  };
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          height?: string | number;
          width?: string | number;
          videoId?: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YouTubePlayerInstance }) => void;
            onStateChange?: (event: { data: number; target: YouTubePlayerInstance }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YouTubePlayerInstance;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
  }
}
