import Link from 'next/link';
import { HiArrowDown } from 'react-icons/hi';
import { projectLayout, projects, projectsIntro } from '../data';

const dottedBackground = {
  backgroundColor: '#e8eaf6',
  backgroundImage: 'radial-gradient(#c5cce8 1.5px, transparent 1.5px)',
  backgroundSize: '14px 14px',
};

function ProjectCard({ project }) {
  const isDark = project.theme === 'dark';

  return (
    <article
      className={`flex h-full flex-col p-5 md:p-6 ${isDark ? 'bg-navy text-white' : 'bg-white text-ink'}`}
    >
      <div className="mb-3 min-h-16 flex-1">
        {project.image ? (
          <img
            src={project.image}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className={`h-full w-full ${isDark ? 'bg-white/10' : 'bg-navy/5'}`}
          />
        )}
      </div>

      <h3 className="text-2xl leading-tight font-bold md:text-3xl">{project.title}</h3>
      <div className="mt-2 space-y-0.5 text-sm leading-snug md:text-[15px]">
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
        className="mt-3 self-start rounded-md bg-lime px-3 py-1 text-sm font-bold text-ink transition-colors duration-150 hover:bg-lime-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      >
        Visit Project
      </Link>
    </article>
  );
}

export default function RecentProjects() {
  return (
    <section
      className="flex min-h-screen w-full snap-start flex-col p-1"
      style={dottedBackground}
    >
      <div className="grid flex-1 grid-cols-1 gap-[2px] md:min-h-0 md:grid-cols-3 md:grid-rows-2">
        <div className="bg-navy px-5 py-6 text-white md:col-start-1 md:row-start-1 md:px-6">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{projectsIntro.title}</h2>
          <p className="mt-2 max-w-xs text-sm md:text-base">{projectsIntro.subtitle}</p>
        </div>
        {projectLayout.map(({ id, cell }) => (
          <div key={id} className={`h-full ${cell}`}>
            <ProjectCard project={projects[id]} />
          </div>
        ))}
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
