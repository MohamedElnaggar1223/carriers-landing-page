import type { Metadata } from "next";
import "../globals.css";
import { Outfit, Denk_One, DM_Sans, Mulish, Baloo_Bhaina_2 } from 'next/font/google'

export const metadata: Metadata = {
  title: "Carriers",
  description: "We are making the champions of tomorrow by turning aspirations into reality.",
};

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const denkOne = Denk_One({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-denk-one',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
})

const baloo = Baloo_Bhaina_2({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-baloo',
})

const mulish = Mulish({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-mulish',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-[#191919] ${outfit.className} ${dmSans.variable} ${denkOne.variable} ${mulish.variable} ${baloo.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
