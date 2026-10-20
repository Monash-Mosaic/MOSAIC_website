import Image from 'next/image';
import { makerspaceAddress } from '../data';

// Desktop sizes come from the 650×338 card in the Figma frame, which renders 43.47vw wide
// (1 card px ≈ 0.067vw). Below lg the address sits above the two photos.
const photoFrame = 'relative overflow-hidden rounded-xl lg:rounded-[0.8vw]';

export default function MakerspaceCard() {
  return (
    <div className="grid w-full min-w-0 grid-cols-2 gap-2 rounded-[20px] bg-[url(/makerspace-dots.svg)] bg-cover bg-center p-3 lg:mb-[1.46vw] lg:aspect-[650/338] lg:basis-[43.47vw] lg:grid-cols-[249fr_357fr] lg:grid-rows-2 lg:gap-[0.4vw] lg:rounded-[1.39vw] lg:p-[0.8vw]">
      <div className={`${photoFrame} aspect-[4/3] lg:aspect-auto`}>
        <Image
          src="/MakerspaceInterior.png"
          alt="Inside the MOSAIC makerspace"
          fill
          sizes="(min-width: 1024px) 17vw, 50vw"
          className="object-cover"
        />
      </div>
      <address className="order-first col-span-2 flex flex-col justify-center rounded-xl bg-white/85 px-4 py-3 font-mono text-sm leading-normal text-ink not-italic lg:order-none lg:col-span-1 lg:rounded-[1.07vw] lg:px-[0.9vw] lg:py-[0.6vw] lg:text-[1.2vw]">
        <h2 className="font-bold">Makerspace Address</h2>
        <p>{makerspaceAddress}</p>
      </address>
      <div className={`${photoFrame} aspect-[4/3] lg:col-span-2 lg:aspect-auto`}>
        <Image
          src="/MakerspaceBuilding.png"
          alt="Exterior of the makerspace building"
          fill
          sizes="(min-width: 1024px) 42vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
