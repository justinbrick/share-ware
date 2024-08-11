import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Share-Ware",
  description: "SharePoint Storage Navigator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex min-h-32 flex-row justify-around p-8 bg-slate-50 shadow-md">
          <div className="flex flex-col items-left w-screen">
            <p className="text-3xl text-">Share-Ware</p>
            <p className="text-sm">by Justin</p>
          </div>
          <div>

          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
