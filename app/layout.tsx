import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

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
        <header className="flex flex-row justify-between p-8 bg-slate-50 shadow-md fixed w-screen">
          <div className="flex flex-col items-left">
            <p className="text-3xl">Share-Ware</p>
            <p className="text-sm">by Justin</p>
          </div>
          <div className="flex flex-row items-center">
            <a href="https://justin.directory" className="p-2">Me</a>
            <a href="https://github.com/" className="p-2">
              <Image className="rounded-full" src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" width={45} height={45} alt="Github" />
            </a>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
