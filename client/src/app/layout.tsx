import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Card Transaction Processor",
  description: "Process and report card transactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow container mx-auto p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
