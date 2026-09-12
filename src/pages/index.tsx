import Link from 'next/link';
import { useCallback, useState } from 'react';
import { ArrowUpRight, CalendarDays, Mail, SketchIcon } from 'sketchicon';
import BlogRow from '@/components/BlogRow';
import ExperienceAccordion from '@/components/ExperienceAccordion';
import Footer from '@/components/Footer';
import GitHubContributions from '@/components/GitHubContributions';
import HalftonePortrait from '@/components/HalftonePortrait';
import NewsletterSection from '@/components/NewsletterSection';
import PortfolioSection from '@/components/PortfolioSection';
import ProjectPreviewModal from '@/components/ProjectPreviewModal';
import ProjectCard from '@/components/rough/ProjectCard';
import RoughCurvedArrow from '@/components/rough/RoughCurvedArrow';
import RoughLink from '@/components/rough/RoughLink';
import ScrollMinimap from '@/components/ScrollMinimap';
import {
  experiences,
  home,
  links,
  type Project,
  projects,
  skillGroups,
  socials,
} from '@/data/portfolio';
import { getAllWritings, type WritingIndexItem } from '@/lib/writing';

type HomeProps = {
  writings: WritingIndexItem[];
};

export default function Home({ writings }: HomeProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeProjectPreview = useCallback(() => setSelectedProject(null), []);

  return (
    <div id='top' className='portfolio-home mx-auto w-full max-w-[760px]'>
      <ScrollMinimap />
      <div className='portfolio-opening' aria-hidden>
        <span className='portfolio-cross portfolio-cross-left' />
        <span className='portfolio-cross portfolio-cross-right' />
      </div>

      <div className='portfolio-rail'>
        <section id='about' className='portfolio-hero scroll-mt-32'>
          <div className='portfolio-identity'>
            <div className='portfolio-avatar-wrap'>
              {home.hero.availability.visible ? (
                <div className='portfolio-availability-note'>
                  <span>{home.hero.availability.text}</span>
                  <RoughCurvedArrow seed={102} width={48} height={30} className='ml-auto' />
                </div>
              ) : null}
              <HalftonePortrait />
            </div>
            <div className='portfolio-identity-copy'>
              <h1 className='text-3xl leading-none font-semibold md:text-4xl'>
                {home.hero.heading}
              </h1>
              <p className='mt-2 text-sm text-board-muted md:text-base'>{home.hero.role}</p>
            </div>
          </div>

          <div className='portfolio-hero-copy mt-8 max-w-2xl space-y-3 text-base leading-relaxed md:text-lg'>
            {home.hero.pointers.map((pointer) => {
              const linkText = 'people on the internet';
              const [before, after] = pointer.split(linkText);

              return (
                <p key={pointer}>
                  -&gt; {after ? before : pointer}
                  {after ? (
                    <>
                      <span data-sound-click>
                        <RoughLink href='/inspiration' seed={301} showIcon={false}>
                          {linkText}
                        </RoughLink>
                      </span>
                      {after}
                    </>
                  ) : null}
                </p>
              );
            })}
          </div>

          <div className='portfolio-hero-actions mt-6 flex flex-wrap gap-3'>
            <a
              href={links.calendar}
              target='_blank'
              rel='noreferrer noopener'
              className='portfolio-button'
            >
              <SketchIcon
                roughness={1.8}
                strokeWidth={1.7}
                icon={CalendarDays}
                size={15}
                aria-hidden
              />{' '}
              {home.hero.calendarCta}
            </a>
            <a href={links.email} className='portfolio-button portfolio-button-secondary'>
              <SketchIcon roughness={1.8} strokeWidth={1.7} icon={Mail} size={15} aria-hidden />{' '}
              {home.hero.emailCta}
            </a>
          </div>

          <div className='mt-7'>
            <p className='portfolio-social-heading mb-3 text-sm text-board-muted'>
              {home.hero.socialHeading}
            </p>
            <div className='portfolio-social-list flex flex-wrap gap-2'>
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target='_blank'
                  rel='noreferrer noopener'
                  className='social-chip group'
                  aria-label={`${social.label}: ${social.handle}`}
                >
                  <span>{social.label}</span>
                  <SketchIcon
                    roughness={1.8}
                    icon={ArrowUpRight}
                    className='social-chip-arrow'
                    size={13}
                    aria-hidden
                  />
                </a>
              ))}
            </div>
          </div>

          <GitHubContributions />
          <div className='portfolio-section-divider mt-9' aria-hidden />
        </section>

        <PortfolioSection
          id='experience'
          title={home.sections.experience.title}
          note={home.sections.experience.note}
          seed={301}
        >
          <ExperienceAccordion items={experiences} />
        </PortfolioSection>

        <PortfolioSection
          id='projects'
          title={home.sections.projects.title}
          note={home.sections.projects.note}
          seed={401}
        >
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {projects
              .filter((project) => project.featured)
              .map((project, index) => (
                <ProjectCard
                  key={project.title}
                  {...project}
                  seed={201 + index}
                  onPreview={() => setSelectedProject(project)}
                />
              ))}
          </div>
          <a
            href={links.repositories}
            target='_blank'
            rel='noreferrer noopener'
            className='portfolio-view-all group mx-auto mt-5'
          >
            {home.sections.projects.viewAllLabel}
            <SketchIcon
              roughness={1.8}
              strokeWidth={1.7}
              icon={ArrowUpRight}
              size={15}
              className='view-all-arrow'
              aria-hidden
            />
          </a>
        </PortfolioSection>

        <PortfolioSection
          id='blogs'
          title={home.sections.writing.title}
          note={home.sections.writing.note}
          seed={501}
        >
          <ul className='writing-list'>
            {writings.map((post) => (
              <BlogRow key={post.slug} post={{ ...post, href: `/writing/${post.slug}` }} />
            ))}
          </ul>
          <Link href='/writing' className='portfolio-view-all group mx-auto mt-5'>
            {home.sections.writing.viewAllLabel}
            <SketchIcon
              roughness={1.8}
              strokeWidth={1.7}
              icon={ArrowUpRight}
              size={15}
              className='view-all-arrow'
              aria-hidden
            />
          </Link>
        </PortfolioSection>

        <PortfolioSection
          id='skills'
          title={home.sections.skills.title}
          note={home.sections.skills.note}
          seed={601}
        >
          <div className='space-y-5'>
            {skillGroups.map((group) => (
              <div key={group.label} className='grid gap-3 sm:grid-cols-[110px_1fr]'>
                <h3 className='pt-1 text-sm font-semibold text-board-muted'>{group.label}</h3>
                <div className='flex flex-wrap gap-2'>
                  {group.skills.map((skill) => (
                    <span key={skill} className='skill-chip'>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PortfolioSection>

        <section id='newsletter' className='portfolio-section scroll-mt-32'>
          <NewsletterSection />
        </section>

        <Footer />
      </div>

      <div className='portfolio-closing' aria-hidden>
        <span className='portfolio-cross portfolio-cross-left' />
        <span className='portfolio-cross portfolio-cross-right' />
      </div>
      <ProjectPreviewModal
        key={selectedProject?.liveLink ?? 'closed'}
        project={selectedProject}
        onClose={closeProjectPreview}
      />
    </div>
  );
}

export function getStaticProps() {
  return {
    props: {
      writings: getAllWritings().slice(0, 3),
    },
  };
}
