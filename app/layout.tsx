import type { Metadata } from "next";
import {Inter} from "next/font/google";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./AuthProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "TrashTalk - Twitter Shitpost Generator",
  description: "Generate hilarious Twitter shitposts with AI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>

    <html lang="en">
      <body
        className={`${inter.variable}antialiased`}
        >
        <Navbar />
        {children}
      </body>
    </html>
    </AuthProvider>
  );
}
