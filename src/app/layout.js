
import { Fira_Code, Space_Grotesk } from "next/font/google";
import { SmoothScroll } from "@/components";

import "lenis/dist/lenis.css";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
})

export const metadata = {
  title: "MOSAIC",
  description: "Monash Students for AI with Communities",
  icon: '/Octopus_icon_green_1.png'
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${firaCode.variable} ${spaceGrotesk.variable} ${firaCode.className} motion-safe:scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body

        className="antialiased"
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
