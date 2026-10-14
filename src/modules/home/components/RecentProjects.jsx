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

  return (
    <article
      className={`flex h-full min-h-0 flex-col overflow-hidden ${featured ? 'p-[clamp(0.85rem,2vh,1.75rem)]' : 'p-[clamp(0.6rem,1.4vh,1.15rem)]'} ${isDark ? 'bg-navy text-white' : 'bg-white text-ink'}`}
    >
      {project.image ? (
        <div className="mb-3 min-h-0 flex-1">
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
      <Link
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`shrink-0 self-start rounded-md bg-lime font-bold text-ink transition-colors duration-150 hover:bg-lime-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ink ${featured ? 'mt-4 px-5 py-2 text-[clamp(1rem,2vh,1.25rem)]' : 'mt-3 px-4 py-1.5 text-[clamp(0.9rem,1.8vh,1.05rem)]'}`}
      >
        Visit Project
      </Link>
    </article>
  );
}

export default function RecentProjects() {
  return (
    <section
      id="projects"
      data-scroll-section
      className="relative isolate flex h-dvh max-h-dvh w-full shrink-0 flex-col overflow-hidden p-1"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={dottedBackground} />
      <div className="grid min-h-0 w-full flex-1 grid-cols-1 grid-rows-[minmax(0,0.85fr)_minmax(0,1.4fr)] gap-[2px] md:grid-cols-3 md:grid-rows-1">
        <div className="grid min-h-0 grid-rows-[minmax(0,1fr)_minmax(0,4fr)] gap-[2px]">
          <div className="flex h-full min-h-0 flex-col justify-center overflow-hidden bg-navy px-5 text-white md:px-6">
            <h2 className="text-[clamp(1.75rem,4vh,3rem)] leading-none font-bold tracking-tight">{projectsIntro.title}</h2>
            <p className="mt-1 max-w-xs text-[clamp(0.8rem,1.6vh,1rem)] leading-snug">{projectsIntro.subtitle}</p>
          </div>
          {projectLayout
            .filter((slot) => slot.place === 'feature')
            .map(({ id }) => (
              <div key={id} className="min-h-0">
                <ProjectCard featured project={projects[id]} />
              </div>
            ))}
        </div>
        <div className="grid min-h-0 grid-cols-2 grid-rows-2 gap-[2px] md:col-span-2">
          {projectLayout
            .filter((slot) => slot.place === 'equal')
            .map(({ id }) => (
              <div key={id} className="min-h-0">
                <ProjectCard project={projects[id]} />
              </div>
            ))}
        </div>
      </div>

      <Link
        href="#about"
        className="mt-1 mr-2 mb-1 hidden shrink-0 items-center justify-end gap-1 font-mono text-xs tracking-widest text-ink uppercase hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ink md:flex"
      >
        Scroll to about <HiArrowDown aria-hidden="true" />
      </Link>
    </section>
  );
}
