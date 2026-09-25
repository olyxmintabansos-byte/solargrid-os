import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SolarProvider } from "@/context/SolarContext";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SolarGrid OS",
  description: "Solar Inverter SCADA & BESS Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-full antialiased`}>
        <SolarProvider>
          <Navbar />
          {children}
        </SolarProvider>
      </body>
    </html>
  );
}
