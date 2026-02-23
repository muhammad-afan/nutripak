import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NutriPak - Premium Nutrition",
  description: "Premium quality nutrition products and reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
        <Script
          src="//code.tidio.co/atuqteeif9gxe31vqtmkh4mybjwafvkq.js"
          strategy="lazyOnload"
        />
        <Script src="https://signed-shopzilla-return-connections.trycloudflare.com/widget.js" data-organization-id="org_39vpiQU1bZeYzBLSr3koGo9qU1Q"/>
      </body>
    </html>
  );
}
