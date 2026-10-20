'use client';

import { useState } from 'react';
import { HiCheck, HiOutlineDuplicate } from 'react-icons/hi';
import { contactEmail } from '../data';

const focusRing = 'rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ink';

export default function EmailCallout() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(contactEmail).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="@container w-full min-w-0 flex-1 lg:-mt-[0.83vw]">
      <a
        href={`mailto:${contactEmail}`}
        className={`block max-w-full text-[min(8vw,9.6cqi)] leading-none whitespace-nowrap lg:text-[min(6.49vw,9.6cqi)] lg:leading-[1.54] ${focusRing}`}
      >
        {contactEmail}
      </a>
      <button
        type="button"
        onClick={copyEmail}
        className={`relative mt-3 flex w-fit cursor-pointer items-center gap-1 text-lg hover:underline lg:-mt-[2.22vw] lg:text-[1.25vw] ${focusRing}`}
      >
        {copied ? 'copied!' : 'copy email'}
        {copied ? <HiCheck /> : <HiOutlineDuplicate />}
      </button>
    </div>
  );
}
