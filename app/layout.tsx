import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./theme-provider";

const inter = Inter({ subsets: ["latin"] });

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
        ${inter.className}
         bg-gray-100 dark:bg-slate-900 duration-200`}
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <div style={{ flex: 1 }}>{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
