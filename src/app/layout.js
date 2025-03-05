import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopBarNavigationClient from "@/components/Navigation/TopBarNavigationClient";
import { Footer } from "@/components/Commons";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Grupo ByZ",
  description: "WebPage de grupo ByZ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          <TopBarNavigationClient/>
          {children}
          <Toaster position="bottom-center"/>
          <Footer/>
        </main>
      </body>
    </html>
  );
}
