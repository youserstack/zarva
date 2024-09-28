import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";
// import localFont from "next/font/local";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "zarva",
  description: "youserstack's zarva ecommerce website",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="x-default-color">
        <Header />
        {children}
      </body>
    </html>
  );
}
