import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "লোকাল বাস",
  description: "একটা বাস, একটা পথ, আর কিছু পুরোনো গান।",
  keywords: ["Local Bus", "লোকাল বাস", "Nostalgia", "South Asia", "Music", "Lo-Fi", "Journey"],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "লোকাল বাস",
    description: "একটা বাস, একটা পথ, আর কিছু পুরোনো গান।",
    url: "https://localbus.app",
    siteName: "লোকাল বাস",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "লোকাল বাস",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "লোকাল বাস",
    description: "একটা বাস, একটা পথ, আর কিছু পুরোনো গান।",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="antialiased bg-black text-white selection:bg-white/20">
        {children}
      </body>
    </html>
  );
}
