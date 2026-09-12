import type { Metadata } from "next";
import { Great_Vibes, Lora } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Happy 1st Anniversary 🤍",
  description: "Untuk kamu, di hari istimewa kita.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${greatVibes.variable} ${lora.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
