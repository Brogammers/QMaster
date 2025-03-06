"use client";

import { Noto_Sans, Jost } from "next/font/google";
import "./globals.css";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { Toaster } from "react-hot-toast";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  // Include Arabic and Latin weights
  weight: ["400", "500", "600", "700"],
  // Specify Arabic script support
  variable: "--font-noto",
});

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/api/translations/{{lng}}", // Your API endpoint
    },
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["cookie", "localStorage", "navigator"],
      caches: ["cookie", "localStorage"],
    },
  });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={i18next.language}
      dir={i18next.language === "ar" ? "rtl" : "ltr"}
    >
      <body
        className={`${notoSans.className} ${jost.variable} ${
          i18next.language === "ar" ? "rtl" : "ltr"
        }`}
      >
        <I18nextProvider i18n={i18next}>
          {children}
        </I18nextProvider>
      </body>
    </html>
  );
}
