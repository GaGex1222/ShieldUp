import type { Metadata } from "next";
import { Assistant } from "next/font/google"; // ייבוא הפונט המתאים
import "./globals.css";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["200", "300", "400", "700", "800"],
  variable: "--font-assistant",
});

export const metadata: Metadata = {
  title: "ShieldUp Pro | עליונות שיווקית",
  description: "מערכת שיווק חדירה אסטרטגית לחברות אבטחה",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${assistant.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col bg-[#010103]">
        {children}
      </body>
    </html>
  );
}