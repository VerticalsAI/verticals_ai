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
  title: "Synnax AI",
  description: "A modular network of interoperable DeFi agents",
};

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`antialiased bg-white dark:bg-neutral-900`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
