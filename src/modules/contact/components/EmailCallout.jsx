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
    <div className="lg:-mt-[0.83vw]">
      <a
        href={`mailto:${contactEmail}`}
        className={`block text-[8vw] leading-none whitespace-nowrap lg:text-[6.49vw] lg:leading-[1.54] ${focusRing}`}
      >
        {contactEmail}
      </a>
      <button
        type="button"
        onClick={copyEmail}
        className={`mt-3 flex w-fit items-center gap-1 text-lg hover:underline lg:-mt-[2.22vw] lg:text-[1.25vw] ${focusRing}`}
      >
        {copied ? 'copied!' : 'copy email'}
        {copied ? <HiCheck /> : <HiOutlineDuplicate />}
      </button>
    </div>
  );
}
