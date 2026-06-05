import type { Metadata } from "next";
import { Figtree, JetBrains_Mono, Bebas_Neue, Syncopate, Syne, Outfit, Caveat } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-syncopate",
  display: "swap",
});

const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kinz ul Eman — AI/ML Engineer | Portfolio",
  description:
    "AI/ML Engineer with expertise in building high-performance, scalable and responsive AI/ML solutions and models. Explore my portfolio of machine learning projects, deep learning research, and engineering experience.",
  keywords: [
    "AI Engineer",
    "ML Engineer",
    "Machine Learning",
    "Deep Learning",
    "Kinz ul Eman",
    "Portfolio",
    "Python",
    "TensorFlow",
    "PyTorch",
  ],
  authors: [{ name: "Kinz ul Eman" }],
  openGraph: {
    title: "Kinz ul Eman — AI/ML Engineer",
    description:
      "AI/ML Engineer crafting high-performance, scalable intelligent solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${jetbrainsMono.variable} ${bebasNeue.variable} ${syncopate.variable} ${syne.variable} ${outfit.variable} ${caveat.variable}`}>
      <body className={`${figtree.className} antialiased`}>{children}</body>
    </html>
  );
}
