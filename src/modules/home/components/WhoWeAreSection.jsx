'use client';

import { useState } from 'react';

const topics = [
  {
    id: 'team-overview',
    label: 'TEAM_OVERVIEW',
    heading: 'FACULTY OF IT BACKED // EST. 2025',
    description:
      'Established in 2025, we’re a team of Monash students backed and funded by the Faculty of IT. We work directly with real-world clients to build and deliver software projects.',
  },
  {
    id: 'capabilities',
    label: 'CAPABILITIES',
    heading: 'CAPABILITIES.EXE',
    description: 'Capabilities information will be added here.',
  },
  {
    id: 'talent-pipeline',
    label: 'TALENT_PIPELINE',
    heading: 'TALENT_PIPELINE.EXE',
    description: 'Talent pipeline information will be added here.',
  },
  {
    id: 'sponsor-advantage',
    label: 'SPONSOR_ADVANTAGE',
    heading: 'SPONSOR_ADVANTAGE.EXE',
    description: 'Sponsor information will be added here.',
  },
  {
    id: 'track-record',
    label: 'TRACK_RECORD',
    heading: 'TRACK_RECORD.EXE',
    description: 'Track record information will be added here.',
  },
];
const CONTACT_EMAIL = 'mosaic@monash.edu';
const sectionStyle = {
  backgroundColor: '#FFFFFF',
  backgroundImage: "url('/who-we-are-texture.svg')",
  backgroundSize: '360px 360px',
  backgroundRepeat: 'repeat',
};

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
      id="team"
      className="w-full snap-start bg-white text-[#213359]"
    >
      <div className="w-full px-5 py-12 md:px-12 md:py-16" style={sectionStyle}>
        <div className="mx-auto w-full max-w-[1340px]">
        <h2 className="font-mono text-4xl leading-none font-bold md:text-5xl">Who we are</h2>
        <p className="mt-3 text-base font-semibold md:text-lg">
          Engineering for community resilience and global equity
        </p>

        <div
          className="mt-10 grid min-h-[506px] w-full border border-[#213359] shadow-[7px_7px_0_rgba(33,51,89,0.18)] md:h-[506px] md:grid-cols-[344px_minmax(0,1fr)]"
          style={{ backgroundColor: '#D0FF63' }}
        >
          <aside className="flex flex-col border-b border-[#213359]/70 p-4 font-mono text-sm font-bold md:border-r md:border-b-0 md:p-3 md:text-base">
            <p>&gt;[SYS_LOG // MONASH_FIT_LABS_v2.6]</p>
            <p className="mt-2">&gt;SELECT_OPTION:</p>
            <ol className="mt-1 flex flex-col gap-5">
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
              className={`mt-8 inline-block self-start px-2 py-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#213359] md:mt-auto md:pt-1 ${
                isContactActive
                  ? 'bg-[#3F5D00] text-white shadow-[8px_8px_0_#213359]'
                  : 'text-[#213359] hover:bg-[#213359]/10'
              }`}
            >
              &gt;EXECUTE_PARTNERSHIP.EXE<br />[contact us]
            </button>
          </aside>

          <div className="p-5 md:p-4">
            {activeTopic ? (
              <div aria-live="polite">
                <p className="font-mono text-sm font-bold uppercase tracking-wide md:text-base">{activeTopic.heading}</p>
                <p className="mt-5 max-w-4xl text-base leading-relaxed font-semibold md:text-lg">
                  {activeTopic.description}
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
    </section>
  );
}

