// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
// import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        {/* <Header /> */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}