export default function TeamImage({ src, alt, className = '' }) {
  if (src) {
    return <img src={src} alt={alt} className={`object-cover ${className}`} />;
  }

  return (
    <div
      role="img"
      aria-label={`${alt} — photo coming soon`}
      className={`flex flex-col items-center justify-center gap-2 bg-[#E9ECF7] ${className}`}
    >
      <img src="/Octopus_icon_3.png" alt="" aria-hidden="true" className="w-10 opacity-30" />
      <span className="text-[11px] uppercase tracking-wide text-[#213359]/45">Photo coming soon</span>
    </div>
  );
}
