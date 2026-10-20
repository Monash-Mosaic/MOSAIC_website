import Link from 'next/link';
import { HiArrowDown } from 'react-icons/hi';
import { projectLayout, projects, projectsIntro } from '../data';

const dottedBackground = {
  backgroundColor: '#e8eaf6',
  backgroundImage: 'radial-gradient(#c5cce8 1.5px, transparent 1.5px)',
  backgroundSize: '14px 14px',
};

function ProjectCard({ project, featured = false }) {
  const isDark = project.theme === 'dark';
  const isComingSoon = project.href==='';

  return (
    <article
      className={`flex h-auto flex-col ${featured ? 'p-4 sm:p-5' : 'p-3 sm:p-4'} md:h-full md:min-h-0 md:overflow-hidden ${featured ? 'md:p-[clamp(0.85rem,2vh,1.75rem)]' : 'md:p-[clamp(0.6rem,1.4vh,1.15rem)]'} ${isDark ? 'bg-navy text-white' : 'bg-white text-ink'}`}
    >
      {project.image ? (
        <div className={`mb-3 overflow-hidden ${featured ? 'aspect-[16/9]' : 'aspect-[16/10]'} md:aspect-auto md:min-h-0 md:flex-1`}>
          <img src={project.image} alt="" className="h-full w-full object-cover" />
        </div>
      ) : null}

      <h3
        className={`shrink-0 leading-tight font-bold ${featured ? 'text-[clamp(1.75rem,4vh,3rem)]' : 'text-[clamp(1.15rem,2.6vh,1.85rem)]'}`}
      >
        {project.title}
      </h3>
      <div
        className={`mt-2 shrink-0 space-y-1 leading-snug ${featured ? 'text-[clamp(1rem,2.1vh,1.35rem)]' : 'text-[clamp(0.85rem,1.8vh,1.05rem)]'}`}
      >
        {project.lines.map((line) => (
          <p
            key={line.text}
            className={
              line.highlight ? 'font-semibold text-lime' : line.emphasis ? 'font-bold' : undefined
            }
          >
            {line.text}
          </p>
        ))}
      </div>
      {isComingSoon ? (
        <div
          className={`shrink-0 self-start rounded-md bg-[#D8DCE6] font-bold tracking-wide text-[#3A4254] ${featured ? 'mt-4 px-5 py-2 text-[clamp(1rem,2vh,1.25rem)]' : 'mt-3 px-4 py-1.5 text-[clamp(0.9rem,1.8vh,1.05rem)]'}`}
        >
          Coming Soon
        </div>
      ) : (
        <Link
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`shrink-0 self-start rounded-md bg-lime font-bold text-ink transition-colors duration-150 hover:bg-lime-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ink ${featured ? 'mt-4 px-5 py-2 text-[clamp(1rem,2vh,1.25rem)]' : 'mt-3 px-4 py-1.5 text-[clamp(0.9rem,1.8vh,1.05rem)]'}`}
        >
          Visit Project
        </Link>
      )}
    </article>
  );
}

export default function RecentProjects() {
  return (
    <section
      id="projects"
      data-scroll-section
      className="relative isolate flex w-full shrink-0 flex-col overflow-x-clip px-3 pb-3 sm:px-4 md:h-dvh md:max-h-dvh md:overflow-hidden md:px-1 md:pb-1"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={dottedBackground} />
      <div className="grid w-full grid-cols-1 gap-3 pt-[var(--site-header)] md:min-h-0 md:flex-1 md:grid-cols-3 md:grid-rows-1 md:gap-[2px]">
        <div className="grid min-w-0 grid-cols-1 gap-3 md:min-h-0 md:grid-rows-[minmax(0,1fr)_minmax(0,4fr)] md:gap-[2px]">
          <div className="flex flex-col justify-center bg-navy px-4 py-6 text-white sm:px-5 md:h-full md:min-h-0 md:overflow-hidden md:px-6 md:py-0">
            <h2 className="text-[clamp(1.75rem,4vh,3rem)] leading-none font-bold tracking-tight">{projectsIntro.title}</h2>
            <p className="mt-2 max-w-xs text-sm leading-snug sm:text-base md:mt-1 md:text-[clamp(0.8rem,1.6vh,1rem)]">{projectsIntro.subtitle}</p>
          </div>
          {projectLayout
            .filter((slot) => slot.place === 'feature')
            .map(({ id }) => (
              <div key={id} className="min-w-0 md:min-h-0">
                <ProjectCard featured project={projects[id]} />
              </div>
            ))}
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 md:col-span-2 md:min-h-0 md:grid-rows-2 md:gap-[2px]">
          {projectLayout
            .filter((slot) => slot.place === 'equal')
            .map(({ id }) => (
              <div key={id} className="min-w-0 md:min-h-0">
                <ProjectCard project={projects[id]} />
              </div>
            ))}
        </div>
      </div>

      <a
        href="#about"
        className="relative z-10 mt-1 mr-2 mb-1 hidden shrink-0 items-center justify-end gap-1 font-mono text-xs tracking-widest text-ink uppercase hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ink md:flex"
      >
        Scroll to about <HiArrowDown aria-hidden="true" />
      </a>
    </section>
  );
}
