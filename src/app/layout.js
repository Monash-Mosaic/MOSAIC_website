
import { Fira_Code, Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";


const spaceGrotesk = Space_Grotesk({
  weight: '400',
  subsets: ["latin"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
})

export const metadata = {
  title: "MOSAIC",
  description: "Monash Students for AI with Communities",
  icon: '/Octopus_icon_green_1.png'
};

export default function RootLayout({ children }) {
  return (
    // data-scroll-behavior lets Next.js skip smooth scrolling on route changes, keeping it for anchor links
    <html
      lang="en"
      className={`${inter.variable} ${firaCode.variable} motion-safe:scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body

        className={`${spaceGrotesk.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
