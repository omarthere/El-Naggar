import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EL NAGGAR CONTRACTING | You Dream..We Build",
  description:
    "EL NAGGAR CONTRACTING - Premier real estate development and construction company. From luxurious interiors to large-scale commercial projects, we bring your vision to life.",
  keywords: [
    "EL NAGGAR",
    "contracting",
    "real estate",
    "construction",
    "development",
    "luxury homes",
    "commercial buildings",
    "Egypt",
  ],
  icons: {
    icon: "/images/carousel_1.png",
  },
  openGraph: {
    title: "EL NAGGAR CONTRACTING | You Dream..We Build",
    description:
      "Premier real estate development and construction company bringing your vision to life.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}