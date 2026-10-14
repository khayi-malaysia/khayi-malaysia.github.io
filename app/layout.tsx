import type { Metadata, Viewport } from "next";
import { Noto_Sans_Myanmar, Poppins } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const myanmar = Noto_Sans_Myanmar({
  subsets: ["myanmar"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-myanmar",
});

export const metadata: Metadata = {
  title: "Khayi ခရီး | Malaysia Island Tours",
  description:
    "Pangkor, Redang, Kapas, Tioman, Langkawi and Pangkor Laut — choose your island and inquire on WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#070b12",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${myanmar.variable}`}>
      <body className="font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
