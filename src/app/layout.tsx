import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexaAI - Power AI agents with clean web data",
  description: "Search, scrape, crawl, analyze and interact with web data using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans text-brand-dark">
        {children}
      </body>
    </html>
  );
}
