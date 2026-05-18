// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
// import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "./providers";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "OminiCart | Your All-in-One Marketplace",
  description: "Marketplace for food, homes, wheels, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app">
        <Providers>
          {/* <Header /> */}
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}