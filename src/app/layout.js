import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopBarNavigationClient from "@/components/Navigation/TopBarNavigationClient";
import { Footer } from "@/components/Commons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pagina de Grupo ByZ",
  description: "Pagina web para la empresa de Grupo ByZ",
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
          <Footer/>
        </main>
      </body>
    </html>
  );
}
