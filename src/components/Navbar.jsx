export default function Navbar() {
  return (
    <header className="w-full flex justify-between items-center py-6 max-w-7xl mx-auto px-6">
      <div className="text-2xl font-roboto text-white">
        <img src="/Primary_logo.png" alt="MOSAIC logo" className="h-25" />
      </div>
      <nav className="space-x-8 text-white text-sm">
        <a href="#team" className="hover:underline font-roboto">Our team</a>
        <a href="#projects" className="hover:underline font-roboto">Projects</a>
        <a href="#contact" className="hover:underline font-roboto">Contact us</a>
        <a href="#join" className="hover:underline font-roboto">Join us</a>
      </nav>
    </header>
  );
}
