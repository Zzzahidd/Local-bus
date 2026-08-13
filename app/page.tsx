import { BackgroundImage } from "@/components/hero/background-image";
import { Header } from "@/components/header/header";
import { CenterLogo } from "@/components/hero/logo";
import { MusicPlayer } from "@/components/music/music-player";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden flex flex-col justify-between select-none">
      {/* Background Image: View from the last seat of a local bus looking at sunset */}
      <BackgroundImage />

      {/* Header: Visitor Local Time (Left), Active Presence (Center), YT Music Link (Right) */}
      <Header />

      {/* Prominent Centered Brand Logo */}
      <CenterLogo />

      {/* Custom Translucent High-Contrast YouTube Music Player */}
      <MusicPlayer />
    </main>
  );
}
