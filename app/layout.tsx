import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: {
    template: "%s - CaloriePal",
  },
  description: {
    template: "%s",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`
         bg-gray-200 dark:bg-slate-950 duration-200`}
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
