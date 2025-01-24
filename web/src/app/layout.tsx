"use client";

import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { LocationProvider } from "@/ctx/LocationContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocationProvider>{children}</LocationProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
