import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Configure fonts for the application
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Application metadata for SEO and browser display
export const metadata: Metadata = {
  title: "Carbie - AI-Powered Nutrition Assistant",
  description: "Transform your nutrition journey with instant carb analysis. Simply point your camera or describe your meal for accurate, real-time insights.",
  keywords: "nutrition, carb counting, diabetes, AI, food analysis, health app",
  authors: [{ name: "Carbie Team" }],
  viewport: "width=device-width, initial-scale=1",
};

/**
 * Root layout component that wraps all pages
 * Provides consistent styling and font configuration
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
