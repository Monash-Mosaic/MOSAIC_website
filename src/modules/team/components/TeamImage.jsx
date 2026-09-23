import Image from 'next/image';

// Both team grids are `max-w-5xl` with 1 / 2 / 3 columns, so a card is roughly a
// third of 1024px on desktop and half the viewport on tablets.
const GRID_SIZES = '(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw';

export default function TeamImage({ src, alt, className = '', sizes = GRID_SIZES }) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${alt} — photo coming soon`}
      className={`flex flex-col items-center justify-center gap-2 bg-[#E9ECF7] ${className}`}
    >
      <Image
        src="/Octopus_icon_3.png"
        alt=""
        aria-hidden="true"
        width={40}
        height={41}
        className="h-auto w-10 opacity-30"
      />
      <span className="text-[11px] uppercase tracking-wide text-[#213359]/45">Photo coming soon</span>
    </div>
  );
}
