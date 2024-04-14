"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  let canonicalUrl: string;
  switch (pathname) {
    case "/":
      canonicalUrl = "https://www.calorie-pal.com/";
      break;
    case "/body-recomposition-calculator":
      canonicalUrl =
        "https://www.calorie-pal.com/body-recomposition-calculator";
      break;
    case "/sugar-calculator":
      canonicalUrl = "https://www.calorie-pal.com/sugar-calculator";
      break;
    case "/anorexic-calculator":
      canonicalUrl = "https://www.calorie-pal.com/anorexic-calculator";
      break;
    default:
      canonicalUrl = `https://calorie-pal.com${pathname}`;
      break;
  }
  console.log("canonicalUrl", canonicalUrl);

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={canonicalUrl} />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`
         bg-gray-200 dark:bg-slate-950 duration-200 mt-[4rem] md:mt-[5rem]`}
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <div style={{ flex: 1 }}>{children}</div>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
