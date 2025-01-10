"use client" 

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux"
import { store } from "./redux/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any; // Adjust the type as needed
}) {
  return (
    <html lang="en">
      <Provider store={store}>
        <SessionProvider session={session}>
          <body className={inter.className}>{children}</body>
        </SessionProvider>
      </Provider>
    </html>
  );
}
