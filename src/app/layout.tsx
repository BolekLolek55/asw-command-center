import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { TickerBar } from "@/components/TickerBar";
import { Toaster } from "react-hot-toast";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ASW Command Center | Akademia Sztuki Wojennej",
  description: "Centrum dowodzenia dla studentów Akademii Sztuki Wojennej",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0f0d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={jetbrainsMono.variable}>
      <body className="bg-military-bg text-military-text font-mono min-h-screen overflow-hidden">
        {/* Scanline overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" 
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)",
          }}
        />

        <div className="flex flex-col h-screen">
          <TickerBar />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden relative">
              {/* Background grid */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: "linear-gradient(#1a3c2e 1px, transparent 1px), linear-gradient(90deg, #1a3c2e 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="flex-1 overflow-y-auto p-6 relative z-10">
                {children}
              </div>
            </main>
          </div>
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0d1a14",
              border: "1px solid #1a3c2e",
              color: "#e8e8e8",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}
