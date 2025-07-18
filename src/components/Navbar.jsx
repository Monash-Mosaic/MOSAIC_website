'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';



export default function Navbar({ color = 'light' }) {
  const textColor = color === 'dark' ? 'text-[#213359]' : 'text-white';
  const pathname = usePathname();
  const hoverBorderWhite = "hover:border-white"
  const hoverBorderNavy = "hover:border-[#213359]"
  const commonBorderStyle = " hover:border-2 px-4 py-4 rounded-full transition-all duration-100"
  const underlineStyle = " font-bold underline underline-offset-8 decoration-lime-400"

  // Define your logo sources based on routes
  const logoPaths = {
    '/': '/Primary_logo.png',
    '/join': '/Primary_Blue_Transparent.png',
    '/project': '/Primary_Blue_Transparent.png',
    '/contact': '/Primary_Blue_Transparent.png',
    // Add more routes as needed
  };

  const borderHoverStyle = {
    '/': hoverBorderWhite,
    '/join': hoverBorderNavy,
    '/project': hoverBorderNavy,
    '/contact': hoverBorderNavy,
  }
  // ${pathname === '/contact' ? 'font-bold underline underline-offset-8 decoration-lime-400' : ''
  // Fallback to primary logo if route not specified
  const logoSource = logoPaths[pathname] || '/Primary_logo.png';
  const borderStyle = borderHoverStyle[pathname] + commonBorderStyle
  return (
    <header className="w-full flex justify-between items-center py-6 max-w-7xl mx-auto px-6">
      <div className={`text-2xl font-roboto ${textColor}`}>
        <Link href="/">
          <img src={logoSource} alt="MOSAIC logo" className="h-25 cursor-pointer" />
        </Link>
      </div>
      <nav className={`space-x-8 ${textColor} text-sm`}>
        <Link href="#team" className={borderStyle}>Our team</Link>
        <Link href="#projects" className={borderStyle}>Projects</Link>
        <Link href="/contact" className={borderStyle + `${pathname === '/contact' ? underlineStyle : ''}`}>Contact us</Link>
        <Link href="#join" className={borderStyle}>Join us</Link>
      </nav>
    </header>
  );
}
