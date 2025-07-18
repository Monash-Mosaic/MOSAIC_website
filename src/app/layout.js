import { Space_Grotesk } from "next/font/google";
import "./globals.css";


const spaceGrotesk = Space_Grotesk({
  weight: '400',
  subsets: ["latin"],
})

export const metadata = {
  title: "MOSAIC",
  description: "Monash Students for AI with Communities",
  icon: '/Octopus_icon_green_1.png'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
