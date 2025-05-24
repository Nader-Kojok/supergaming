import type { Metadata } from "next";
import { Inter, Orbitron, Exo_2, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"; // Assuming shadcn/ui setup will create this
import MainLayout from "@/components/layout/MainLayout";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fontOrbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"], // As per roadmap: Orbitron bold for titles
  variable: "--font-orbitron",
});

const fontExo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
});

const fontJetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Supergaming - L'avenir du gaming, aujourd'hui",
  description: "Boutique e-commerce gaming ultra-moderne avec une esthétique cyberpunk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-deepBlack font-inter text-gray-200 antialiased", // Base cyberpunk theme
          fontInter.variable,
          fontOrbitron.variable,
          fontExo2.variable,
          fontJetBrainsMono.variable
        )}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
