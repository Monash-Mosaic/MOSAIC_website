'use client';

import { useState } from 'react';
import { topics } from '@/modules/home/data';

const CONTACT_EMAIL = 'mosaic@monash.edu';
const sectionStyle = {
  backgroundColor: '#FFFFFF',
  backgroundImage: "url('/who-we-are-texture.svg')",
  backgroundSize: '360px 360px',
  backgroundRepeat: 'repeat',
};

const panelStyle = {
  backgroundColor: '#B7FF00',
  backgroundImage: "url('/who-we-are-texture.svg')",
  backgroundSize: '360px 360px',
  backgroundRepeat: 'repeat',
  backgroundBlendMode: 'multiply',
};

function withBold(text) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="[-webkit-text-stroke:0.04em_currentColor]">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export default function WhoWeAreSection() {
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [copyStatus, setCopyStatus] = useState('');
  const isContactActive = activeTopic === null;

  async function copyEmail() {
    try {
      const clipboard = window.navigator.clipboard;
      if (!clipboard?.writeText) {
        setCopyStatus('COPY FAILED');
        return;
      }

      await clipboard.writeText(CONTACT_EMAIL);
      setCopyStatus('EMAIL COPIED');
    } catch {
      setCopyStatus('COPY FAILED');
    }
  }

  return (
    <section
      id="about"
      data-scroll-section
      className="relative isolate flex h-dvh max-h-dvh w-full shrink-0 flex-col overflow-hidden bg-white font-[family-name:var(--font-space-grotesk)] text-[#213359]"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={sectionStyle} />
      <div className="flex min-h-0 w-full flex-1 flex-col justify-center px-5 py-[clamp(0.75rem,3vh,2.5rem)] md:px-12">
        <div className="mx-auto flex w-full max-w-[1340px] flex-col">
        <h2 className="shrink-0 font-mono text-[clamp(1.75rem,4.5vh,3rem)] leading-none font-bold">Who we are</h2>
        <p className="mt-2 shrink-0 text-[clamp(0.9rem,1.8vh,1.125rem)] font-semibold">
          Engineering for community resilience and global equity
        </p>

        <div
          className="mt-[clamp(0.75rem,2vh,1.5rem)] flex w-full flex-col border border-[#213359] shadow-[7px_7px_0_rgba(33,51,89,0.18)]"
          style={panelStyle}
        >
          <div className="p-4 pb-1 font-mono text-sm font-bold md:p-3 md:pb-1 md:text-base">
            <p className="whitespace-nowrap">&gt;[SYS_LOG // MONASH_FIT_LABS_v2.6]</p>
            <p className="mt-2">&gt;SELECT_OPTION:</p>
          </div>

          <div className="grid md:grid-cols-[344px_minmax(0,1fr)]">
          <aside className="flex flex-col border-b border-[#213359]/70 p-4 pt-0 font-mono text-sm font-bold md:border-r md:border-b-0 md:p-3 md:pt-0 md:text-base">
            <ol className="flex flex-col gap-4">
              {topics.map((topic, index) => {
                const isActive = activeTopic?.id === topic.id;

                return (
                  <li key={topic.id}>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveTopic(topic)}
                      className={`w-full px-2 py-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#213359] ${
                        isActive
                          ? 'bg-[#3F5D00] text-white shadow-[8px_8px_0_#213359]'
                          : 'text-[#213359] hover:bg-[#213359]/10'
                      }`}
                    >
                      [{String(index).padStart(2, '0')}] {topic.label}
                    </button>
                  </li>
                );
              })}
            </ol>
            <button
              type="button"
              aria-pressed={isContactActive}
              onClick={() => setActiveTopic(null)}
              className={`mt-4 inline-block self-start px-2 py-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#213359] ${
                isContactActive
                  ? 'bg-[#3F5D00] text-white shadow-[8px_8px_0_#213359]'
                  : 'text-[#213359] hover:bg-[#213359]/10'
              }`}
            >
              &gt;EXECUTE_PARTNERSHIP.EXE<br />[contact us]
            </button>
          </aside>

          <div className="min-h-0 overflow-y-auto p-5 md:p-4">
            {activeTopic ? (
              <div aria-live="polite">
                <p className="font-mono text-sm font-bold uppercase tracking-wide md:text-base">{activeTopic.heading}</p>
                <p className="mt-3 max-w-4xl text-[clamp(0.85rem,1.7vh,1.125rem)] leading-snug font-semibold whitespace-pre-line">
                  {withBold(activeTopic.description)}
                </p>
              </div>
            ) : (
              <div aria-live="polite">
                <p className="font-mono text-sm font-bold uppercase tracking-wide md:text-base">
                  EXECUTE_PARTNERSHIP.EXE [SUCCESS]
                </p>
                <div className="mt-7 space-y-1 font-mono text-sm font-semibold md:text-base">
                  <p className="grid grid-cols-[9rem_minmax(0,1fr)] gap-2 md:grid-cols-[12rem_minmax(0,1fr)]">
                    <span>&gt; DIRECT_EMAIL :</span>
                    <a className="break-words underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                  <p className="grid grid-cols-[9rem_minmax(0,1fr)] gap-2 md:grid-cols-[12rem_minmax(0,1fr)]">
                    <span>&gt; MAKERSPACE :</span>
                    <span>Alan Finkel Building for Technology, Monash Clayton</span>
                  </p>
                  <p className="grid grid-cols-[9rem_minmax(0,1fr)] gap-2 md:grid-cols-[12rem_minmax(0,1fr)]">
                    <span>&gt; RESPONSE_TIME :</span>
                    <span>&lt; 24 Hours (Direct to Student Directors)</span>
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm font-bold md:text-base">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="text-left underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#213359]"
                  >
                    [ {copyStatus || 'CLICK TO COPY EMAIL'} ]
                  </button>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#213359]"
                  >
                    [ OPEN MAIL CLIENT ]
                  </a>
                </div>
                <p className="sr-only" aria-live="polite">
                  {copyStatus}
                </p>
              </div>
            )}
          </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

