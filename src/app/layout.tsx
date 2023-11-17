import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} w-full h-screen relative flex justify-center items-center overflow-hidden bg-gray-100 px-4`}
      >
        {children}
        <footer className="absolute top-auto bottom-0 left-auto right-4 pl-4 text-justify">
          Data provided by wikipedia.org | Icon provided by icons8.com
        </footer>
      </body>
    </html>
  );
}
