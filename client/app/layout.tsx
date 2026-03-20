import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitTogether — Connect Through Code",
  description: "GitTogether connects developers based on GitHub profiles. Network, collaborate, and vibe through code.",
};

import AuthSync from "@/components/shared/AuthSync";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0d0f14] text-gray-100 min-h-screen`}>
        <Providers>
          <AuthSync>{children}</AuthSync>
        </Providers>
      </body>
    </html>
  );
}
