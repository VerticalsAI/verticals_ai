import type { Metadata, Viewport } from "next";

import Providers from "./_contexts";
import "./globals.css";

// const dmSans = DM_Sans({
//   variable: "--font-dm-sans",
//   subsets: ["latin"],
// });

// const dmMono = DM_Mono({
//   variable: "--font-dm-mono",
//   weight: ["300", "400", "500"],
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "VERTICALS AI",
  description: "Smart AI agents optimizing your stablecoin yields through data-driven strategies and market insights. Think of them as your financial co-pilots, navigating the ever-changing landscape of crypto with precision and resilience.",
};

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`antialiased bg-white dark:bg-neutral-900`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
