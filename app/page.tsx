import { BackgroundVideo } from "@/components/hero/background-video";
import { Header } from "@/components/header/header";
import { CenterLogo } from "@/components/hero/logo";
import { MusicPlayer } from "@/components/music/music-player";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden flex flex-col justify-between select-none">
      {/* Cinematic Looping Bus Background Video */}
      <BackgroundVideo />

      {/* Header: Visitor Local Time (Left), Active Presence (Center), YT Music Link (Right) */}
      <Header />

      {/* Prominent Centered Brand Logo */}
      <CenterLogo />

      {/* Custom Translucent YouTube Music Player */}
      <MusicPlayer />
    </main>
  );
}
