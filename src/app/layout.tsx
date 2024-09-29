import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";
import { cookies } from "next/headers";
import { Provider } from "@/components/Context";
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
  const mode = cookies().get("mode")?.value as string;
  console.log({ mode });
  // const token = JSON.parse(headers().get("token") as string);
  // console.log({ token });

  return (
    <html lang="en">
      <body className="x-default-color">
        <Provider mode={mode}>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
