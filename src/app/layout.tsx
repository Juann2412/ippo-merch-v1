import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthSync } from "@/features/auth/components/auth-sync";
import { AppProviders } from "@/presentation/components/providers/app-providers";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "IPPO Merch — Blind Box Figurines Anime",
    template: "%s | IPPO Merch",
  },
  description:
    "Blind Box figurines Manga & Anime premium. Naruto, One Piece, JJK, Demon Slayer et plus — collectionnez la surprise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans`}
      >
        <AppProviders>
          <AuthSync />
          <SiteHeader />
          <main>{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
