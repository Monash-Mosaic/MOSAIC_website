import { makerspaceAddress } from '../data';

export default function MakerspaceCard() {
  return (
    <img
      src="/AddressCard.png"
      alt={`MOSAIC makerspace: ${makerspaceAddress}`}
      className="w-full min-w-0 rounded-[20px] object-cover lg:mb-[1.46vw] lg:aspect-[626/314] lg:basis-[43.47vw] lg:rounded-[1.39vw]"
    />
  );
}
